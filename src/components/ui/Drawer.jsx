import React from "react";
import { X } from "lucide-react";

const Drawer = ({
    isOpen,
    onClose,
    title,
    children,
}) => {

    if (!isOpen) return null;

    return (

        <div
            className="
                fixed
                inset-0

                z-50

                bg-black/40

                flex
                justify-end
            "
        >

            <div
                className="
                    w-full
                    max-w-md

                    h-screen

                    bg-white

                    shadow-2xl

                    flex
                    flex-col
                "
            >

                <div
                    className="
                        flex
                        items-center
                        justify-between

                        px-6
                        py-4

                        border-b
                        border-[#E2E8F0]
                    "
                >

                    <h2
                        className="
                            text-xl
                            font-semibold
                            text-[#0F172A]
                        "
                    >
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="
                            p-2

                            rounded-lg

                            hover:bg-gray-100
                        "
                    >
                        <X size={20}/>
                    </button>

                </div>

                <div className="flex-1 p-6 overflow-y-auto">

                    {children}

                </div>

            </div>

        </div>

    );

};

export default Drawer;