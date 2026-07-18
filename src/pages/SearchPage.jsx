import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import LocationSearch from '../components/LocationSearch';
import SearchFilters from '../components/SearchFilters';
import BusinessList from '../components/BusinessList';
import BusinessGrid from '../components/BusinessGrid';
import BusinessMap from '../components/BusinessMap';
import ExportActions, { exportSingleBusinessPDF } from '../components/ExportActions';
import PaginationScroll from '../components/PaginationScroll';
import EmptyState from '../components/EmptyState';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';

// Dashboard & UI imports shifted from App.jsx
import Dashboard from '../components/Dashboard';
import Drawer from '../components/ui/Drawer';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import FavoriteButton from '../components/ui/FavoriteButton';
import { useFavorites } from '../context/FavoritesContext';
import { Star, MapPin, Phone, Globe, Navigation, ExternalLink } from 'lucide-react';

export default function SearchPage({
  activeTab,
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  mapCenter,
  setMapCenter,
  mapZoom,
  setMapZoom,
  userCoords,
  setUserCoords,
  showRoute,
  setShowRoute,
  routeCoords,
  routeDuration,
  routeDistance,
  selectedPlace,
  setSelectedPlace,
  filteredPlaces = [],
  paginatedPlaces = [],
  isSearchingRemote,
  isGridView,
  setIsGridView,
  visibleCount,
  hasMorePlaces,
  isLoadingMore,
  activeThemeIdx,
  setActiveThemeIdx,
  handlePlaceSelect,
  handleAreaSelect,
  handleResetFilters,
  handleLoadMore,
  MAP_THEMES,
  onLocateUser,
  onRecenter,
  onZoomIn,
  onZoomOut
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  
  // Drawer state moved from App.jsx
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerBusiness, setDrawerBusiness] = useState(null);

  const handleViewDetails = (place) => {
    setDrawerBusiness(place);
    setIsDrawerOpen(true);
  };

  const handleCalculatePedestrianPath = () => {
    if (!userCoords) {
      onLocateUser && onLocateUser();
    }
    setShowRoute(true);
    setIsDrawerOpen(false);
    if (drawerBusiness) {
      setSelectedPlace(drawerBusiness);
      setMapCenter(drawerBusiness.coordinates);
      setMapZoom(16);
    }
  };

  // If the active tab is Dashboard, render the Dashboard view directly!
  if (activeTab === 'Dashboard') {
    return (
      <div className="w-full pb-16">
        <Dashboard places={filteredPlaces} />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col lg:flex-row flex-grow min-h-[calc(100vh-68px)] overflow-hidden animate-[fadeIn_0.2s_ease-out]">
      
      {/* SIDEBAR PANEL */}
      <div className="w-full lg:w-[420px] bg-white border-r border-brand-border/40 shadow-lg flex flex-col shrink-0 z-10 p-6 overflow-y-auto space-y-5">
        
        <div className="pb-4 border-b border-slate-100 flex justify-between items-center select-none">
          <div className="space-y-1">
            <h2 className="text-sm font-black text-slate-800 leading-none uppercase tracking-wider">
              {activeTab === 'Favourites' ? 'Saved Favourites' : 'Waypoint Explorer'}
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              {filteredPlaces.length} locations found {isSearchingRemote && '(Searching...)'}
            </p>
          </div>
          
          <button
            onClick={() => setIsGridView(!isGridView)}
            className="px-4 py-2 border border-brand-border/40 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer active:scale-95"
          >
            {isGridView ? 'List View' : 'Grid View'}
          </button>
        </div>
        
        {/* SearchBar inside Sidebar */}
        {activeTab !== 'Favourites' && (
          <div className="w-full space-y-4">
            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
            />
            <LocationSearch onAreaSelect={handleAreaSelect} />
          </div>
        )}

        {/* Advanced filter toggler block */}
        {activeTab !== 'Favourites' && (
          <SearchFilters
            filters={filters}
            onChange={setFilters}
            onReset={handleResetFilters}
          />
        )}

        {/* Export Panel */}
        {filteredPlaces.length > 0 && (
          <ExportActions
            places={filteredPlaces}
            title={activeTab === 'Favourites' ? 'Saved Favourites Export' : 'Filtered Waypoints Export'}
          />
        )}

        {/* Render either List, Grid, Skeleton, or EmptyState */}
        {isSearchingRemote ? (
          <LoadingSkeleton variant={isGridView ? 'card' : 'list-item'} count={3} />
        ) : paginatedPlaces.length > 0 ? (
          <div className="space-y-4">
            {isGridView ? (
              <BusinessGrid 
                places={paginatedPlaces}
                selectedPlace={selectedPlace}
                onSelect={handlePlaceSelect}
                onViewDetails={handleViewDetails}
                onExportSingle={exportSingleBusinessPDF}
                userCoords={userCoords}
              />
            ) : (
              <BusinessList 
                places={paginatedPlaces}
                selectedPlace={selectedPlace}
                onSelect={handlePlaceSelect}
                onViewDetails={handleViewDetails}
                onExportSingle={exportSingleBusinessPDF}
                userCoords={userCoords}
              />
            )}

            <PaginationScroll 
              hasMore={hasMorePlaces}
              onLoadMore={handleLoadMore}
              loading={isLoadingMore}
            />
          </div>
        ) : (
          <EmptyState 
            message="No waypoints matched your current search parameters." 
            onReset={handleResetFilters} 
          />
        )}

        {/* Pedestrian routing quick metrics banner */}
        {selectedPlace && showRoute && routeDuration !== null && routeDistance !== null && (
          <div className="p-4 bg-brand-accent/30 border border-brand-border/30 rounded-2.5xl flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-black text-slate-755">
              <span>Directions to {selectedPlace.name}</span>
              <button 
                onClick={() => setShowRoute(false)}
                className="px-2.5 py-1 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors text-[10px] cursor-pointer"
              >
                Hide Route
              </button>
            </div>
            <div className="p-3 bg-white rounded-xl border border-brand-border/30 text-xs font-bold text-slate-700 mt-1 space-y-1 select-none">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Distance:</span>
                <span className="text-slate-850">{routeDistance} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Travel Duration:</span>
                <span className="text-slate-850">{routeDuration} mins (Walking)</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* MAP VIEW CONTAINER (encapsulated BusinessMap) */}
      <div className="flex-grow h-[450px] lg:h-auto relative z-0">
        <BusinessMap
          center={mapCenter}
          zoom={mapZoom}
          isGeofenceEnabled={filters.isGeofenceEnabled}
          userCoords={userCoords}
          geofenceRadius={filters.geofenceRadius}
          showRoute={showRoute}
          routeCoords={routeCoords}
          selectedPlace={selectedPlace}
          filteredPlaces={filteredPlaces}
          onMapClick={(latlng) => {
            setUserCoords(latlng);
            setShowRoute(true);
          }}
          onPlaceSelect={handlePlaceSelect}
          themes={MAP_THEMES}
          activeThemeIdx={activeThemeIdx}
          setActiveThemeIdx={setActiveThemeIdx}
          onLocateUser={onLocateUser}
          onRecenter={onRecenter}
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
        />
      </div>

      {/* Drawer for Business Details inside SearchPage */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Business Details"
        size="md"
      >
        {drawerBusiness && (
          <div className="space-y-6 select-none text-left">
            {/* Header Image */}
            <div className="h-48 w-full rounded-2xl overflow-hidden border border-slate-100 relative">
              <img 
                src={drawerBusiness.image || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=400&q=80'} 
                alt={drawerBusiness.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute right-3.5 top-3.5">
                <FavoriteButton 
                  isFav={isFavorite(drawerBusiness.id)} 
                  onClick={() => toggleFavorite(drawerBusiness.id)} 
                />
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                <Badge variant="info">{drawerBusiness.category}</Badge>
                {drawerBusiness.businessStatus === 'Closed' ? (
                  <Badge variant="danger">Closed</Badge>
                ) : (
                  <Badge variant="success">Active</Badge>
                )}
                <span className="text-[10px] font-black text-slate-400">
                  {'$'.repeat(drawerBusiness.priceLevel || 1)}
                </span>
              </div>
              <h3 className="text-base font-black text-slate-850 leading-tight">{drawerBusiness.name}</h3>
              
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-650">
                <span className="flex items-center gap-0.5 text-slate-700 bg-brand-accent/50 px-2 py-0.5 rounded-lg leading-none">
                  <Star className="w-3.5 h-3.5 fill-brand-steel stroke-brand-steel" />
                  {drawerBusiness.rating}
                </span>
                <span>({drawerBusiness.reviews} reviews)</span>
              </div>
            </div>

            {/* Description details */}
            <div className="space-y-2 pt-4 border-t border-slate-100">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-450">Description</span>
              <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                {drawerBusiness.description || 'No detailed description available.'}
              </p>
            </div>

            {/* Location & Contact */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-450">Contact & Address</span>
              
              <div className="flex items-start gap-2.5 text-xs font-semibold text-slate-600">
                <MapPin className="w-4 h-4 text-brand-steel shrink-0 mt-0.5" />
                <span>{drawerBusiness.address}</span>
              </div>

              {drawerBusiness.phone && (
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-600">
                  <Phone className="w-4 h-4 text-brand-steel shrink-0" />
                  <span>{drawerBusiness.phone}</span>
                </div>
              )}

              {drawerBusiness.hours && (
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-600">
                  <span className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[7px] font-black text-slate-500 uppercase shrink-0">H</span>
                  <span>Hours: {drawerBusiness.hours}</span>
                </div>
              )}
            </div>

            {/* Direct Navigation Path calculator & site visitor */}
            <div className="flex flex-col gap-2.5 pt-5 border-t border-slate-100">
              <Button
                onClick={handleCalculatePedestrianPath}
                variant="primary"
                className="w-full flex items-center justify-center gap-2"
              >
                <Navigation className="w-4.5 h-4.5 text-white" />
                <span>Calculate Pedestrian Route</span>
              </Button>

              <div className="flex gap-2.5">
                {drawerBusiness.website ? (
                  <a
                    href={drawerBusiness.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-grow py-3 rounded-xl border border-brand-border/40 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-800 text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 active:scale-97"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Visit Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <button
                    disabled
                    className="flex-grow py-3 rounded-xl border border-brand-border/20 bg-slate-55 text-slate-300 text-xs font-bold text-center flex items-center justify-center gap-1.5 cursor-not-allowed"
                  >
                    <Globe className="w-4 h-4" />
                    <span>No Website</span>
                  </button>
                )}

                <Button
                  onClick={() => exportSingleBusinessPDF(drawerBusiness)}
                  variant="outline"
                  className="px-4 py-3 rounded-xl text-slate-700"
                >
                  Export PDF
                </Button>
              </div>
            </div>

            {/* Detailed reviews list */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-450 block">Verified User Reviews</span>
              {drawerBusiness.reviewsList && drawerBusiness.reviewsList.length > 0 ? (
                <div className="space-y-3">
                  {drawerBusiness.reviewsList.map((review, rIdx) => (
                    <div key={rIdx} className="p-3 bg-slate-55 border border-slate-100 rounded-2xl flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <img src={review.avatar} alt={review.name} className="w-6.5 h-6.5 rounded-full object-cover" />
                          <span className="text-[11px] font-black text-slate-700">{review.name}</span>
                        </div>
                        <span className="text-[9px] font-bold text-slate-400">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {Array.from({ length: review.rating }).map((_, sIdx) => (
                          <Star key={sIdx} className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
                        ))}
                        {Array.from({ length: 5 - review.rating }).map((_, sIdx) => (
                          <Star key={sIdx} className="w-3.5 h-3.5 text-slate-200" />
                        ))}
                      </div>
                      <p className="text-[10px] text-slate-550 font-semibold leading-relaxed">
                        {review.text}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-[10px] text-slate-400 font-bold block pt-1">
                  No verified user review comments yet.
                </span>
              )}
            </div>

          </div>
        )}
      </Drawer>
    </div>
  );
}
