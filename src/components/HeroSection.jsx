import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Heart } from 'lucide-react';
import SearchBar from './SearchBar';

export default function HeroSection({ 
  searchTerm, 
  setSearchTerm, 
  activeTab, 
  setActiveTab 
}) {
  return (
    <div className="w-full flex-grow min-h-[calc(100vh-160px)] bg-brand-bg flex flex-col items-center justify-center relative overflow-hidden px-6 py-16 sm:py-24">
      
      {/* Background Grid Map Overlay with mask image fade out */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-[0.08] pointer-events-none select-none z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80')`,
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)'
        }}
      />

      {/* Accent Background Halo Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-brand-accent/40 rounded-full blur-[100px] pointer-events-none z-0 animate-pulse" />

      {/* Smooth bottom blend overlay */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-bg to-transparent pointer-events-none z-[1]" />

      {/* Main Container */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center space-y-7 pointer-events-auto"
      >
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest bg-brand-accent text-slate-700 border border-brand-border/40 shadow-xs">
          Platform Latency: 0.02ms
        </span>

        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-800 tracking-tight leading-[1.12]">
            Navigate your city <br />
            with <span className="bg-gradient-to-r from-brand-steel to-[#BCCCDC] bg-clip-text text-transparent">absolute clarity.</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-450 max-w-md mx-auto font-bold leading-relaxed">
            Search nearby cafes, workspaces, gyms, and local businesses. Map custom waypoints and solve driving paths instantly.
          </p>
        </div>

        {/* Component 4 & 5: SearchBar and suggestions autocomplete */}
        <div className="w-full max-w-lg mt-2">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} setActiveTab={setActiveTab} />
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4 pt-3">
          <button
            onClick={() => setActiveTab('Search Map')}
            className="px-8 py-4.5 bg-slate-800 hover:bg-brand-steel text-white text-sm font-black tracking-widest uppercase rounded-2xl transition-all duration-300 active:scale-95 shadow-md shadow-slate-900/10 cursor-pointer flex items-center gap-2"
          >
            <Compass className="w-4.5 h-4.5" />
            <span>Search Map</span>
          </button>
          
          <button
            onClick={() => setActiveTab('Favourites')}
            className="px-8 py-4.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-black tracking-widest uppercase rounded-2xl border border-brand-border/50 transition-all duration-300 active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <Heart className="w-4.5 h-4.5 text-brand-steel" />
            <span>Browse Favourites</span>
          </button>
        </div>

        {/* Statistics Metric Counters */}
        <div className="grid grid-cols-3 gap-6 border-t border-brand-border/30 pt-6 mt-1 w-full text-center">
          <div className="space-y-0.5">
            <span className="text-xl sm:text-2xl font-black text-slate-800 tabular-nums">15,840+</span>
            <span className="text-[8px] font-extrabold uppercase tracking-wider text-brand-steel block">Waypoints</span>
          </div>
          <div className="space-y-0.5">
            <span className="text-xl sm:text-2xl font-black text-slate-800 tabular-nums">100%</span>
            <span className="text-[8px] font-extrabold uppercase tracking-wider text-brand-steel block">Accuracy</span>
          </div>
          <div className="space-y-0.5">
            <span className="text-xl sm:text-2xl font-black text-slate-800 tabular-nums">4,820+</span>
            <span className="text-[8px] font-extrabold uppercase tracking-wider text-brand-steel block">Verified</span>
          </div>
        </div>

      </motion.div>
      
    </div>
  );
}