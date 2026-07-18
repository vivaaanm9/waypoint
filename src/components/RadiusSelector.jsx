import React from 'react';
import { Sliders, HelpCircle } from 'lucide-react';

export default function RadiusSelector({ 
  isEnabled, 
  setIsEnabled, 
  radius, 
  setRadius 
}) {
  return (
    <div className="bg-white border border-brand-border/40 rounded-2.5xl p-5 shadow-xs space-y-4">
      <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
        <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest flex items-center gap-1.5">
          <Sliders className="w-4.5 h-4.5 text-brand-steel" />
          <span>Geofence Selection</span>
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            checked={isEnabled} 
            onChange={() => setIsEnabled(!isEnabled)} 
            className="sr-only peer" 
          />
          <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-steel"></div>
        </label>
      </div>

      {isEnabled ? (
        <div className="space-y-3.5 animate-[fadeIn_0.2s_ease-out]">
          <div className="flex justify-between text-xs font-bold text-slate-500">
            <span>Radius Range Limit</span>
            <span className="text-brand-steel">{(radius / 1000).toFixed(1)} km</span>
          </div>
          <input 
            type="range" 
            min="500" 
            max="2500" 
            step="100"
            value={radius} 
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-steel" 
          />
          <div className="flex justify-between text-[8px] font-bold text-slate-400">
            <span>500m</span>
            <span>1500m</span>
            <span>2500m</span>
          </div>
        </div>
      ) : (
        <div className="py-2.5 text-center text-xs text-slate-400 font-semibold flex items-center justify-center gap-1.5 bg-slate-50 rounded-xl border border-dashed border-brand-border/30">
          <HelpCircle className="w-4 h-4 text-slate-300" />
          <span>Geofencing radius filters inactive</span>
        </div>
      )}
    </div>
  );
}
