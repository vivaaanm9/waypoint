import React from 'react';
import { Compass, Shield, Map, Layers } from 'lucide-react';

export default function FeatureHighlights() {
  const features = [
    {
      title: 'Geocoded Search',
      desc: 'Pinpoint locations by city, state, country, or pincode using real-time OpenStreetMap reverse geocoding.',
      icon: Map
    },
    {
      title: 'Fencing & Radius',
      desc: 'Set proximity geofences from 200m to 10km to filter verified waypoints inside your immediate walking scope.',
      icon: Compass
    },
    {
      title: 'Pedestrian Routing',
      desc: 'Instantly calculate travel times and plot visual routes from your custom coordinates to any verified merchant.',
      icon: Layers
    },
    {
      title: 'Analytics & Export',
      desc: 'Monitor city density with visual Recharts and download datasets as PDF, Excel spreadsheets, or CSV tables.',
      icon: Shield
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 select-none px-2 animate-[fadeIn_0.2s_ease-out]">
      <div className="text-center sm:text-left">
        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
          Platform Architecture
        </span>
        <h3 className="text-lg font-black text-slate-800 tracking-tight mt-1">
          Engineered for absolute navigation.
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
        {features.map((feat, i) => {
          const Icon = feat.icon;
          return (
            <div 
              key={i} 
              className="p-5 bg-white border border-brand-border/30 rounded-2.5xl flex flex-col items-start gap-4 hover:border-brand-steel/50 hover:shadow-xs transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-accent/40 flex items-center justify-center text-slate-700 shrink-0">
                <Icon className="w-5 h-5 text-brand-steel" />
              </div>
              <div className="space-y-1 text-left">
                <h5 className="text-xs font-black uppercase tracking-wider text-slate-850">
                  {feat.title}
                </h5>
                <p className="text-[10px] text-slate-450 font-semibold leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
