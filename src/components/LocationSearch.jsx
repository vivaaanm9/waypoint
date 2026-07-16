import React, { useState } from 'react';
import { Globe, Search, Navigation, Loader2 } from 'lucide-react';

export default function LocationSearch({ onAreaSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);

    fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(query)}&addressdetails=1`, {
      headers: {
        'Accept-Language': 'en'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const parsed = data.map(item => {
            const parts = item.display_name.split(',');
            const label = parts.slice(0, 3).join(', ');
            return {
              label: label,
              coords: [parseFloat(item.lat), parseFloat(item.lon)],
              fullName: item.display_name
            };
          });
          setResults(parsed);
        } else {
          setResults([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Geocoding location search failed", err);
        setResults([]);
        setLoading(false);
      });
  };

  return (
    <div className="bg-white border border-brand-border/40 rounded-2.5xl p-5 shadow-xs space-y-4">
      <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100">
        <Globe className="w-5 h-5 text-brand-steel" />
        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-700">Geographical Filter</h3>
      </div>
      
      <form onSubmit={handleSearch} className="flex gap-2.5">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Country, State, City, or Pincode..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-3.5 pr-9 py-3 bg-slate-50 border border-brand-border/40 rounded-xl text-xs font-bold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-brand-steel transition-colors"
          />
          {loading && (
            <Loader2 className="absolute right-3 top-3.5 w-3.5 h-3.5 text-brand-steel animate-spin" />
          )}
        </div>
        <button
          type="submit"
          className="px-4.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl flex items-center justify-center cursor-pointer transition-colors"
        >
          <Search className="w-4 h-4" />
        </button>
      </form>

      {results.length > 0 && (
        <div className="space-y-1.5 max-h-40 overflow-y-auto pt-1">
          <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">Search Results</label>
          <div className="flex flex-col gap-1.5">
            {results.map((res, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  if (onAreaSelect) {
                    onAreaSelect(res.coords, res.fullName);
                  }
                  setResults([]);
                  setQuery('');
                }}
                className="w-full p-3.5 bg-slate-50 hover:bg-brand-accent/50 border border-brand-border/30 hover:border-brand-steel/50 rounded-xl font-bold text-slate-600 hover:text-slate-800 text-xs text-left transition-all duration-200 cursor-pointer flex items-center gap-2"
              >
                <Navigation className="w-4 h-4 text-brand-steel rotate-45 shrink-0" />
                <span className="truncate">{res.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Preset popular coordinates */}
      <div className="space-y-1.5 pt-1">
        <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">Popular Regions</label>
        <div className="grid grid-cols-2 gap-2.5 text-xs">
          {[
            { label: 'Times Square', coords: [40.7580, -73.9855] },
            { label: 'Central Park', coords: [40.7644, -73.9730] }
          ].map(area => (
            <button
              key={area.label}
              type="button"
              onClick={() => onAreaSelect && onAreaSelect(area.coords, area.label)}
              className="p-3.5 bg-slate-50 hover:bg-brand-accent border border-brand-border/30 hover:border-brand-steel/50 rounded-xl font-bold text-slate-600 hover:text-slate-800 text-left transition-all duration-200 cursor-pointer flex items-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5 text-brand-steel rotate-45" />
              <span>{area.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
