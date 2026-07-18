import React from "react";
import { Heart } from "lucide-react";

const FavoriteButton = ({
    isFavorite = false,
    onToggle,
}) => {

    return (
        <button
            onClick={onToggle}
            className={`
                flex
                items-center
                justify-center

                w-12
                h-12

                rounded-full

                border

                transition-all
                duration-300

                shadow-md

                hover:scale-110
                active:scale-95

                ${
                    isFavorite
                        ? "bg-[#EF4444] border-[#EF4444] text-white"
                        : "bg-white border-[#E2E8F0] text-[#64748B] hover:bg-[#FFE8D1] hover:text-[#EF4444]"
                }
            `}
        >
            <Heart
                size={22}
                fill={isFavorite ? "currentColor" : "none"}
            />
        </button>
    );
};

export default FavoriteButton;