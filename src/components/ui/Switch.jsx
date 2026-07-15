import React from "react";

const Switch = ({
    checked,
    onChange,
    disabled = false,
    label,
}) => {

    return (
        <label className="inline-flex items-center gap-3 cursor-pointer">

            {label && (
                <span className="text-[#0F172A] font-medium">
                    {label}
                </span>
            )}

            <button
                type="button"
                disabled={disabled}
                onClick={() => onChange(!checked)}
                className={`
                    relative
                    w-12
                    h-7
                    rounded-full
                    transition-all
                    duration-300

                    ${
                        checked
                            ? "bg-[#4F46E5]"
                            : "bg-gray-300"
                    }

                    ${
                        disabled
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                    }
                `}
            >

                <span
                    className={`
                        absolute
                        top-1
                        left-1

                        h-5
                        w-5

                        rounded-full
                        bg-white

                        transition-all
                        duration-300

                        ${
                            checked
                                ? "translate-x-5"
                                : ""
                        }
                    `}
                />

            </button>

        </label>
    );

};

export default Switch;