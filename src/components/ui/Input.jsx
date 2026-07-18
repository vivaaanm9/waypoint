import React from 'react';

const baseClasses = `
w-full
rounded-xl
border
border-[#E2E8F0]
bg-white
text-[#0F172A]
placeholder:text-[#64748B]
outline-none
transition-all
duration-300
focus:border-[#4F46E5]
focus:ring-2
focus:ring-[#4F46E5]/20
disabled:bg-gray-100
disabled:cursor-not-allowed
disabled:opacity-60
`;

const sizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3 text-base",
  lg: "px-5 py-4 text-lg",
};

export default function Input({
  label,
  error,
  type = 'text',
  size = 'md',
  leftIcon,
  className = '',
  ...props
}) {
  const inputClasses = `
    ${baseClasses}
    ${sizes[size] || sizes.md}
    ${leftIcon ? "pl-10" : ""}
    ${
      error
        ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20 border-rose-350 focus:border-rose-500"
        : ""
    }
    ${className}
  `;

  return (
    <div className="flex flex-col space-y-1.5 w-full select-none">
      {label && (
        <label className="text-sm font-medium text-[#0F172A] pl-0.5">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          className={inputClasses}
          {...props}
        />
      </div>
      {error && (
        <span className="text-xs text-[#EF4444] pl-1 animate-[fadeIn_0.15s_ease-out]">
          {error}
        </span>
      )}
    </div>
  );
}
