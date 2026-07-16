import React from "react";

const baseClasses = `
inline-flex
items-center
justify-center
gap-2

font-medium
rounded-xl

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

const variants = {
    primary:
        "bg-[#4F46E5] hover:bg-[#4338CA] text-white",

    secondary:
        "bg-[#06B6D4] hover:bg-[#0891B2] text-white",

    success:
        "bg-[#10B981] hover:bg-[#059669] text-white",

    danger:
        "bg-[#EF4444] hover:bg-[#DC2626] text-white",

    outline:
        "border border-[#4F46E5] text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white",

    ghost:
        "bg-transparent text-[#4F46E5] hover:bg-[#EEF2FF]",
};

const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-3 text-base",
    lg: "px-7 py-4 text-lg",
};

const Button = ({
    children,
    variant = "primary",
    size = "md",
    type = "button",
    disabled = false,
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    rounded = false,
    className = "",
    onClick,
}) => {

    const buttonClasses = `
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${rounded ? "rounded-full" : ""}
        ${className}
    `;

    return (
        <button
            type={type}
            className={buttonClasses}
            disabled={disabled || loading}
            onClick={onClick}
        >
            {loading ? (
                <>
                    <svg
                        className="w-5 h-5 animate-spin"
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

                    Loading...
                </>
            ) : (
                <>
                    {leftIcon && leftIcon}

                    {children}

                    {rightIcon && rightIcon}
                </>
            )}
        </button>
    );
};

export default Button;