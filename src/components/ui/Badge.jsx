import React from 'react';

export default function Badge({
  children,
  variant = 'primary',
  className = '',
  ...props
}) {
  const isLocalVariant = ['info', 'neutral'].includes(variant) || 
    (variant === 'success' && className.includes('emerald')) || 
    (variant === 'warning' && className.includes('amber')) || 
    (variant === 'danger' && className.includes('rose'));

  // Local variant styles
  const baseStyle = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider select-none leading-none';
  
  const localVariants = {
    info: 'bg-brand-accent text-slate-800 border border-brand-border/20',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    warning: 'bg-amber-50 text-amber-700 border border-amber-100',
    danger: 'bg-rose-50 text-rose-700 border border-rose-100',
    neutral: 'bg-slate-100 text-slate-600 border border-slate-200'
  };

  // Remote variant styles
  const remoteBaseStyle = 'inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold';
  
  const remoteVariants = {
    primary: "bg-[#4F46E5] text-white",
    secondary: "bg-[#06B6D4] text-white",
    success: "bg-[#10B981] text-white",
    danger: "bg-[#EF4444] text-white",
    warning: "bg-[#F59E0B] text-white",
    outline: "border border-[#4F46E5] text-[#4F46E5]",
    info: 'bg-brand-accent text-slate-800 border border-brand-border/20',
    neutral: 'bg-slate-100 text-slate-600 border border-slate-200'
  };

  const finalClass = isLocalVariant 
    ? `${baseStyle} ${localVariants[variant] || localVariants.info} ${className}`
    : `${remoteBaseStyle} ${remoteVariants[variant] || remoteVariants.primary} ${className}`;

  return (
    <span className={finalClass} {...props}>
      {children}
    </span>
  );
}
