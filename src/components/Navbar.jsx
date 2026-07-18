import React from 'react';
import { MapPin, Compass, Heart, Sun, User, BarChart } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="w-full bg-white border-b border-brand-border/40 py-6 px-8 sm:px-16 sticky top-0 z-50 shadow-sm transition-all duration-300">
      <div className="w-full flex items-center justify-between">
        
        {/* Brand logo */}
        <div 
          onClick={() => setActiveTab('Home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-steel to-brand-border flex items-center justify-center shadow-xs">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg text-slate-800 tracking-tight leading-none group-hover:text-brand-steel transition-colors">
              Waypoint
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5">
              City Navigator
            </span>
          </div>
        </div>

        {/* Navigation links */}
        <div className="flex items-center gap-2 sm:gap-3">
          {[
            { name: 'Home', icon: Compass },
            { name: 'Search Map', icon: MapPin },
            { name: 'Favourites', icon: Heart },
            { name: 'Dashboard', icon: BarChart }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`flex items-center gap-2 px-4.5 py-3 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'bg-brand-accent text-slate-800 shadow-xs' 
                    : 'text-slate-505 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Control Actions - Theme toggle and profile */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => alert("Theme mode is aligned to your blue/gray aesthetic.")}
            className="p-3.5 text-slate-455 hover:text-slate-650 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
          >
            <Sun className="w-5.5 h-5.5" />
          </button>
          <div className="w-11 h-11 rounded-xl bg-brand-accent flex items-center justify-center text-slate-650 border border-brand-border/30 select-none">
            <User className="w-5 h-5" />
          </div>
        </div>

      </div>
    </nav>
  );
}
