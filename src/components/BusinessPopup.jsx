import React from 'react';
import { Popup } from 'react-leaflet';
import { Star } from 'lucide-react';

export default function BusinessPopup({ business }) {
  return (
    <Popup>
      <div className="p-1 space-y-2 max-w-[190px] select-none text-left flex flex-col">
        {business.image && (
          <div className="w-full h-24 rounded-lg overflow-hidden border border-slate-100 mb-0.5">
            <img 
              src={business.image} 
              alt={business.name} 
              className="w-full h-full object-cover" 
            />
          </div>
        )}
        <div className="space-y-1">
          <span className="inline-block px-1.5 py-0.5 rounded text-[8px] font-extrabold uppercase bg-brand-accent text-slate-700 tracking-wider leading-none">
            {business.category}
          </span>
          <h5 className="font-extrabold text-xs text-slate-800 leading-tight m-0 mt-0.5">{business.name}</h5>
          <p className="text-[10px] text-slate-400 leading-relaxed m-0 truncate">{business.address}</p>
          <div className="flex items-center gap-1.5 pt-1 border-t border-slate-100 mt-1">
            <span className="flex items-center gap-0.5 text-[9px] font-black text-slate-700 bg-brand-accent/50 px-1.5 py-0.5 rounded-md leading-none">
              <Star className="w-2.5 h-2.5 fill-brand-steel stroke-brand-steel" />
              {business.rating}
            </span>
            <span className="text-[9px] text-slate-400 font-bold">({business.reviews} reviews)</span>
          </div>
        </div>
      </div>
    </Popup>
  );
}
