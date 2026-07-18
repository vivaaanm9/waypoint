import React from 'react';

const baseClasses = `
inline-flex
items-center
justify-center
gap-2
font-medium
transition-all
duration-300
hover:-translate-y-0.5
hover:shadow-lg
active:scale-95
focus:outline-none
focus:ring-2
focus:ring-[#4F46E5]/30
disabled:opacity-50
disabled:cursor-not-allowed
disabled:hover:translate-y-0
disabled:hover:shadow-none
disabled:active:scale-100
`;

const localBaseStyle = 'inline-flex items-center justify-center font-bold transition-all duration-200 cursor-pointer active:scale-98 select-none';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  isLoading = false, // Local
  loading = false,   // Remote
  leftIcon,          // Remote
  rightIcon,         // Remote
  fullWidth = false, // Remote
  rounded = false,   // Remote
  className = '',
  onClick,
  ...props
}) {
  const showSpinner = isLoading || loading;

  const isRemoteCall = leftIcon || rightIcon || fullWidth || rounded || loading || type !== 'button' || variant === 'success';

  // Local size classes
  const localSizes = {
    sm: 'px-3.5 py-2 rounded-xl text-xs',
    md: 'px-5 py-3 rounded-xl text-xs sm:text-sm',
    lg: 'px-7 py-4.5 rounded-2xl text-sm'
  };

  // Remote size classes
  const remoteSizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-3 text-base',
    lg: 'px-7 py-4 text-lg',
  };

  // Local variant styles
  const localVariants = {
    primary: 'bg-slate-800 hover:bg-slate-900 text-white shadow-sm disabled:bg-slate-350 disabled:cursor-not-allowed disabled:scale-100',
    secondary: 'bg-brand-accent hover:bg-brand-accent/80 text-slate-800 border border-brand-border/40 disabled:bg-slate-100 disabled:cursor-not-allowed',
    outline: 'bg-white hover:bg-slate-50 text-slate-700 border border-brand-border/60 disabled:bg-slate-50 disabled:text-slate-300',
    danger: 'bg-rose-500 hover:bg-rose-600 text-white shadow-sm',
    ghost: 'hover:bg-slate-50 text-slate-650 hover:text-slate-800'
  };

  // Remote variant styles
  const remoteVariants = {
    primary: "bg-[#4F46E5] hover:bg-[#4338CA] text-white",
    secondary: "bg-[#06B6D4] hover:bg-[#0891B2] text-white",
    success: "bg-[#10B981] hover:bg-[#059669] text-white",
    danger: "bg-[#EF4444] hover:bg-[#DC2626] text-white",
    outline: "border border-[#4F46E5] text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white",
    ghost: "bg-transparent text-[#4F46E5] hover:bg-[#EEF2FF]",
  };

  // Resolve which base styles and colors to apply
  let finalClasses = '';
  
  if (isRemoteCall) {
    const selectedVariant = remoteVariants[variant] || remoteVariants.primary;
    const selectedSize = remoteSizes[size] || remoteSizes.md;
    finalClasses = `
      ${baseClasses}
      ${selectedVariant}
      ${selectedSize}
      ${fullWidth ? 'w-full' : ''}
      ${rounded ? 'rounded-full' : 'rounded-xl'}
      ${className}
    `;
  } else {
    const selectedVariant = localVariants[variant] || localVariants.primary;
    const selectedSize = localSizes[size] || localSizes.md;
    finalClasses = `
      ${localBaseStyle}
      ${selectedVariant}
      ${selectedSize}
      ${className}
    `;
  }

  return (
    <button
      type={type}
      disabled={disabled || showSpinner}
      onClick={onClick}
      className={finalClasses}
      {...props}
    >
      {showSpinner ? (
        <>
          <svg
            className="w-4 h-4 animate-spin shrink-0"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              opacity="0.25"
            />
            <path
              d="M22 12A10 10 0 0012 2"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          {isRemoteCall && <span>Loading...</span>}
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}
