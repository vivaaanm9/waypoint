import React from "react";

const FloatingActionButton = ({
    icon,
    onClick,
}) => {

    return (

        <button
            onClick={onClick}
            className="
                fixed
                bottom-6
                right-6

                w-14
                h-14

                flex
                items-center
                justify-center

                rounded-full

                bg-[#4F46E5]
                text-white

                shadow-xl

                transition-all
                duration-300

                hover:bg-[#4338CA]
                hover:scale-110
            "
        >
            {icon}
        </button>

    );

};

export default FloatingActionButton;