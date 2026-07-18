import React from "react";

const baseClasses = `
w-full

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
`;

const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-5 py-4 text-lg",
};

const Select = ({
    label,
    options = [],
    value,
    onChange,
    size = "md",
    error,
    disabled = false,
}) => {

    const selectClasses = `
        ${baseClasses}
        ${sizes[size]}
        ${
            error
                ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20"
                : ""
        }
    `;

    return (
        <div className="w-full">

            {label && (
                <label className="block mb-2 text-sm font-medium text-[#0F172A]">
                    {label}
                </label>
            )}

            <select
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={selectClasses}
            >
                <option value="">
                    Select {label}
                </option>

                {options.map((option, index) => (
                    <option
                        key={index}
                        value={option}
                    >
                        {option}
                    </option>
                ))}

            </select>

            {error && (
                <p className="mt-2 text-sm text-[#EF4444]">
                    {error}
                </p>
            )}

        </div>
    );
};

export default Select;