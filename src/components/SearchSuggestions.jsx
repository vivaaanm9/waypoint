import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { MOCK_PLACES } from '../data/places';

export default function SearchSuggestions({ query, onSelect }) {
  const suggestions = query.trim() === ''
    ? [
        { name: 'Times Square', isRecent: true },
        { name: 'Brew Lab Cafe', isRecent: true },
        { name: 'Summit View Deck', isRecent: true }
      ]
    : MOCK_PLACES.filter(place => {
        const queryTerms = query.toLowerCase().split(/\s+/).filter(Boolean);
        return queryTerms.every(term =>
          place.name.toLowerCase().includes(term) ||
          place.category.toLowerCase().includes(term)
        );
      }).slice(0, 5).map(place => ({ name: place.name, isRecent: false }));

  if (suggestions.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-brand-border/40 shadow-xl overflow-hidden z-50 animate-[fadeIn_0.2s_ease-out]">
      <div className="p-2 border-b border-brand-border/20 bg-slate-50/50 px-4">
        <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">
          {query.trim() === '' ? 'Recent Searches' : 'Suggested Results'}
        </span>
      </div>
      <div className="py-1">
        {suggestions.map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelect(item.name)}
            className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 group transition-colors cursor-pointer"
          >
            {item.isRecent ? (
              <Clock className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-steel transition-colors" />
            ) : (
              <MapPin className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-steel transition-colors" />
            )}
            <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900">
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
