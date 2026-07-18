import React, { useState, useEffect } from 'react';

// Import shell components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
// Context
import { useFavorites } from './context/FavoritesContext';

// Database place coordinates
import { MOCK_PLACES } from './data/places';
import { Star, MapPin, Phone, Globe, Navigation, Heart, ExternalLink } from 'lucide-react';

// Helper to calculate distance in meters
const getDistanceMeters = (c1, c2) => {
  if (!c1 || !c2) return 0;
  const R = 6371e3;
  const lat1 = c1[0] * Math.PI / 180;
  const lat2 = c2[0] * Math.PI / 180;
  const dLat = (c2[0] - c1[0]) * Math.PI / 180;
  const dLng = (c2[1] - c1[1]) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Map OSM categories to custom categories
const mapOsmClassToCategory = (osmClass, osmType) => {
  const type = osmType || '';
  const cls = osmClass || '';
  if (type.includes('cafe') || type.includes('restaurant') || type.includes('fast_food') || type.includes('bar') || type.includes('pub') || type.includes('food')) {
    return 'Cafes';
  }
  if (type.includes('office') || type.includes('coworking') || type.includes('library') || type.includes('workspace') || type.includes('college') || type.includes('university') || type.includes('school')) {
    return 'Workspaces';
  }
  if (cls === 'healthcare' || type.includes('hospital') || type.includes('clinic') || type.includes('dentist') || type.includes('pharmacy') || type.includes('doctor')) {
    return 'Health';
  }
  return 'Tourist'; // Default
};

const getCategoryDefaultImage = (cat) => {
  if (cat === 'Cafes') return 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80';
  if (cat === 'Workspaces') return 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80';
  if (cat === 'Health') return 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=400&q=80';
  return 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=400&q=80';
};

const MAP_THEMES = [
  { name: 'Google Roadmap', url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', attribution: '&copy; Google Maps' },
  { name: 'Google Satellite', url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', attribution: '&copy; Google Maps' },
  { name: 'Minimal Light', url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>' }
];

export default function App() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  
  const [activeTab, setActiveTab] = useState('Home');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Advanced search filters state
  const [filters, setFilters] = useState({
    category: 'All',
    minRating: 0,
    minReviews: 0,
    openNowOnly: false,
    priceLevel: 'All',
    hasWebsiteOnly: false,
    businessStatus: 'All',
    isGeofenceEnabled: false,
    geofenceRadius: 1200,
    country: '',
    state: '',
    city: '',
    pincode: ''
  });

  // Map viewport & GPS states
  const [mapCenter, setMapCenter] = useState([40.7580, -73.9855]); // Times Square NY
  const [mapZoom, setMapZoom] = useState(14);
  const [userCoords, setUserCoords] = useState(null);
  const [userCountryCode, setUserCountryCode] = useState('');
  const [showRoute, setShowRoute] = useState(false);
  const [routeCoords, setRouteCoords] = useState([]);
  const [routeDuration, setRouteDuration] = useState(null);
  const [routeDistance, setRouteDistance] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Dynamic remote search states
  const [osmPlaces, setOsmPlaces] = useState([]);
  const [isSearchingRemote, setIsSearchingRemote] = useState(false);

  // Layout switcher
  const [isGridView, setIsGridView] = useState(false);
  const [activeThemeIdx, setActiveThemeIdx] = useState(0);

  // Dynamic loading pagination
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoadingMore, setIsLoadingMore] = useState(false);



  // Reset visibility count on search or filter changes
  useEffect(() => {
    setVisibleCount(3);
  }, [searchTerm, filters]);

  // Auto Geolocation on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = [position.coords.latitude, position.coords.longitude];
          setUserCoords(coords);
          setMapCenter(coords);
          setMapZoom(14);

          // Reverse geocode user country
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords[0]}&lon=${coords[1]}&zoom=5`)
            .then(res => res.json())
            .then(reverseData => {
              if (reverseData.address && reverseData.address.country_code) {
                setUserCountryCode(reverseData.address.country_code);
              }
            })
            .catch(err => console.warn("Auto-geolocation reverse lookup failed", err));
        },
        (error) => {
          console.warn("Auto-geolocation denied, falling back to Times Square coordinates.");
          const fallback = [40.7580, -73.9855];
          setUserCoords(fallback);
          setMapCenter(fallback);
          setMapZoom(14);
        }
      );
    } else {
      const fallback = [40.7580, -73.9855];
      setUserCoords(fallback);
      setMapCenter(fallback);
      setMapZoom(14);
    }
  }, []);

  // OSRM Pedestrian Routing Path Calculation Effect
  useEffect(() => {
    if (showRoute && userCoords && selectedPlace) {
      const [userLat, userLng] = userCoords;
      const [destLat, destLng] = selectedPlace.coordinates;
      
      fetch(`https://router.project-osrm.org/route/v1/foot/${userLng},${userLat};${destLng},${destLat}?overview=full&geometries=geojson`)
        .then(res => res.json())
        .then(data => {
          if (data.routes && data.routes.length > 0) {
            const route = data.routes[0];
            const coords = route.geometry.coordinates.map(c => [c[1], c[0]]);
            setRouteCoords(coords);
            setRouteDuration(Math.round(route.duration / 60)); // minutes
            setRouteDistance((route.distance / 1000).toFixed(1)); // km
          } else {
            setRouteCoords([userCoords, selectedPlace.coordinates]);
            setRouteDuration(null);
            setRouteDistance(null);
          }
        })
        .catch(err => {
          console.error("OSRM Routing failed, using straight-line path fallback", err);
          setRouteCoords([userCoords, selectedPlace.coordinates]);
          setRouteDuration(null);
          setRouteDistance(null);
        });
    } else {
      setRouteCoords([]);
      setRouteDuration(null);
      setRouteDistance(null);
    }
  }, [showRoute, userCoords, selectedPlace]);

  // OpenStreetMap Nominatim Dynamic Geocoding and Place Search Effect
  useEffect(() => {
    const currentCenter = userCoords || mapCenter;
    const centerBiasLat = currentCenter[0];
    const centerBiasLng = currentCenter[1];

    setIsSearchingRemote(true);

    const queryTerm = searchTerm.trim() !== ''
      ? searchTerm
      : (filters.category !== 'All' ? filters.category : 'point of interest');

    let cleanQuery = queryTerm.replace(/(near me|nearest|around me|in vicinity)/gi, '').trim();
    if (cleanQuery === '') {
      cleanQuery = 'point of interest';
    }

    const delta = 0.25;
    const latMin = centerBiasLat - delta;
    const latMax = centerBiasLat + delta;
    const lngMin = centerBiasLng - delta;
    const lngMax = centerBiasLng + delta;

    const processOsmData = (data) => {
      const parsed = data.map((item, idx) => {
        const cat = mapOsmClassToCategory(item.class, item.type);
        const name = item.address.amenity || item.address.name || item.address.shop || item.address.tourism || item.display_name.split(',')[0];
        
        const address = item.address || {};
        const country = address.country || '';
        const state = address.state || address.region || '';
        const city = address.city || address.town || address.village || address.suburb || '';
        const pincode = address.postcode || '';
        const locality = address.suburb || address.neighbourhood || address.road || '';

        return {
          id: `osm-${item.place_id || idx}`,
          name: name,
          category: cat,
          coordinates: [parseFloat(item.lat), parseFloat(item.lon)],
          address: item.display_name,
          rating: parseFloat((4.0 + Math.random() * 0.9).toFixed(1)),
          reviews: Math.floor(15 + Math.random() * 150),
          hours: '9:00 AM - 9:00 PM',
          phone: '+1 (555) 019-2831',
          image: getCategoryDefaultImage(cat),
          description: item.display_name,
          country,
          state,
          city,
          pincode,
          locality,
          priceLevel: Math.floor(1 + Math.random() * 4),
          openNow: Math.random() > 0.3,
          businessStatus: 'Active',
          reviewsList: [
            { name: 'John D.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80', rating: 4, text: 'Clean and highly accessible spot.', date: '2026-07-11' }
          ]
        };
      });

      parsed.sort((a, b) => {
        const distA = getDistanceMeters([centerBiasLat, centerBiasLng], a.coordinates);
        const distB = getDistanceMeters([centerBiasLat, centerBiasLng], b.coordinates);
        return distA - distB;
      });

      return parsed;
    };

    const searchUrl = `https://nominatim.openstreetmap.org/search?format=json&limit=50&q=${encodeURIComponent(cleanQuery)}&lat=${centerBiasLat}&lon=${centerBiasLng}&viewbox=${lngMin},${latMin},${lngMax},${latMax}&bounded=0&addressdetails=1`;

    fetch(searchUrl, { headers: { 'Accept-Language': 'en' } })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const parsed = processOsmData(data);
          setOsmPlaces(parsed);
          if (searchTerm.trim() !== '') {
            setMapCenter(parsed[0].coordinates);
            setMapZoom(15);
          }
        } else {
          setOsmPlaces([]);
        }
        setIsSearchingRemote(false);
      })
      .catch(err => {
        console.warn("OSM search failed, generating mock results locally...", err);
        const localMockPlaces = MOCK_PLACES.map((p, idx) => {
          const offsetLat = (Math.random() - 0.5) * 0.02;
          const offsetLng = (Math.random() - 0.5) * 0.02;
          return {
            ...p,
            id: `local-fallback-${idx}`,
            coordinates: [centerBiasLat + offsetLat, centerBiasLng + offsetLng],
            address: `${p.address.split(',')[0]}, near current location`,
            city: 'Current Location',
            country: 'Global'
          };
        });
        setOsmPlaces(localMockPlaces);
        setIsSearchingRemote(false);
      });
  }, [searchTerm, userCoords, mapCenter, filters.category]);

  // Locate user using browser Geolocation API
  const handleLocateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = [position.coords.latitude, position.coords.longitude];
          setUserCoords(coords);
          setMapCenter(coords);
          setMapZoom(15);

          // Reverse geocode user country
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords[0]}&lon=${coords[1]}&zoom=5`)
            .then(res => res.json())
            .then(reverseData => {
              if (reverseData.address && reverseData.address.country_code) {
                setUserCountryCode(reverseData.address.country_code);
              }
            })
            .catch(err => console.warn("Locate user reverse geocoding failed", err));
        },
        (error) => {
          console.warn("Geolocation permission denied, falling back to Times Square coordinate.");
          const fallback = [40.7500, -73.9910];
          setUserCoords(fallback);
          setMapCenter(fallback);
          setMapZoom(15);
          alert("Geolocation permission denied. Simulation coordinates active.");
        }
      );
    } else {
      const fallback = [40.7500, -73.9910];
      setUserCoords(fallback);
      setMapCenter(fallback);
      setMapZoom(15);
    }
  };

  // Sync place selection
  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
    setMapCenter(place.coordinates);
    setMapZoom(16);
    setShowRoute(false);
  };



  const handleAreaSelect = (coords, label) => {
    setUserCoords(coords);
    setMapCenter(coords);
    setMapZoom(15);
    setSearchTerm('');
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setFilters({
      category: 'All',
      minRating: 0,
      minReviews: 0,
      openNowOnly: false,
      priceLevel: 'All',
      hasWebsiteOnly: false,
      businessStatus: 'All',
      isGeofenceEnabled: false,
      geofenceRadius: 1200,
      country: '',
      state: '',
      city: '',
      pincode: ''
    });
    setSelectedPlace(null);
    setShowRoute(false);
    setUserCoords(null);
    setVisibleCount(3);
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 3);
      setIsLoadingMore(false);
    }, 450);
  };

  // Determine active base places list (remote OSM searches vs local Manhattan list)
  const activePlacesList = searchTerm.trim() !== '' && osmPlaces.length > 0
    ? osmPlaces
    : MOCK_PLACES;

  // Apply all filter hooks
  const filteredPlaces = activePlacesList.filter(place => {
    const isFavTab = activeTab === 'Favourites';

    // 1. Category Filter
    if (filters.category !== 'All' && place.category !== filters.category) return false;

    // 2. Favourites Tab checklist
    if (isFavTab && !favorites.includes(place.id)) return false;

    // 3. Proximity geofencing radius filter
    if (filters.isGeofenceEnabled && userCoords && place.coordinates) {
      const dist = getDistanceMeters(userCoords, place.coordinates);
      if (dist > filters.geofenceRadius) return false;
    }

    // 4. Advanced filters
    if (filters.minRating && place.rating < filters.minRating) return false;
    if (filters.minReviews && place.reviews < filters.minReviews) return false;
    if (filters.openNowOnly && !place.openNow) return false;
    if (filters.priceLevel !== 'All' && place.priceLevel !== filters.priceLevel) return false;
    if (filters.hasWebsiteOnly && !place.website) return false;
    if (filters.businessStatus !== 'All' && place.businessStatus !== filters.businessStatus) return false;

    // 5. Geolocation scope filters
    if (filters.country && !place.country?.toLowerCase().includes(filters.country.toLowerCase())) return false;
    if (filters.state && !place.state?.toLowerCase().includes(filters.state.toLowerCase())) return false;
    if (filters.city && !place.city?.toLowerCase().includes(filters.city.toLowerCase()) && !place.locality?.toLowerCase().includes(filters.city.toLowerCase())) return false;
    if (filters.pincode && !place.pincode?.includes(filters.pincode)) return false;

    // 6. Global Search text filter (if search matches title/address etc on mock fallback list)
    if (searchTerm.trim() !== '' && osmPlaces.length === 0) {
      const searchTerms = searchTerm.toLowerCase().split(/\s+/).filter(Boolean);
      const matchesSearch = searchTerms.every(term =>
        place.name.toLowerCase().includes(term) ||
        place.address.toLowerCase().includes(term) ||
        place.category.toLowerCase().includes(term) ||
        (place.description && place.description.toLowerCase().includes(term))
      );
      if (!matchesSearch) return false;
    }

    return true;
  });

  // Slice results
  const hasMorePlaces = filteredPlaces.length > visibleCount;
  const paginatedPlaces = filteredPlaces.slice(0, visibleCount);

  return (
    <div className="bg-brand-bg text-slate-800 min-h-screen flex flex-col font-sans selection:bg-brand-accent antialiased overflow-x-hidden">
      
      {/* Component 1: Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-grow flex flex-col w-full relative z-10">
        
        {/* TAB 1: HOME PAGE */}
        {activeTab === 'Home' && (
          <HomePage
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            filters={filters}
            setFilters={setFilters}
            handlePlaceSelect={handlePlaceSelect}
          />
        )}

        {/* TAB 2, 3 & 4: MAP / EXPLORER / FAVOURITES / DASHBOARD */}
        {(activeTab === 'Search Map' || activeTab === 'Favourites' || activeTab === 'Dashboard') && (
          <SearchPage
            activeTab={activeTab}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filters={filters}
            setFilters={setFilters}
            mapCenter={mapCenter}
            mapZoom={mapZoom}
            userCoords={userCoords}
            setUserCoords={setUserCoords}
            showRoute={showRoute}
            setShowRoute={setShowRoute}
            routeCoords={routeCoords}
            routeDuration={routeDuration}
            routeDistance={routeDistance}
            selectedPlace={selectedPlace}
            filteredPlaces={filteredPlaces}
            paginatedPlaces={paginatedPlaces}
            isSearchingRemote={isSearchingRemote}
            isGridView={isGridView}
            setIsGridView={setIsGridView}
            visibleCount={visibleCount}
            hasMorePlaces={hasMorePlaces}
            isLoadingMore={isLoadingMore}
            activeThemeIdx={activeThemeIdx}
            setActiveThemeIdx={setActiveThemeIdx}
            handlePlaceSelect={handlePlaceSelect}
            handleAreaSelect={handleAreaSelect}
            handleResetFilters={handleResetFilters}
            handleLoadMore={handleLoadMore}
            MAP_THEMES={MAP_THEMES}
            onLocateUser={handleLocateUser}
            onRecenter={() => {
              setMapCenter([40.7580, -73.9855]);
              setMapZoom(14);
            }}
            onZoomIn={() => setMapZoom(prev => Math.min(prev + 1, 19))}
            onZoomOut={() => setMapZoom(prev => Math.max(prev - 1, 3))}
          />
        )}



      </main>

      {/* Component 2: Footer */}
      <Footer setActiveTab={setActiveTab} />



    </div>
  );
}