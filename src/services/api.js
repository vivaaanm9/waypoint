// Service for OpenStreetMap APIs (Nominatim & Overpass)

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';
const OVERPASS_API_URL = 'https://overpass-api.de/api/interpreter';

/**
 * Geocode a location string to coordinates using Nominatim
 */
export const searchLocation = async (query) => {
  try {
    const response = await fetch(`${NOMINATIM_BASE_URL}/search?q=${encodeURIComponent(query)}&format=json&limit=1`);
    const data = await response.json();
    
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        displayName: data[0].display_name
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching location:', error);
    return null;
  }
};

/**
 * Fetch real businesses around coordinates using Overpass API
 */
export const fetchBusinessesAround = async (lat, lng, radius = 5000) => {
  // Query for cafes, restaurants, bars, shops, and healthcare
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"~"cafe|restaurant|bar|pub|fast_food|clinic|hospital"](around:${radius},${lat},${lng});
      node["shop"](around:${radius},${lat},${lng});
      node["leisure"~"fitness_centre|sports_centre"](around:${radius},${lat},${lng});
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
    return hydrateWithMockData(data.elements);
  } catch (error) {
    console.error('Error fetching businesses from Overpass:', error);
    return [];
  }
};

const getRandomImage = (category, index) => {
  // Convert category to a safe keyword (e.g. "Retail Stores" -> "store", "Healthcare" -> "hospital")
  let keyword = 'business';
  if (category === 'Cafe') keyword = 'cafe';
  else if (category === 'Restaurant') keyword = 'restaurant';
  else if (category === 'Healthcare') keyword = 'hospital';
  else if (category === 'Retail Stores') keyword = 'shop';
  else if (category === 'Gyms') keyword = 'gym';
  else if (category === 'Service') keyword = 'office';

  // Use loremflickr for unique, semantic images
  return `https://loremflickr.com/800/600/${keyword}?lock=${index}`;
};

/**
 * Takes raw Overpass tags and formats them into our robust Business schema,
 * hydrating missing data (photos, reviews) with realistic mock data based on category.
 */
const hydrateWithMockData = (elements) => {
  return elements.filter(el => el.tags && el.tags.name).map((el, index) => {
    const tags = el.tags;
    
    // Determine category
    let category = 'Service';
    
    if (tags.amenity) {
      if (['cafe', 'fast_food'].includes(tags.amenity)) { category = 'Cafe'; }
      else if (['restaurant', 'bar', 'pub'].includes(tags.amenity)) { category = 'Restaurant'; }
      else if (['clinic', 'hospital'].includes(tags.amenity)) { category = 'Healthcare'; }
    } else if (tags.shop) {
      category = 'Retail Stores';
    } else if (tags.leisure) {
      category = 'Gyms';
    }

    // Hydrate realistic ratings
    // Standard normal distribution approximation for realistic scores 3.5 - 5.0
    const randomRating = (Math.random() * (5.0 - 3.5) + 3.5).toFixed(1);
    const randomReviewCount = Math.floor(Math.random() * 500) + 5;
    const randomPriceLevel = Math.floor(Math.random() * 4) + 1;

    // Standardize website
    let websiteUrl = tags.website || tags['contact:website'] || '';
    let hasWebsite = !!websiteUrl;
    let isHttps = websiteUrl.startsWith('https');
    
    // Address building
    const address = [
      tags['addr:housenumber'],
      tags['addr:street']
    ].filter(Boolean).join(' ') || 'Address not listed';

    const city = tags['addr:city'] || '';
    const pincode = tags['addr:postcode'] || '';

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
      lat: el.lat,
      lng: el.lon,
      phone: tags.phone || tags['contact:phone'] || 'Phone not listed',
      websiteUrl,
      hasWebsite,
      isHttps,
      businessHours: tags.opening_hours || 'Hours not listed',
      status: 'Active',
      dateAdded: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
      imageUrl: getRandomImage(category, index),
      isOpen: Math.random() > 0.2, // 80% chance open for mock
      photos: [
        getRandomImage(category, index + 1),
        getRandomImage(category, index + 2),
        getRandomImage(category, index + 3),
        getRandomImage(category, index + 4),
      ]
    };
  });
};
