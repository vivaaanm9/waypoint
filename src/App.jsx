import React, { useState, useEffect } from 'react';

// Import exactly 17 components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import SearchBar from './components/SearchBar';
import SearchSuggestions from './components/SearchSuggestions';
import LocationSearch from './components/LocationSearch';
import RadiusSelector from './components/RadiusSelector';
import InteractiveMap from './components/InteractiveMap';
import BusinessMarker from './components/BusinessMarker';
import BusinessPopup from './components/BusinessPopup';
import MapControls from './components/MapControls';
import CategoryCards from './components/CategoryCards';
import FeaturedBusinesses from './components/FeaturedBusinesses';
import BusinessList from './components/BusinessList';
import BusinessGrid from './components/BusinessGrid';
import PaginationScroll from './components/PaginationScroll';
import EmptyState from './components/EmptyState';

// Import database place coordinates
import { MOCK_PLACES } from './data/places';

// Helper to calculate distance in meters
const getDistanceMeters = (c1, c2) => {
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
  const [activeTab, setActiveTab] = useState('Home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Map viewport & GPS states
  const [mapCenter, setMapCenter] = useState([40.7580, -73.9855]); // Times Square NY
  const [mapZoom, setMapZoom] = useState(14);
  const [userCoords, setUserCoords] = useState(null);
  const [userCountryCode, setUserCountryCode] = useState(''); // ISO country code
  const [showRoute, setShowRoute] = useState(false);
  const [routeCoords, setRouteCoords] = useState([]);
  const [routeDuration, setRouteDuration] = useState(null);
  const [routeDistance, setRouteDistance] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Dynamic remote search states
  const [osmPlaces, setOsmPlaces] = useState([]);
  const [isSearchingRemote, setIsSearchingRemote] = useState(false);

  // Geofencing states
  const [isGeofenceEnabled, setIsGeofenceEnabled] = useState(false);
  const [geofenceRadius, setGeofenceRadius] = useState(1200); // meters
  
  // Display layout switch (list view vs grid view)
  const [isGridView, setIsGridView] = useState(false);
  const [activeThemeIdx, setActiveThemeIdx] = useState(0);

  // Dynamic list loading (Infinite Scroll / Pagination Load More)
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Reset visibility count on search or category changes
  useEffect(() => {
    setVisibleCount(3);
  }, [searchTerm, selectedCategory, isGeofenceEnabled, geofenceRadius]);

  // Favourites state synced with localStorage
  const [favourites, setFavourites] = useState([]);

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

  useEffect(() => {
    const saved = localStorage.getItem('waypoint_favs');
    if (saved) {
      try { setFavourites(JSON.parse(saved)); } catch (e) {}
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
    if (searchTerm.trim() === '') {
      setOsmPlaces([]);
      return;
    }

    setIsSearchingRemote(true);

    // Clean up search query by stripping phrases like 'near me'
    let cleanQuery = searchTerm.replace(/(near me|nearest|around me|in vicinity)/gi, '').trim();
    if (cleanQuery === '') {
      cleanQuery = selectedCategory !== 'All' ? selectedCategory : 'point of interest';
    }

    const centerBiasLat = userCoords ? userCoords[0] : mapCenter[0];
    const centerBiasLng = userCoords ? userCoords[1] : mapCenter[1];

    // Define a 25km bounding box centered on user coordinates to bias search results
    const delta = 0.25;
    const latMin = centerBiasLat - delta;
    const latMax = centerBiasLat + delta;
    const lngMin = centerBiasLng - delta;
    const lngMax = centerBiasLng + delta;

    // Helper to map and sort resolved OSM locations
    const processOsmData = (data) => {
      const parsed = data.map((item, idx) => {
        const cat = mapOsmClassToCategory(item.class, item.type);
        const name = item.address.amenity || item.address.name || item.address.shop || item.address.tourism || item.display_name.split(',')[0];
        return {
          id: `osm-${item.place_id || idx}`,
          name: name,
          category: cat,
          coordinates: [parseFloat(item.lat), parseFloat(item.lon)],
          address: item.display_name,
          rating: parseFloat((4.0 + Math.random() * 0.9).toFixed(1)), // Simulate authentic review ratings
          reviews: Math.floor(15 + Math.random() * 150),
          hours: '9:00 AM - 9:00 PM',
          phone: '+1 (555) 019-2831',
          image: getCategoryDefaultImage(cat),
          description: item.display_name
        };
      });

      // Sort results by proximity to reference coordinates (center bias)
      parsed.sort((a, b) => {
        const distA = getDistanceMeters([centerBiasLat, centerBiasLng], a.coordinates);
        const distB = getDistanceMeters([centerBiasLat, centerBiasLng], b.coordinates);
        return distA - distB;
      });

      return parsed;
    };

    // Construct Tier-1: Strict Local Bounded Search URL
    const localUrl = `https://nominatim.openstreetmap.org/search?format=json&limit=50&q=${encodeURIComponent(cleanQuery)}&lat=${centerBiasLat}&lon=${centerBiasLng}&viewbox=${lngMin},${latMin},${lngMax},${latMax}&bounded=1&addressdetails=1${userCountryCode ? `&countrycodes=${userCountryCode}` : ''}`;

    fetch(localUrl, { headers: { 'Accept-Language': 'en' } })
      .then(res => res.json())
      .then(localData => {
        if (Array.isArray(localData) && localData.length > 0) {
          const parsed = processOsmData(localData);
          setOsmPlaces(parsed);
          setMapCenter(parsed[0].coordinates);
          setMapZoom(15);
          setIsSearchingRemote(false);
        } else {
          // Tier-1 returned empty, fallback to Tier-2: Country-Biased fallback search
          const fallbackUrl = `https://nominatim.openstreetmap.org/search?format=json&limit=50&q=${encodeURIComponent(cleanQuery)}&lat=${centerBiasLat}&lon=${centerBiasLng}&viewbox=${lngMin},${latMin},${lngMax},${latMax}&bounded=0&addressdetails=1${userCountryCode ? `&countrycodes=${userCountryCode}` : ''}`;
          
          fetch(fallbackUrl, { headers: { 'Accept-Language': 'en' } })
            .then(res => res.json())
            .then(fallbackData => {
              if (Array.isArray(fallbackData) && fallbackData.length > 0) {
                const parsed = processOsmData(fallbackData);
                setOsmPlaces(parsed);
                setMapCenter(parsed[0].coordinates);
                setMapZoom(15);
              } else {
                setOsmPlaces([]);
              }
              setIsSearchingRemote(false);
            })
            .catch(err => {
              console.error("OSM fallback search failed", err);
              setOsmPlaces([]);
              setIsSearchingRemote(false);
            });
        }
      })
      .catch(err => {
        console.error("OSM search failed", err);
        setOsmPlaces([]);
        setIsSearchingRemote(false);
      });
  }, [searchTerm, userCoords, userCountryCode]);

  const handleToggleFavourite = (id) => {
    let updated;
    if (favourites.includes(id)) {
      updated = favourites.filter(favId => favId !== id);
    } else {
      updated = [...favourites, id];
    }
    setFavourites(updated);
    localStorage.setItem('waypoint_favs', JSON.stringify(updated));
  };

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
    setMapCenter(coords);
    setMapZoom(15);
    setSearchTerm(label);
  };

  // Direct reset helper
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setIsGeofenceEnabled(false);
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

  // Determine active base places list (remote OSM searches vs local Manhattan checklist)
  const activePlacesList = searchTerm.trim() !== '' && osmPlaces.length > 0
    ? osmPlaces
    : MOCK_PLACES;

  // Filter places based on search inputs, categories, favourites, and geofencing radius
  const filteredPlaces = activePlacesList.filter(place => {
    const matchesCategory = selectedCategory === 'All' || place.category === selectedCategory;
    const matchesFavFilter = activeTab !== 'Favourites' || favourites.includes(place.id);
    const matchesGeofence = !isGeofenceEnabled || !userCoords ||
      getDistanceMeters(userCoords, place.coordinates) <= geofenceRadius;

    // Apply text filters only if we are using the local MOCK fallback list
    let matchesSearch = true;
    if (searchTerm.trim() !== '' && osmPlaces.length === 0) {
      const searchTerms = searchTerm.toLowerCase().split(/\s+/).filter(Boolean);
      matchesSearch = searchTerms.every(term =>
        place.name.toLowerCase().includes(term) ||
        place.address.toLowerCase().includes(term) ||
        place.category.toLowerCase().includes(term) ||
        (place.description && place.description.toLowerCase().includes(term))
      );
    }

    return matchesCategory && matchesFavFilter && matchesGeofence && matchesSearch;
  });

  // Slice dynamic list loading results
  const hasMorePlaces = filteredPlaces.length > visibleCount;
  const paginatedPlaces = filteredPlaces.slice(0, visibleCount);

  return (
    <div className="bg-brand-bg text-slate-800 min-h-screen flex flex-col font-sans selection:bg-brand-accent antialiased overflow-x-hidden">
      
      {/* Component 1: Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-grow flex flex-col w-full relative z-10">
        
        {/* TAB 1: HOME PAGE */}
        {activeTab === 'Home' && (
          <div className="w-full flex flex-col space-y-12 pb-16">
            {/* Component 3: HeroSection (wraps SearchBar [C4] and SearchSuggestions [C5]) */}
            <HeroSection 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
            />

            {/* Component 12: CategoryCards */}
            <div className="px-6 sm:px-8">
              <CategoryCards 
                selectedCategory={selectedCategory} 
                setSelectedCategory={(cat) => {
                  setSelectedCategory(cat);
                  setActiveTab('Search Map');
                }} 
              />
            </div>

            {/* Component 13: FeaturedBusinesses */}
            <div className="px-6 sm:px-8 max-w-5xl mx-auto w-full">
              <FeaturedBusinesses onSelect={(place) => {
                handlePlaceSelect(place);
                setActiveTab('Search Map');
              }} />
            </div>
          </div>
        )}

        {/* TAB 2 & 3: MAP / FAVOURITES DASHBOARD */}
        {(activeTab === 'Search Map' || activeTab === 'Favourites') && (
          <div className="w-full flex flex-col lg:flex-row flex-grow min-h-[calc(100vh-68px)] overflow-hidden">
            
            {/* SIDEBAR PANEL */}
            <div className="w-full lg:w-[420px] bg-white border-r border-brand-border/40 shadow-lg flex flex-col shrink-0 z-10 p-6 overflow-y-auto space-y-6">
              
              <div className="pb-4 border-b border-slate-100 flex justify-between items-center">
                <div className="space-y-1">
                  <h2 className="text-lg font-black text-slate-800 leading-none">
                    {activeTab === 'Favourites' ? 'Saved Waypoints' : 'Waypoint Explorer'}
                  </h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    {filteredPlaces.length} locations found {isSearchingRemote && '(Searching...)'}
                  </p>
                </div>
                
                {/* Toggle grid/list view */}
                <button
                  onClick={() => setIsGridView(!isGridView)}
                  className="px-4 py-2 border border-brand-border/40 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  {isGridView ? 'List View' : 'Grid View'}
                </button>
              </div>
              
              {/* Component 4 & 5: SearchBar inside the Sidebar */}
              {activeTab !== 'Favourites' && (
                <div className="w-full">
                  <SearchBar 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm} 
                  />
                </div>
              )}

              {/* Component 6: LocationSearch (only shown in Explore Tab) */}
              {activeTab !== 'Favourites' && (
                <LocationSearch onAreaSelect={handleAreaSelect} />
              )}

              {/* Component 7: RadiusSelector (Geofence slide control) */}
              {activeTab !== 'Favourites' && (
                <RadiusSelector 
                  isEnabled={isGeofenceEnabled} 
                  setIsEnabled={setIsGeofenceEnabled} 
                  radius={geofenceRadius} 
                  setRadius={setGeofenceRadius} 
                />
              )}

              {/* Render either List, Grid, or EmptyState */}
              {paginatedPlaces.length > 0 ? (
                <div className="space-y-4">
                  {isGridView ? (
                    /* Component 15: BusinessGrid */
                    <BusinessGrid 
                      places={paginatedPlaces}
                      selectedPlace={selectedPlace}
                      onSelect={handlePlaceSelect}
                      favourites={favourites}
                      onToggleFavourite={handleToggleFavourite}
                    />
                  ) : (
                    /* Component 14: BusinessList */
                    <BusinessList 
                      places={paginatedPlaces}
                      selectedPlace={selectedPlace}
                      onSelect={handlePlaceSelect}
                      favourites={favourites}
                      onToggleFavourite={handleToggleFavourite}
                    />
                  )}

                  {/* Component 16: PaginationScroll */}
                  <PaginationScroll 
                    hasMore={hasMorePlaces}
                    onLoadMore={handleLoadMore}
                    loading={isLoadingMore}
                  />
                </div>
              ) : (
                /* Component 17: EmptyState */
                <EmptyState 
                  message="No coordinates matched your current search parameters." 
                  onReset={handleResetFilters} 
                />
              )}

              {/* Directions navigation actions if marker is selected */}
              {selectedPlace && (
                <div className="p-4 bg-brand-accent/30 border border-brand-border/30 rounded-2.5xl flex flex-col gap-3">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between items-center text-xs font-black text-slate-755">
                      <span>Directions to {selectedPlace.name}</span>
                      <button 
                        onClick={() => {
                          if (!userCoords) handleLocateUser();
                          setShowRoute(!showRoute);
                        }}
                        className="px-3.5 py-2 bg-brand-accent hover:bg-brand-steel/30 rounded-xl text-xs font-black text-slate-700 transition-colors cursor-pointer"
                      >
                        {showRoute ? 'Hide Route' : 'Calculate Shortest Path'}
                      </button>
                    </div>
                    {showRoute && routeDuration !== null && routeDistance !== null && (
                      <div className="p-3.5 bg-white rounded-xl border border-brand-border/30 text-xs font-bold text-slate-705 mt-1 space-y-1 animate-[fadeIn_0.2s_ease-out] select-none">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Total Distance:</span>
                          <span className="text-slate-800">{routeDistance} km</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Travel Duration:</span>
                          <span className="text-slate-800">{routeDuration} mins</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => alert(`GPS coordinates saved: [${selectedPlace.coordinates.join(', ')}]`)}
                    className="w-full py-3.5 bg-slate-800 text-sm font-black text-white rounded-xl hover:bg-slate-900 transition-all active:scale-97 cursor-pointer"
                  >
                    Log Destination Coordinates
                  </button>
                </div>
              )}

            </div>

            {/* MAP VIEW CONTAINER */}
            <div className="flex-grow h-[450px] lg:h-auto relative z-0">
              
              {/* Component 8: InteractiveMap */}
              <InteractiveMap
                center={mapCenter}
                zoom={mapZoom}
                themeUrl={MAP_THEMES[activeThemeIdx].url}
                themeAttribution={MAP_THEMES[activeThemeIdx].attribution}
                isGeofenceEnabled={isGeofenceEnabled}
                userCoords={userCoords}
                geofenceRadius={geofenceRadius}
                showRoute={showRoute}
                routeCoords={routeCoords}
                selectedPlace={selectedPlace}
                onMapClick={(latlng) => {
                  setUserCoords(latlng);
                  setShowRoute(true);
                }}
              >
                {/* Component 9: BusinessMarker (which embeds Component 10: BusinessPopup) */}
                {filteredPlaces.map((place) => (
                  <BusinessMarker 
                    key={place.id}
                    business={place}
                    isActive={selectedPlace && selectedPlace.id === place.id}
                    onClick={handlePlaceSelect}
                  />
                ))}
              </InteractiveMap>

              {/* Component 11: MapControls */}
              <MapControls 
                onZoomIn={() => setMapZoom(prev => Math.min(prev + 1, 19))}
                onZoomOut={() => setMapZoom(prev => Math.max(prev - 1, 3))}
                onRecenter={() => {
                  setMapCenter([40.7580, -73.9855]);
                  setMapZoom(14);
                }}
                onLocateUser={handleLocateUser}
                themes={MAP_THEMES}
                activeThemeIdx={activeThemeIdx}
                setActiveThemeIdx={setActiveThemeIdx}
              />

            </div>

          </div>
        )}

      </main>

      {/* Component 2: Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}