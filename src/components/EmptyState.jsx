import React from 'react';
import { HelpCircle, RefreshCcw } from 'lucide-react';

export default function EmptyState({ message, onReset }) {
  return (
    <div className="w-full py-12 px-6 flex flex-col items-center justify-center text-center space-y-4 bg-slate-50/50 rounded-3xl border border-dashed border-brand-border/40 select-none animate-[fadeIn_0.2s_ease-out]">
      <div className="w-12 h-12 rounded-full bg-white shadow-xs border border-brand-border/30 flex items-center justify-center text-slate-400">
        <HelpCircle className="w-6 h-6 text-brand-steel" />
      </div>
      <div className="space-y-1">
        <h4 className="text-sm font-black uppercase tracking-wider text-slate-800">No waypoints matched</h4>
        <p className="text-xs text-slate-400 font-semibold max-w-sm">
          {message || 'Try widening your radius selection or resetting coordinates filters.'}
        </p>
      </div>
      {onReset && (
        <button
          onClick={onReset}
          className="px-4 py-2 bg-[#9AA6B2] hover:bg-[#8A95A1] text-white text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1.5 shadow-xs"
        >
          <RefreshCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      )}
    </div>
  );
}
