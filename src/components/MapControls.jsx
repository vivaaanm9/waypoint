import React from 'react';
import { Compass, Layers } from 'lucide-react';

export default function MapControls({ 
  onZoomIn, 
  onZoomOut, 
  onRecenter, 
  onLocateUser,
  themes, 
  activeThemeIdx, 
  setActiveThemeIdx 
}) {
  return (
    <div className="absolute inset-x-0 bottom-4 px-4 flex flex-col sm:flex-row justify-between items-end gap-4 pointer-events-none z-[999]">
      
      {/* 1. LAYER SELECTOR OVERLAY */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-brand-border/40 p-2.5 flex items-center gap-2 select-none pointer-events-auto">
        <div className="w-7.5 h-7.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700">
          <Layers className="w-4 h-4 text-brand-steel" />
        </div>
        <div className="flex flex-col">
          <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest leading-none">Map Layer Style</span>
          <div className="flex gap-1.5 mt-1">
            {themes.map((theme, idx) => (
              <button
                key={idx}
                onClick={() => setActiveThemeIdx(idx)}
                className={`px-2 py-0.5 rounded-md text-[9px] font-bold border transition-all duration-200 cursor-pointer ${
                  activeThemeIdx === idx 
                    ? 'border-brand-steel bg-brand-steel text-white shadow-xs' 
                    : 'border-slate-200 hover:bg-slate-50 text-slate-500 bg-white'
                }`}
              >
                {theme.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION ACTIONS */}
      <div className="flex items-center gap-2 pointer-events-auto">
        
        {/* Recenter button */}
        <button
          onClick={onRecenter}
          className="w-10 h-10 bg-white shadow-lg border border-brand-border/30 rounded-xl flex items-center justify-center text-slate-700 hover:text-brand-steel transition-colors active:scale-95 cursor-pointer"
        >
          <Compass className="w-5 h-5" />
        </button>

        {/* Locate Me button */}
        <button
          onClick={onLocateUser}
          className="px-3.5 h-10 bg-slate-800 hover:bg-brand-steel text-white rounded-xl text-xs font-bold tracking-wide uppercase transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>Locate Me</span>
        </button>

        {/* Zoom controls */}
        <div className="bg-white rounded-xl shadow-lg border border-brand-border/30 flex overflow-hidden">
          <button 
            onClick={onZoomIn}
            className="w-10 h-10 flex items-center justify-center font-bold text-lg text-slate-600 hover:bg-slate-50 border-r border-slate-100 cursor-pointer"
          >
            +
          </button>
          <button 
            onClick={onZoomOut}
            className="w-10 h-10 flex items-center justify-center font-bold text-lg text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            -
          </button>
        </div>

      </div>

    </div>
  );
}
