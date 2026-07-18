import React from "react";

const Tooltip = ({
    children,
    text,
    position = "top",
}) => {

    const positions = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
    };

    return (
        <div className="relative inline-flex group">

            {children}

            <span
                className={`
                    absolute
                    ${positions[position]}

                    whitespace-nowrap

                    bg-[#0F172A]
                    text-white

                    text-xs

                    px-3
                    py-2

                    rounded-lg

                    opacity-0
                    invisible

                    transition-all
                    duration-300

                    group-hover:opacity-100
                    group-hover:visible
                `}
            >
                {text}
            </span>

        </div>
    );
};

export default Tooltip;