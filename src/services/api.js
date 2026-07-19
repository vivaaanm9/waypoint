// Service for OpenStreetMap APIs (Nominatim & Overpass) with Caching & Fuzzy Search

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';
const OVERPASS_API_URL = 'https://overpass-api.de/api/interpreter';

// Simple Cache Layer
const apiCache = {};

/**
 * Geocode a location string to coordinates using Nominatim
 */
export const searchLocation = async (query) => {
  const cacheKey = `loc_${query.toLowerCase().trim()}`;
  if (apiCache[cacheKey]) return apiCache[cacheKey];

  try {
    const response = await fetch(`${NOMINATIM_BASE_URL}/search?q=${encodeURIComponent(query)}&format=json&limit=1`);
    const data = await response.json();
    
    if (data && data.length > 0) {
      const result = {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        displayName: data[0].display_name
      };
      apiCache[cacheKey] = result;
      return result;
    }
    return null;
  } catch (error) {
    console.error('Error fetching location:', error);
    return null;
  }
};

/**
 * Fallback local dataset centered around coordinates in India
 */
const getIndiaFallbackData = (lat, lng) => {
  const categories = [
    {
      category: 'Cafe',
      names: ['Starbucks Coffee', 'Cafe Coffee Day', 'Blue Tokai Coffee Roasters', 'Third Wave Coffee', 'The Coffee Bean & Tea Leaf'],
      images: ['cafe']
    },
    {
      category: 'Restaurant',
      names: ['Pizza Hut', 'Domino\'s Pizza', 'McDonald\'s', 'Barbeque Nation', 'Sigree Grill', 'Copper Chimney'],
      images: ['restaurant']
    },
    {
      category: 'Hospital',
      names: ['Jupiter Hospital', 'Hiranandani Hospital', 'Fortis Hospital', 'KEM Hospital', 'Ruby Hall Clinic'],
      images: ['hospital']
    },
    {
      category: 'Clinic',
      names: ['Apollo Clinic', 'Metro Dental Care', 'Family Health Clinic', 'Care First Clinic'],
      images: ['clinic']
    },
    {
      category: 'Retail Store',
      names: ['D-Mart Supermarket', 'Reliance Smart', 'Shoppers Stop', 'Decathlon Sports Store', 'Croma Electronics'],
      images: ['shop']
    },
    {
      category: 'Gym',
      names: ['Gold\'s Gym', 'Talwalkars Fitness', 'Cult.fit Center', 'Anytime Fitness'],
      images: ['gym']
    },
    {
      category: 'Workspace',
      names: ['WeWork Co-working', 'Awfis Space', 'Regus Office Center', 'The Coworking Club'],
      images: ['office']
    }
  ];

  return categories.flatMap((catGroup, groupIdx) => {
    return catGroup.names.map((name, itemIdx) => {
      const offsetLat = (Math.random() - 0.5) * 0.03;
      const offsetLng = (Math.random() - 0.5) * 0.03;
      const itemLat = lat + offsetLat;
      const itemLng = lng + offsetLng;
      
      const rating = (Math.random() * (5.0 - 3.8) + 3.8).toFixed(1);
      const reviews = Math.floor(Math.random() * 800) + 12;
      const price = Math.floor(Math.random() * 4) + 1;
      
      const amenities = ['Free WiFi', 'Free Parking', 'AC', 'Wheelchair Accessible', 'Family Friendly', 'Pet Friendly'];
      const activeAmenities = amenities.slice(0, Math.floor(Math.random() * 5) + 2);

      return {
        id: `fallback-${groupIdx}-${itemIdx}-${Date.now()}`,
        name,
        category: catGroup.category,
        rating: parseFloat(rating),
        reviewCount: reviews,
        priceLevel: price,
        address: `${Math.floor(Math.random() * 200) + 1}, Ghodbunder Road, Near Central Mall, Thane (W), Maharashtra, India`,
        city: 'Thane',
        pincode: '400607',
        lat: itemLat,
        lng: itemLng,
        coordinates: [itemLat, itemLng],
        phone: `+91 22 25${Math.floor(Math.random() * 899999) + 100000}`,
        websiteUrl: 'https://www.google.com',
        hasWebsite: true,
        isHttps: true,
        businessHours: '9:00 AM - 10:00 PM',
        status: 'Active',
        dateAdded: new Date().toISOString().split('T')[0],
        imageUrl: `https://loremflickr.com/800/600/${catGroup.images[0]}?lock=${groupIdx * 5 + itemIdx}`,
        isOpen: Math.random() > 0.15,
        photos: [
          `https://loremflickr.com/800/600/${catGroup.images[0]}?lock=${groupIdx * 5 + itemIdx + 1}`,
          `https://loremflickr.com/800/600/${catGroup.images[0]}?lock=${groupIdx * 5 + itemIdx + 2}`,
        ],
        description: `Premium verified ${catGroup.category.toLowerCase()} listing providing top quality amenities in the heart of the city.`,
        amenities: activeAmenities,
        isVerified: true,
        acceptedPayment: ['Cash', 'Credit Card', 'UPI']
      };
    });
  });
};

/**
 * Fetch real businesses around coordinates using Overpass API
 */
export const fetchBusinessesAround = async (lat, lng, radius = 5000) => {
  const cacheKey = `places_${lat.toFixed(4)}_${lng.toFixed(4)}_${radius}`;
  if (apiCache[cacheKey]) return apiCache[cacheKey];

  // Expanded query to cover unlimited local business categories
  const query = `
    [out:json][timeout:25];
    (
      nwr["amenity"~"cafe|restaurant|bar|pub|fast_food|clinic|hospital|pharmacy|school|college|university|bank|atm|courier"](around:${radius},${lat},${lng});
      nwr["shop"](around:${radius},${lat},${lng});
      nwr["leisure"~"fitness_centre|sports_centre|spa|sauna|beauty"](around:${radius},${lat},${lng});
      nwr["office"~"lawyer|accountant|estate_agent|architect"](around:${radius},${lat},${lng});
      nwr["craft"~"electrician|plumber|tailor|carpenter"](around:${radius},${lat},${lng});
    );
    out center 150;
  `;

  try {
    const response = await fetch(OVERPASS_API_URL, {
      method: 'POST',
      body: 'data=' + encodeURIComponent(query),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    const data = await response.json();
    const hydrated = hydrateWithMockData(data.elements);
    
    if (hydrated.length === 0) {
      console.warn("Overpass API returned 0 results. Seeding fallback database.");
      const fallbackData = getIndiaFallbackData(lat, lng);
      apiCache[cacheKey] = fallbackData;
      return fallbackData;
    }

    apiCache[cacheKey] = hydrated;
    return hydrated;
  } catch (error) {
    console.error('Error fetching businesses from Overpass. Loading fallback database:', error);
    const fallbackData = getIndiaFallbackData(lat, lng);
    apiCache[cacheKey] = fallbackData;
    return fallbackData;
  }
};

const getRandomImage = (category, index) => {
  let keyword = 'business';
  if (category === 'Cafe') keyword = 'cafe';
  else if (category === 'Restaurant') keyword = 'restaurant';
  else if (category === 'Hospital') keyword = 'hospital';
  else if (category === 'Clinic') keyword = 'clinic';
  else if (category === 'Medical Store') keyword = 'pharmacy';
  else if (category === 'Education') keyword = 'school';
  else if (category === 'Finance') keyword = 'bank';
  else if (category === 'Courier Services') keyword = 'delivery';
  else if (category === 'Grocery Store') keyword = 'grocery';
  else if (category === 'Shopping Mall') keyword = 'mall';
  else if (category === 'Jeweller') keyword = 'jeweller';
  else if (category === 'Furniture Store') keyword = 'furniture';
  else if (category === 'Pet Shop') keyword = 'pet';
  else if (category === 'Automobile Service') keyword = 'mechanic';
  else if (category === 'Salon & Spa') keyword = 'salon';
  else if (category === 'Legal Service') keyword = 'lawyer';
  else if (category === 'Chartered Accountant') keyword = 'accountant';
  else if (category === 'Real Estate') keyword = 'realty';
  else if (category === 'Home Services') keyword = 'cleaner';
  else if (category === 'Tailor') keyword = 'tailor';

  return `https://loremflickr.com/800/600/${keyword}?lock=${index}`;
};

/**
 * Takes raw Overpass tags and formats them into our robust Business schema,
 * hydrating missing data (photos, reviews) with realistic mock data based on category.
 */
const hydrateWithMockData = (elements) => {
  return elements.filter(el => el.tags && el.tags.name).map((el, index) => {
    const tags = el.tags;
    
    // Detailed dynamic category mapper
    let category = 'Service';
    
    if (tags.amenity) {
      if (['cafe', 'fast_food'].includes(tags.amenity)) category = 'Cafe';
      else if (['restaurant', 'bar', 'pub'].includes(tags.amenity)) category = 'Restaurant';
      else if (tags.amenity === 'hospital') category = 'Hospital';
      else if (tags.amenity === 'clinic') category = 'Clinic';
      else if (tags.amenity === 'pharmacy') category = 'Medical Store';
      else if (['school', 'college', 'university', 'kindergarten'].includes(tags.amenity)) category = 'Education';
      else if (['bank', 'atm'].includes(tags.amenity)) category = 'Finance';
      else if (tags.amenity === 'courier') category = 'Courier Services';
    } else if (tags.shop) {
      if (['supermarket', 'grocery', 'convenience'].includes(tags.shop)) category = 'Grocery Store';
      else if (tags.shop === 'mall') category = 'Shopping Mall';
      else if (tags.shop === 'jewellery') category = 'Jeweller';
      else if (tags.shop === 'furniture') category = 'Furniture Store';
      else if (['pet', 'animal'].includes(tags.shop)) category = 'Pet Shop';
      else if (['car_repair', 'motorcycle_repair'].includes(tags.shop)) category = 'Automobile Service';
      else if (tags.shop === 'hairdresser') category = 'Salon & Spa';
      else if (tags.shop === 'tailor') category = 'Tailor';
      else category = 'Retail Store';
    } else if (tags.leisure) {
      if (['spa', 'sauna', 'massage', 'beauty'].includes(tags.leisure)) category = 'Salon & Spa';
      else if (['fitness_centre', 'sports_centre'].includes(tags.leisure)) category = 'Gym';
    } else if (tags.office) {
      if (tags.office === 'lawyer') category = 'Legal Service';
      else if (tags.office === 'accountant') category = 'Chartered Accountant';
      else if (tags.office === 'estate_agent') category = 'Real Estate';
      else category = 'Workspace';
    } else if (tags.craft) {
      if (['electrician', 'plumber', 'cleaner'].includes(tags.craft)) category = 'Home Services';
      else if (tags.craft === 'tailor') category = 'Tailor';
    }

    const randomRating = (Math.random() * (5.0 - 3.5) + 3.5).toFixed(1);
    const randomReviewCount = Math.floor(Math.random() * 500) + 5;
    const randomPriceLevel = Math.floor(Math.random() * 4) + 1;

    let websiteUrl = tags.website || tags['contact:website'] || '';
    let hasWebsite = !!websiteUrl;
    let isHttps = websiteUrl.startsWith('https');
    
    const city = tags['addr:city'] || 'Thane';
    const pincode = tags['addr:postcode'] || '400607';

    const addressParts = [
      tags['addr:housenumber'] || tags['addr:street_number'],
      tags['addr:street'] || tags['addr:place'] || tags['addr:road'],
      tags['addr:suburb'] || tags['addr:neighbourhood'] || tags['addr:locality'],
      city,
      tags['addr:state'] || 'Maharashtra'
    ].filter(Boolean);

    const address = addressParts.length > 0
      ? addressParts.join(', ')
      : `${tags.name || 'Establishment'}, Ghodbunder Road, Thane, Maharashtra`;

    // Handle lat/lng resolving for nodes, ways, and relations centroids
    const latVal = el.lat || el.center?.lat || 0;
    const lngVal = el.lon || el.center?.lon || 0;

    // Additional Amenities List
    const amenities = [];
    if (tags.wheelchair === 'yes') amenities.push('Wheelchair Accessible');
    if (tags.wifi === 'yes' || tags['internet_access'] === 'wlan') amenities.push('Free WiFi');
    if (tags.parking === 'yes' || tags['parking:fee'] === 'no') amenities.push('Free Parking');
    if (tags.air_conditioning === 'yes') amenities.push('AC');
    if (Math.random() > 0.5) amenities.push('Family Friendly');
    if (Math.random() > 0.7) amenities.push('Pet Friendly');

    return {
      id: el.id.toString(),
      name: tags.name,
      category,
      rating: parseFloat(randomRating),
      reviewCount: randomReviewCount,
      priceLevel: randomPriceLevel,
      address,
      city,
      pincode,
      lat: latVal,
      lng: lngVal,
      coordinates: [latVal, lngVal],
      phone: tags.phone || tags['contact:phone'] || 'Phone not listed',
      websiteUrl,
      hasWebsite,
      isHttps,
      businessHours: tags.opening_hours || 'Hours not listed',
      status: 'Active',
      dateAdded: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
      imageUrl: getRandomImage(category, index),
      isOpen: Math.random() > 0.2,
      photos: [
        getRandomImage(category, index + 1),
        getRandomImage(category, index + 2),
        getRandomImage(category, index + 3),
        getRandomImage(category, index + 4),
      ],
      description: tags.description || `A verified local ${category.toLowerCase()} listing catering to your community needs.`,
      amenities,
      isVerified: Math.random() > 0.3,
      acceptedPayment: ['Cash', 'Credit Card', 'UPI'].slice(0, Math.floor(Math.random() * 3) + 1)
    };
  });
};

/**
 * Local Levenshtein distance for fuzzy matching
 */
const getLevenshteinDistance = (a, b) => {
  const tmp = [];
  let i, j, al = a.length, bl = b.length, r;
  if (al === 0) return bl;
  if (bl === 0) return al;
  for (i = 0; i <= al; i++) tmp[i] = [i];
  for (j = 1; j <= bl; j++) tmp[0][j] = j;
  for (i = 1; i <= al; i++) {
    for (j = 1; j <= bl; j++) {
      r = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
      tmp[i][j] = Math.min(tmp[i - 1][j] + 1, tmp[i][j - 1] + 1, tmp[i - 1][j - 1] + r);
    }
  }
  return tmp[al][bl];
};

/**
 * Typo tolerant and fuzzy search filter
 */
export const fuzzySearch = (list, query) => {
  if (!query || query.trim() === '') return list;
  const cleanQ = query.toLowerCase().trim();
  
  return list.filter(item => {
    const name = item.name.toLowerCase();
    const cat = item.category.toLowerCase();
    const addr = item.address.toLowerCase();
    
    // Direct token matching
    if (name.includes(cleanQ) || cat.includes(cleanQ) || addr.includes(cleanQ)) return true;
    
    const tokens = cleanQ.split(/\s+/);
    return tokens.every(token => {
      if (token.length < 3) return name.includes(token) || cat.includes(token);
      
      const nameWords = name.split(/[\s,.-]+/);
      const catWords = cat.split(/[\s,.-]+/);
      const allWords = [...nameWords, ...catWords];
      
      return allWords.some(word => {
        if (Math.abs(word.length - token.length) > 2) return false;
        return getLevenshteinDistance(word, token) <= 1; // Allow 1 typo
      });
    });
  });
};
