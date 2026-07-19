import React from 'react';
import { useWaypointContext } from '../../../context/WaypointContext';
import { FilterChip } from './FilterChip';
import { SlidersHorizontal, Star, Clock } from 'lucide-react';

export const FilterSidebar = () => {
  const { filters, setFilters, clearFilters } = useWaypointContext();

  const activeFiltersCount = Object.values(filters).filter((val) => val !== null && val !== false).length;

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-6 p-6 bg-white/20 border border-[#BCCCDC]/40 rounded-3xl backdrop-blur-xl shadow-[0_8px_32px_rgba(188,204,220,0.2)]">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <SlidersHorizontal size={20} className="text-[#9AA6B2]" />
          Filters
        </h2>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm font-medium text-[#9AA6B2] hover:text-gray-700 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Active Filters Summary */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 pb-4 border-b border-[#BCCCDC]/30">
          {filters.category && <FilterChip filterKey="category" label="Category" value={filters.category} />}
          {filters.priceLevel && <FilterChip filterKey="priceLevel" label="Price" value={'$'.repeat(filters.priceLevel)} />}
          {filters.ratingMin && <FilterChip filterKey="ratingMin" label="Rating" value={`${filters.ratingMin}+`} />}
          {filters.openNow && <FilterChip filterKey="openNow" label="Status" value="Open Now" />}
        </div>
      )}

      {/* Categories */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-[#9AA6B2] uppercase tracking-wider">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {['Restaurant', 'Cafe', 'Hospital', 'Clinic', 'Retail Store', 'Gym', 'Workspace', 'Service'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilters((prev) => ({ ...prev, category: prev.category === cat ? null : cat }))}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border ${
                filters.category === cat
                  ? 'bg-[#D9EAFD] border-[#D9EAFD] text-gray-800 shadow-md -translate-y-0.5'
                  : 'bg-white/40 border-[#BCCCDC]/40 text-[#9AA6B2] hover:bg-white/60 hover:-translate-y-0.5 hover:shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Ratings */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-[#9AA6B2] uppercase tracking-wider">Minimum Rating</h3>
        <div className="flex flex-col gap-2">
          {[4, 3, 2].map((rating) => (
            <button
              key={rating}
              onClick={() => setFilters((prev) => ({ ...prev, ratingMin: prev.ratingMin === rating ? null : rating }))}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border ${
                filters.ratingMin === rating
                  ? 'bg-[#D9EAFD] border-[#D9EAFD] text-gray-800 shadow-md'
                  : 'bg-white/40 border-[#BCCCDC]/40 text-[#9AA6B2] hover:bg-white/60'
              }`}
            >
              <div className="flex items-center gap-1 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < rating ? 'currentColor' : 'none'}
                    className={i >= rating ? 'text-[#BCCCDC]' : ''}
                  />
                ))}
              </div>
              <span className="ml-auto">& Up</span>
            </button>
          ))}
        </div>
      </div>

      {/* Open Now Toggle */}
      <div className="flex items-center justify-between pt-4 border-t border-[#BCCCDC]/30">
        <div className="flex items-center gap-2 text-gray-800 font-medium">
          <Clock size={18} className="text-[#9AA6B2]" />
          Open Now
        </div>
        <button
          onClick={() => setFilters((prev) => ({ ...prev, openNow: !prev.openNow }))}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
            filters.openNow ? 'bg-[#D9EAFD]' : 'bg-[#BCCCDC]/40'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              filters.openNow ? 'translate-x-6' : 'translate-x-1'
            } shadow-sm`}
          />
        </button>
      </div>

      {/* Advanced Features */}
      <div className="space-y-4 pt-4 border-t border-[#BCCCDC]/30">
        <h3 className="text-sm font-semibold text-[#9AA6B2] uppercase tracking-wider">Features & Amenities</h3>
        {[
          { key: 'wifi', label: 'Free WiFi' },
          { key: 'parking', label: 'Free Parking' },
          { key: 'wheelchair', label: 'Wheelchair Access' },
          { key: 'ac', label: 'Air Conditioning (AC)' },
          { key: 'verified', label: 'Verified Listing' }
        ].map((feat) => (
          <div key={feat.key} className="flex items-center justify-between">
            <span className="text-xs text-gray-700 font-medium">{feat.label}</span>
            <button
              onClick={() => setFilters((prev) => ({ ...prev, [feat.key]: !prev[feat.key] }))}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                filters[feat.key] ? 'bg-blue-600' : 'bg-[#BCCCDC]/40'
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                  filters[feat.key] ? 'translate-x-4.5' : 'translate-x-1'
                } shadow-sm`}
              />
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};
