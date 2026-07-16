import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { MOCK_PLACES } from '../data/places';

export default function FeaturedBusinesses({ onSelect }) {
  const featured = MOCK_PLACES.filter(place => place.rating >= 4.7);

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center px-2">
        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Featured waypoints</span>
        <span className="text-[9px] text-brand-steel font-bold bg-brand-accent px-2 py-0.5 rounded-md flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Fully Verified</span>
        </span>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-thin max-w-full">
        {featured.map((place) => (
          <div
            key={place.id}
            onClick={() => onSelect && onSelect(place)}
            className="w-64 bg-white border border-brand-border/30 hover:border-brand-steel/50 rounded-2.5xl p-3 flex flex-col shrink-0 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group animate-[fadeIn_0.2s_ease-out]"
          >
            <div className="h-32 w-full rounded-2xl overflow-hidden border border-slate-100">
              <img 
                src={place.image} 
                alt={place.name} 
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300" 
              />
            </div>
            <div className="pt-2.5 space-y-1">
              <span className="text-[8px] font-extrabold uppercase text-slate-400 bg-brand-bg px-1.5 py-0.5 rounded">
                {place.category}
              </span>
              <h4 className="text-xs font-bold text-slate-700 truncate group-hover:text-brand-steel transition-colors pt-0.5">
                {place.name}
              </h4>
              <p className="text-[9px] text-slate-400 truncate leading-none">
                {place.address}
              </p>
              
              <div className="flex items-center gap-1.5 pt-1.5 text-[9px] font-bold">
                <span className="flex items-center gap-0.5 text-slate-700 bg-brand-accent/50 px-2 py-0.5 rounded-lg">
                  <Star className="w-3 h-3 fill-brand-steel stroke-brand-steel" />
                  {place.rating}
                </span>
                <span className="text-slate-400">{place.reviews} reviews</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
