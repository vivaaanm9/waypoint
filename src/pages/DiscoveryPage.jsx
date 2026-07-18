import React, { useState, useEffect } from 'react';
import { useWaypointContext } from '../context/WaypointContext';
import { BusinessCard } from '../components/features/business-info/BusinessCard';
import { BusinessMap } from '../components/features/business-info/BusinessMap';
import { Search, Map as MapIcon, LayoutGrid, Loader2 } from 'lucide-react';
import { searchLocation, fetchBusinessesAround } from '../services/api';
import { FilterSidebar } from '../components/features/filters/FilterSidebar';
import { SortDropdown } from '../components/features/filters/SortDropdown';

export const DiscoveryPage = () => {
  const { filters, sortBy, setActiveBusinessId, businesses, setBusinesses, isLoading, setIsLoading, searchLocation: currentLoc, setSearchLocation } = useWaypointContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'map'
  const [hasSearched, setHasSearched] = useState(false);

  // Removed initial load search so results are empty until the user searches

  const handleSearch = async (query = searchQuery) => {
    if (!query) return;
    setIsLoading(true);
    setHasSearched(true);

    let parsedKeyword = '';
    let parsedLocation = query;

    const inAtNearMatch = query.match(/(.+)\s+(in|at|near)\s+(.+)/i);
    const commaMatch = query.includes(',') ? query.split(',') : null;

    if (inAtNearMatch) {
      parsedKeyword = inAtNearMatch[1].trim();
      parsedLocation = inAtNearMatch[3].trim();
    } else if (commaMatch && commaMatch.length >= 2) {
      parsedKeyword = commaMatch[0].trim();
      parsedLocation = commaMatch.slice(1).join(',').trim();
    }
    
    // 1. Geocode location
    const locationInfo = await searchLocation(parsedLocation);
    
    if (locationInfo) {
      setSearchLocation({ lat: locationInfo.lat, lng: locationInfo.lng, name: locationInfo.displayName });
      
      // 2. Fetch businesses
      let liveData = await fetchBusinessesAround(locationInfo.lat, locationInfo.lng);

      if (parsedKeyword) {
        const filtered = liveData.filter(b => 
          b.name.toLowerCase().includes(parsedKeyword.toLowerCase()) ||
          b.category.toLowerCase().includes(parsedKeyword.toLowerCase())
        );
        if (filtered.length > 0) {
          liveData = filtered;
        }
      }
      
      setBusinesses(liveData);
    } else {
      // Fallback: Try geocoding the entire query directly
      const fallbackInfo = await searchLocation(query);
      if (fallbackInfo) {
        setSearchLocation({ lat: fallbackInfo.lat, lng: fallbackInfo.lng, name: fallbackInfo.displayName });
        const liveData = await fetchBusinessesAround(fallbackInfo.lat, fallbackInfo.lng);
        setBusinesses(liveData);
      } else {
        setBusinesses([]);
      }
    }
    
    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Apply filters and sorting to LIVE data
  const filteredBusinesses = businesses.filter((b) => {
    if (filters.category && b.category !== filters.category) return false;
    if (filters.ratingMin && b.rating < filters.ratingMin) return false;
    if (filters.openNow && !b.isOpen) return false;
    if (filters.priceLevel && b.priceLevel !== filters.priceLevel) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'highest_rated') return b.rating - a.rating;
    if (sortBy === 'most_reviewed') return b.reviewCount - a.reviewCount;
    return 0;
  });

  return (
    <div className="min-h-screen p-6 lg:p-8 flex flex-col lg:flex-row gap-8 max-w-[1600px] mx-auto">
      <FilterSidebar />
      
      <main className="flex-1 flex flex-col gap-8 min-w-0">
        {/* Top Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Explore Local Businesses</h1>
            <p className="text-[#9AA6B2] mt-1">Discover the best spots tailored to your preferences.</p>
          </div>
          
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-96 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA6B2]" size={18} />
                <input 
                  type="text" 
                  placeholder="Search a city, area, or pincode..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/40 border border-[#BCCCDC]/40 rounded-xl backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-[#D9EAFD] transition-all shadow-sm text-gray-800 placeholder-[#9AA6B2]"
                />
              </div>
              <button 
                onClick={() => handleSearch()}
                disabled={isLoading}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50"
              >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : 'Search'}
              </button>
            </div>
            {currentLoc && <p className="text-sm text-gray-500 flex items-center gap-1"><MapIcon size={14}/> Showing results around: <span className="font-semibold text-gray-700">{currentLoc.name.split(',')[0]}</span></p>}
            <SortDropdown />
          </div>
        </div>

        {/* Business List or Map */}
        <div className="flex-1 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Results <span className="text-[#9AA6B2] text-lg font-medium">({filteredBusinesses.length})</span></h2>
            
            {/* View Toggle */}
            <div className="flex items-center bg-white/40 p-1 rounded-lg border border-[#BCCCDC]/40 backdrop-blur-md">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md flex items-center justify-center transition-all ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                title="Grid View"
              >
                <LayoutGrid size={18} />
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-md flex items-center justify-center transition-all ${viewMode === 'map' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                title="Map View"
              >
                <MapIcon size={18} />
              </button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
              <Loader2 size={48} className="animate-spin text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Searching OpenStreetMap...</h3>
              <p className="text-[#9AA6B2] mt-2">Fetching live businesses around {searchQuery || 'your area'}</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-8">
              {filteredBusinesses.map((business) => (
                <BusinessCard 
                  key={business.id} 
                  {...business} 
                  onClick={(id) => setActiveBusinessId(id)} 
                />
              ))}
              {filteredBusinesses.length === 0 && (
                <div className="col-span-full py-16 text-center bg-white/30 rounded-3xl border border-[#BCCCDC]/30 backdrop-blur-md">
                  <Search size={48} className="mx-auto text-[#9AA6B2] mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {hasSearched ? "No businesses found" : "Ready to Explore"}
                  </h3>
                  <p className="text-[#9AA6B2] mt-2 max-w-md mx-auto">
                    {hasSearched 
                      ? "Try adjusting your filters or search for a different area." 
                      : "Type a city, area, or pincode into the search bar above to discover businesses."}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 min-h-[600px] w-full rounded-3xl overflow-hidden shadow-sm">
              <BusinessMap businesses={filteredBusinesses} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
