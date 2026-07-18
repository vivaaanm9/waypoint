import React from "react";

const variants = {
    primary: "bg-[#4F46E5] text-white",
    secondary: "bg-[#06B6D4] text-white",
    success: "bg-[#10B981] text-white",
    danger: "bg-[#EF4444] text-white",
    warning: "bg-[#F59E0B] text-white",
    outline: "border border-[#4F46E5] text-[#4F46E5]",
};

const Badge = ({
    children,
    variant = "primary",
}) => {

    const badgeClasses = `
        inline-flex
        items-center
        justify-center

        px-3
        py-1

        rounded-full

        text-xs
        font-semibold

        ${variants[variant]}
    `;

    return (
        <span className={badgeClasses}>
            {children}
        </span>
    );

};

export default Badge;