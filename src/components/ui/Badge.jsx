import React from 'react';

export default function Badge({
  children,
  variant = 'info',
  className = '',
  ...props
}) {
  const baseStyle = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider select-none leading-none';
  
  const variants = {
    info: 'bg-brand-accent text-slate-800 border border-brand-border/20',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    warning: 'bg-amber-50 text-amber-700 border border-amber-100',
    danger: 'bg-rose-50 text-rose-700 border border-rose-100',
    neutral: 'bg-slate-100 text-slate-600 border border-slate-200'
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}
