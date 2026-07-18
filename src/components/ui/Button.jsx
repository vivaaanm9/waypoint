import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  isLoading = false,
  ...props
}) {
  const baseStyle = 'inline-flex items-center justify-center font-bold transition-all duration-200 cursor-pointer active:scale-98 select-none';
  
  const variants = {
    primary: 'bg-slate-800 hover:bg-slate-900 text-white shadow-sm disabled:bg-slate-350 disabled:cursor-not-allowed disabled:scale-100',
    secondary: 'bg-brand-accent hover:bg-brand-accent/80 text-slate-800 border border-brand-border/40 disabled:bg-slate-100 disabled:cursor-not-allowed',
    outline: 'bg-white hover:bg-slate-50 text-slate-700 border border-brand-border/60 disabled:bg-slate-50 disabled:text-slate-300',
    danger: 'bg-rose-500 hover:bg-rose-600 text-white shadow-sm',
    ghost: 'hover:bg-slate-50 text-slate-650 hover:text-slate-800'
  };

  const sizes = {
    sm: 'px-3.5 py-2 rounded-xl text-xs',
    md: 'px-5 py-3 rounded-xl text-xs sm:text-sm',
    lg: 'px-7 py-4.5 rounded-2xl text-sm'
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
}
