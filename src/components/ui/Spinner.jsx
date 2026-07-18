import React from "react";

const Spinner = ({
    size = "md",
}) => {

    const sizes = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
    };

    return (

        <div
            className={`
                ${sizes[size]}

                border-4
                border-[#E2E8F0]
                border-t-[#4F46E5]

                rounded-full

                animate-spin
            `}
        />

    );

};

export default Spinner;