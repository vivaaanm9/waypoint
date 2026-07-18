import React from 'react';
import { Coffee, Briefcase, Activity, Compass, ListFilter } from 'lucide-react';

export default function CategoryCards({ selectedCategory, setSelectedCategory }) {
  const categories = [
    { name: 'All', icon: ListFilter, desc: 'All coordinates' },
    { name: 'Cafes', icon: Coffee, desc: 'Bakeries & bars' },
    { name: 'Workspaces', icon: Briefcase, desc: 'Shared offices' },
    { name: 'Health', icon: Activity, desc: 'Medical clinics' },
    { name: 'Tourist', icon: Compass, desc: 'Scenic sights' }
  ];

  return (
    <div className="w-full space-y-4">
      <div className="text-center max-w-sm mx-auto">
        <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest leading-none">Filter by category</h4>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-5xl mx-auto w-full">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory && setSelectedCategory(cat.name)}
              className={`p-4 rounded-2xl border text-left flex flex-col items-start gap-3 transition-all duration-300 active:scale-95 cursor-pointer group ${
                isActive 
                  ? 'border-brand-steel bg-brand-steel text-white shadow-md' 
                  : 'border-brand-border/40 hover:border-brand-steel/50 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-colors ${
                isActive 
                  ? 'bg-white/20 border-white/20 text-white' 
                  : 'bg-slate-50 border-slate-100 text-slate-600 group-hover:scale-105 transition-transform'
              }`}>
                <Icon className="w-4.5 h-4.5" />
              </div>
              <div>
                <h5 className="text-xs font-black uppercase tracking-wider leading-none">{cat.name}</h5>
                <p className={`text-[9px] mt-1 font-semibold ${isActive ? 'text-white/70' : 'text-slate-400'}`}>
                  {cat.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
