import React from 'react';

export default function Select({
  label,
  options = [],
  value,
  onChange,
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
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className={`w-full appearance-none px-4 py-3 bg-slate-50/50 border border-brand-border/40 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:bg-white focus:border-brand-steel transition-all duration-200 cursor-pointer ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
          <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
}
