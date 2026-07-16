import React from 'react';
import { Star, Heart } from 'lucide-react';

export default function BusinessList({ 
  places, 
  selectedPlace, 
  onSelect, 
  favourites = [], 
  onToggleFavourite 
}) {
  return (
    <div className="space-y-3">
      {places.map((place) => {
        const isSelected = selectedPlace && selectedPlace.id === place.id;
        const isFav = favourites.includes(place.id);
        
        return (
          <div
            key={place.id}
            onClick={() => onSelect && onSelect(place)}
            className={`p-4 rounded-2.5xl border transition-all duration-300 cursor-pointer group flex gap-3 relative overflow-hidden animate-[fadeIn_0.2s_ease-out] ${
              isSelected 
                ? 'border-brand-steel bg-brand-accent/20' 
                : 'bg-white border-brand-border/30 hover:border-brand-steel/50 shadow-xs'
            }`}
          >
            <div className="w-18 h-18 rounded-xl overflow-hidden shrink-0 border border-slate-100">
              <img src={place.image} alt={place.name} className="w-full h-full object-cover group-hover:scale-103 transition-all" />
            </div>
            
            <div className="flex-grow min-w-0 pr-4">
              <span className="text-[8px] font-extrabold uppercase text-slate-400 bg-brand-bg px-1.5 py-0.5 rounded">
                {place.category}
              </span>
              <h4 className="text-xs font-bold text-slate-700 mt-1 truncate group-hover:text-brand-steel transition-colors">
                {place.name}
              </h4>
              <p className="text-[9px] text-slate-400 mt-0.5 truncate">
                {place.address}
              </p>
              
              <div className="flex items-center gap-2 mt-2 text-[9px] font-bold">
                <span className="flex items-center gap-0.5 text-slate-700 bg-brand-accent/50 px-2 py-0.5 rounded-lg">
                  <Star className="w-3 h-3 fill-brand-steel stroke-brand-steel" />
                  {place.rating}
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-400">{place.reviews} reviews</span>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavourite && onToggleFavourite(place.id);
              }}
              className="absolute right-3.5 top-3.5 p-1 text-slate-350 hover:text-rose-500 transition-colors cursor-pointer"
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 stroke-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
