import React from 'react';
import { Star, Filter, RotateCcw, Compass, Globe, Info } from 'lucide-react';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';
import Badge from './ui/Badge';
import Tooltip from './ui/Tooltip';

export default function SearchFilters({
  filters,
  onChange,
  onReset
}) {
  const categories = ['All', 'Cafes', 'Workspaces', 'Health', 'Tourist', 'Gyms', 'Restaurants', 'Hotels'];
  
  const handleFilterChange = (key, value) => {
    onChange && onChange({ ...filters, [key]: value });
  };

  const starRatings = [0, 3, 4, 4.5];
  const reviewCounts = [
    { label: 'Any Reviews', value: 0 },
    { label: '10+ Reviews', value: 10 },
    { label: '50+ Reviews', value: 50 },
    { label: '100+ Reviews', value: 100 },
    { label: '500+ Reviews', value: 500 }
  ];

  const priceLevels = [
    { label: 'Any Price', value: 'All' },
    { label: '$', value: 1 },
    { label: '$$', value: 2 },
    { label: '$$$', value: 3 },
    { label: '$$$$', value: 4 }
  ];

  return (
    <div className="bg-white border border-brand-border/30 rounded-2.5xl p-5 shadow-xs space-y-6 select-none animate-[fadeIn_0.2s_ease-out]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4.5 h-4.5 text-slate-800" />
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-850">Advanced Filters</h3>
        </div>
        {onReset && (
          <Button
            onClick={onReset}
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-slate-400 hover:text-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </Button>
        )}
      </div>

      {/* Geographical Filter Inputs */}
      <div className="space-y-3">
        <span className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase text-slate-450 tracking-wider">
          <Globe className="w-3.5 h-3.5" />
          <span>Geographical Scope</span>
        </span>
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Country"
            placeholder="e.g. United States"
            value={filters.country || ''}
            onChange={(e) => handleFilterChange('country', e.target.value)}
          />
          <Input
            label="State"
            placeholder="e.g. NY"
            value={filters.state || ''}
            onChange={(e) => handleFilterChange('state', e.target.value)}
          />
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          <div className="col-span-2">
            <Input
              label="City / Locality"
              placeholder="e.g. Manhattan"
              value={filters.city || ''}
              onChange={(e) => handleFilterChange('city', e.target.value)}
            />
          </div>
          <div>
            <Input
              label="Pincode"
              placeholder="10036"
              value={filters.pincode || ''}
              onChange={(e) => handleFilterChange('pincode', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Category Select Buttons */}
      <div className="space-y-2">
        <span className="text-[9px] font-extrabold uppercase text-slate-450 tracking-wider block">
          Business Category
        </span>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isSelected = (filters.category || 'All') === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleFilterChange('category', cat)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-150 active:scale-95 cursor-pointer border ${
                  isSelected
                    ? 'bg-slate-800 text-white border-slate-800 shadow-sm'
                    : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100 hover:border-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Selectors */}
      <div className="grid grid-cols-2 gap-4">
        {/* Minimum Rating */}
        <div className="space-y-1.5">
          <span className="text-[9px] font-extrabold uppercase text-slate-450 tracking-wider block">
            Minimum Rating
          </span>
          <div className="flex gap-1.5 items-center">
            {starRatings.map((rating) => {
              const isSelected = (filters.minRating || 0) === rating;
              return (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleFilterChange('minRating', rating)}
                  className={`flex-grow py-2 rounded-xl text-[10px] font-black flex items-center justify-center gap-1 transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800 border-slate-800 text-white shadow-xs'
                      : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {rating === 0 ? (
                    'All'
                  ) : (
                    <>
                      <span>{rating}</span>
                      <Star className={`w-3 h-3 ${isSelected ? 'fill-white stroke-white' : 'fill-slate-400 stroke-slate-400'}`} />
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Review Count Dropdown */}
        <Select
          label="Review Count Limit"
          value={filters.minReviews || 0}
          onChange={(e) => handleFilterChange('minReviews', parseInt(e.target.value))}
          options={reviewCounts}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Price Level Option Group */}
        <div className="space-y-1.5">
          <span className="text-[9px] font-extrabold uppercase text-slate-450 tracking-wider block">
            Price Level
          </span>
          <div className="flex gap-1 border border-brand-border/40 rounded-xl p-1 bg-slate-50/50">
            {priceLevels.map((lvl) => {
              const isSelected = (filters.priceLevel || 'All') === lvl.value;
              return (
                <button
                  key={lvl.label}
                  type="button"
                  onClick={() => handleFilterChange('priceLevel', lvl.value)}
                  className={`flex-grow py-1.5 rounded-lg text-[9px] font-black transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border border-brand-border/40 text-slate-800 shadow-xs'
                      : 'text-slate-450 hover:text-slate-700'
                  }`}
                >
                  {lvl.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Business Operational Status */}
        <Select
          label="Business Status"
          value={filters.businessStatus || 'All'}
          onChange={(e) => handleFilterChange('businessStatus', e.target.value)}
          options={[
            { label: 'All Operations', value: 'All' },
            { label: 'Active / Open', value: 'Active' },
            { label: 'Closed / Inactive', value: 'Closed' }
          ]}
        />
      </div>

      {/* Geofencing Slider Section */}
      <div className="space-y-3.5 pt-1">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase text-slate-450 tracking-wider">
            <Compass className="w-3.5 h-3.5 animate-spin-globe" />
            <span>Proximity Radius Geofence</span>
          </span>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="geofence-toggle"
              checked={filters.isGeofenceEnabled || false}
              onChange={(e) => handleFilterChange('isGeofenceEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <label
              htmlFor="geofence-toggle"
              className="relative w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-slate-800 cursor-pointer"
            />
          </div>
        </div>

        {filters.isGeofenceEnabled && (
          <div className="space-y-2.5 p-3.5 bg-slate-50/50 rounded-2xl border border-brand-border/20 animate-[fadeIn_0.2s_ease-out]">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-600">
              <span>Fencing Range Limit:</span>
              <span className="text-slate-800">
                {filters.geofenceRadius >= 1000 
                  ? `${(filters.geofenceRadius / 1000).toFixed(1)} km` 
                  : `${filters.geofenceRadius} m`}
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="10000"
              step="200"
              value={filters.geofenceRadius || 1200}
              onChange={(e) => handleFilterChange('geofenceRadius', parseInt(e.target.value))}
              className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
            />
            <div className="flex justify-between text-[8px] font-bold text-slate-400">
              <span>200m</span>
              <span>10km</span>
            </div>
          </div>
        )}
      </div>

      {/* Binary Switch Flags (Open Now & Website) */}
      <div className="grid grid-cols-2 gap-4 pt-1">
        {/* Open Now Toggle */}
        <label className="flex items-center justify-between p-3 bg-slate-50/50 border border-brand-border/25 rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors">
          <div className="flex flex-col select-none pr-1">
            <span className="text-[10px] font-black text-slate-700 leading-none">Open Now</span>
            <span className="text-[8px] font-semibold text-slate-400 mt-1">Currently operating</span>
          </div>
          <input
            type="checkbox"
            checked={filters.openNowOnly || false}
            onChange={(e) => handleFilterChange('openNowOnly', e.target.checked)}
            className="w-4 h-4 rounded border-brand-border text-slate-800 focus:ring-slate-500 cursor-pointer"
          />
        </label>

        {/* Website Availability Toggle */}
        <label className="flex items-center justify-between p-3 bg-slate-50/50 border border-brand-border/25 rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors">
          <div className="flex flex-col select-none pr-1">
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-black text-slate-700 leading-none">Has Website</span>
              <Tooltip text="Show verified websites only">
                <Info className="w-3 h-3 text-slate-400" />
              </Tooltip>
            </div>
            <span className="text-[8px] font-semibold text-slate-400 mt-1">Show web URLs only</span>
          </div>
          <input
            type="checkbox"
            checked={filters.hasWebsiteOnly || false}
            onChange={(e) => handleFilterChange('hasWebsiteOnly', e.target.checked)}
            className="w-4 h-4 rounded border-brand-border text-slate-800 focus:ring-slate-500 cursor-pointer"
          />
        </label>
      </div>
    </div>
  );
}
