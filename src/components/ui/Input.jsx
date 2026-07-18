import React from "react";

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

const Input = ({
    type = "text",
    label,
    placeholder = "",
    value,
    onChange,
    size = "md",
    error,
    disabled = false,
    leftIcon,
}) => {

    const inputClasses = `
        ${baseClasses}
        ${sizes[size]}
        ${leftIcon ? "pl-10" : ""}
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

            <div className="relative">

                {leftIcon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]">
                        {leftIcon}
                    </div>
                )}

                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={inputClasses}
                />

            </div>

            {error && (
                <p className="mt-2 text-sm text-[#EF4444]">
                    {error}
                </p>
            )}

        </div>
    );
};

export default Input;