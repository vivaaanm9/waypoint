import React from "react";

const Checkbox = ({
    label,
    checked,
    onChange,
    disabled = false,
}) => {
    return (
        <label className="inline-flex items-center gap-3 cursor-pointer">

            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className="
                    h-5
                    w-5
                    rounded
                    border-[#E2E8F0]
                    text-[#4F46E5]
                    accent-[#4F46E5]
                    cursor-pointer
                "
            />

            {label && (
                <span className="text-[#0F172A]">
                    {label}
                </span>
            )}

        </label>
    );
};

export default Checkbox;