import React from 'react';

export default function Input({
  label,
  error,
  type = 'text',
  className = '',
  ...props
}) {
  return (
    <div className="flex flex-col space-y-1.5 w-full select-none">
      {label && (
        <label className="text-[10px] font-extrabold text-slate-450 uppercase tracking-widest leading-none pl-0.5">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full px-4 py-3 bg-slate-50/50 border rounded-xl text-xs font-bold text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:shadow-xs transition-all duration-200 ${
          error 
            ? 'border-rose-350 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20' 
            : 'border-brand-border/40 focus:border-brand-steel focus:ring-1 focus:ring-brand-steel/15'
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="text-[9px] text-rose-500 font-bold pl-1 animate-[fadeIn_0.15s_ease-out]">
          {error}
        </span>
      )}
    </div>
  );
}
