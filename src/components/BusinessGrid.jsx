import React from 'react';
import { Star, Heart } from 'lucide-react';

export default function BusinessGrid({
  places,
  selectedPlace,
  onSelect,
  favourites = [],
  onToggleFavourite
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {places.map((place) => {
        const isSelected = selectedPlace && selectedPlace.id === place.id;
        const isFav = favourites.includes(place.id);

        return (
          <div
            key={place.id}
            onClick={() => onSelect && onSelect(place)}
            className={`p-4 bg-white rounded-2.5xl border transition-all duration-300 cursor-pointer group flex flex-col gap-3 relative overflow-hidden animate-[fadeIn_0.2s_ease-out] ${isSelected
              ? 'border-brand-steel bg-brand-accent/20 ring-1 ring-brand-steel/30'
              : 'border-brand-border/30 hover:border-brand-steel/50 shadow-xs'
              }`}
          >
            <div className="h-36 w-full rounded-2xl overflow-hidden border border-slate-100 relative">
              <img src={place.image} alt={place.name} className="w-full h-full object-cover group-hover:scale-103 transition-all" />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavourite && onToggleFavourite(place.id);
                }}
                className="absolute right-3.5 top-3.5 w-8 h-8 rounded-lg bg-white/95 backdrop-blur-xs flex items-center justify-center text-slate-350 hover:text-rose-500 shadow-xs transition-colors cursor-pointer"
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 stroke-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            <div className="flex-grow space-y-1 select-none">
              <span className="text-[8px] font-extrabold uppercase text-slate-450 bg-brand-bg px-1.5 py-0.5 rounded inline-block">
                {place.category}
              </span>
              <h4 className="text-xs font-bold text-slate-700 truncate group-hover:text-brand-steel transition-colors pt-0.5">
                {place.name}
              </h4>
              <p className="text-[9px] text-slate-450 truncate">
                {place.address}
              </p>

              <div className="flex items-center gap-1.5 pt-2 text-[9px] font-bold">
                <span className="flex items-center gap-0.5 text-slate-700 bg-brand-accent/50 px-2 py-0.5 rounded-lg">
                  <Star className="w-3 h-3 fill-brand-steel stroke-brand-steel" />
                  {place.rating}
                </span>
                <span className="text-slate-400">{place.reviews} reviews</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
