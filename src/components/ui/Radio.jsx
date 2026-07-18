import React from "react";

const Radio = ({
    label,
    value,
    checked,
    onChange,
    disabled = false,
}) => {

    return (
        <label className="flex items-center gap-3 cursor-pointer">

            <input
                type="radio"
                value={value}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className="
                    h-5
                    w-5
                    accent-[#4F46E5]
                    cursor-pointer
                "
            />

            <span className="text-[#0F172A]">
                {label}
            </span>

        </label>
    );

};

export default Radio;