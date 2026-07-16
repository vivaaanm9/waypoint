import React from "react";

const Slider = ({
    label,
    min = 0,
    max = 100,
    value,
    onChange,
}) => {

    return (

        <div className="w-full">

            {label && (
                <div className="flex justify-between mb-2">

                    <label className="font-medium text-[#0F172A]">
                        {label}
                    </label>

                    <span className="text-[#64748B]">
                        {value}
                    </span>

                </div>
            )}

            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={onChange}
                className="
                    w-full
                    accent-[#4F46E5]
                    cursor-pointer
                "
            />

        </div>

    );

};

export default Slider;