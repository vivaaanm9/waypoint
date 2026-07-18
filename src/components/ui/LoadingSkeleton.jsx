import React from 'react';

export default function LoadingSkeleton({
  variant,
  count = 1,
  className = '',
  width = "w-full",
  height = "h-4",
  rounded = "rounded-lg",
  ...props
}) {
  const items = Array.from({ length: count });

  if (variant === 'list-item') {
    return (
      <div className={`space-y-3.5 ${className}`}>
        {items.map((_, i) => (
          <div key={i} className="p-4 bg-white border border-brand-border/20 rounded-2.5xl flex gap-3.5 animate-pulse">
            <div className="w-18 h-18 bg-slate-100 rounded-xl shrink-0" />
            <div className="flex-grow space-y-2 mt-1">
              <div className="h-2.5 w-16 bg-slate-100 rounded" />
              <div className="h-3 w-40 bg-slate-100 rounded" />
              <div className="h-2.5 w-32 bg-slate-100 rounded" />
              <div className="h-3 w-20 bg-slate-100 rounded-lg mt-1" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={`space-y-2.5 ${className}`}>
        {items.map((_, i) => (
          <div key={i} className="h-3 bg-slate-100 rounded-lg animate-pulse w-full" />
        ))}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4.5 ${className}`}>
        {items.map((_, i) => (
          <div key={i} className="p-4 bg-white border border-brand-border/20 rounded-2.5xl flex flex-col gap-3.5 animate-pulse">
            <div className="h-36 w-full bg-slate-100 rounded-2xl" />
            <div className="space-y-2.5 pb-1">
              <div className="h-2.5 w-16 bg-slate-100 rounded" />
              <div className="h-3.5 w-3/4 bg-slate-100 rounded" />
              <div className="h-2.5 w-5/6 bg-slate-100 rounded" />
              <div className="h-3.5 w-24 bg-slate-100 rounded-lg mt-2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Remote default single-block skeleton if no local variant matches
  return (
    <div
      className={`
        ${width}
        ${height}
        ${rounded}
        bg-gray-200
        animate-pulse
        ${className}
      `}
      {...props}
    />
  );
}
