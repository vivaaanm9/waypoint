import React from "react";

const LoadingSkeleton = ({
    width = "w-full",
    height = "h-4",
    rounded = "rounded-lg",
}) => {

    return (
        <div
            className={`
                ${width}
                ${height}
                ${rounded}

                bg-gray-200

                animate-pulse
            `}
        />
    );

};

export default LoadingSkeleton;