import React from 'react';

const baseClasses = `
w-full
appearance-none
rounded-xl
border
border-[#E2E8F0]
bg-white
text-[#0F172A]
outline-none
transition-all
duration-300
focus:border-[#4F46E5]
focus:ring-2
focus:ring-[#4F46E5]/20
disabled:bg-gray-100
disabled:cursor-not-allowed
disabled:opacity-60
cursor-pointer
`;

const sizes = {
  sm: "px-3 py-2 text-sm pr-9",
  md: "px-4 py-3 text-base pr-10",
  lg: "px-5 py-4 text-lg pr-12",
};

export default function Select({
  label,
  options = [],
  value,
  onChange,
  size = 'md',
  error,
  disabled = false,
  className = '',
  ...props
}) {
  const selectClasses = `
    ${baseClasses}
    ${sizes[size] || sizes.md}
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
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={selectClasses}
          {...props}
        >
          <option value="">
            {label ? `Select ${label}` : 'Select option'}
          </option>

          {options.map((opt, index) => {
            if (typeof opt === 'object' && opt !== null) {
              const val = opt.value !== undefined ? opt.value : opt.id;
              const lbl = opt.label !== undefined ? opt.label : opt.name;
              return (
                <option key={val !== undefined ? val : index} value={val}>
                  {lbl}
                </option>
              );
            }
            return (
              <option key={index} value={opt}>
                {opt}
              </option>
            );
          })}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
          <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-sm text-[#EF4444] pl-1 animate-[fadeIn_0.15s_ease-out]">
          {error}
        </p>
      )}
    </div>
  );
}
