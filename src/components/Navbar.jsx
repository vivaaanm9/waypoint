import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Compass, Heart, Sun, User, BarChart, ChevronDown, Download, Eye, Sparkles, Map } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const primaryTabs = [
    { name: 'Home', icon: Compass },
    { name: 'Search Map', icon: MapPin },
    { name: 'Favourites', icon: Heart },
    { name: 'Dashboard', icon: BarChart }
  ];

  const teamTabs = [
    { name: 'Discovery', icon: Compass, label: 'Discovery Map (Vivaan)' },
    { name: 'Collections', icon: Heart, label: 'Collections & Notes (Vivaan)' },
    { name: 'Dashboard (Charts)', icon: BarChart, label: 'Visual Analytics (Vivaan)' },
    { name: 'Export Center', icon: Download, label: 'Export Center (Payal)' },
    { name: 'UI Showcase', icon: Eye, label: 'Component Library (Vivaan)' }
  ];

  const handleTeamTabClick = (tabName) => {
    setActiveTab(tabName);
    setDropdownOpen(false);
  };

  const isTeamTabActive = teamTabs.some(tab => tab.name === activeTab);

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
          {primaryTabs.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`flex items-center gap-2 px-4.5 py-3 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'bg-brand-accent text-slate-800 shadow-xs' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.name}</span>
              </button>
            );
          })}

          {/* Team features dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-2 px-4.5 py-3 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 cursor-pointer ${
                isTeamTabActive 
                  ? 'bg-indigo-50 text-indigo-600 shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
              <span className="hidden sm:inline">Team Tools</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-50 animate-[fadeIn_0.15s_ease-out]">
                <div className="px-4.5 py-2 text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-50 select-none">
                  Team Features
                </div>
                {teamTabs.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleTeamTabClick(item.name)}
                      className={`w-full flex items-center gap-3 px-4.5 py-3 text-left text-xs font-bold transition-all duration-200 ${
                        isActive 
                          ? 'bg-indigo-50 text-indigo-600' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
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
