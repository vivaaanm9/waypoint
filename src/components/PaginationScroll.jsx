import React from 'react';
import { ChevronDown, RefreshCw } from 'lucide-react';

export default function PaginationScroll({ 
  hasMore = false, 
  onLoadMore, 
  loading = false 
}) {
  if (!hasMore) return null;

  return (
    <div className="w-full flex justify-center py-4 border-t border-slate-100 mt-4 select-none">
      <button
        onClick={onLoadMore}
        disabled={loading}
        className="flex items-center gap-2 px-7 py-3.5 bg-slate-50 hover:bg-brand-accent/50 border border-brand-border/40 rounded-xl text-xs font-black uppercase tracking-wider text-slate-700 transition-colors cursor-pointer hover:border-brand-steel disabled:opacity-50 active:scale-97"
      >
        {loading ? (
          <RefreshCw className="w-4 h-4 animate-spin text-brand-steel" />
        ) : (
          <ChevronDown className="w-4 h-4 text-brand-steel" />
        )}
        <span>Load More Locations</span>
      </button>
    </div>
  );
}
