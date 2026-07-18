import React from "react";
import { X } from "lucide-react";

const Modal = ({
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

                flex
                items-center
                justify-center

                bg-black/40
                backdrop-blur-sm
            "
        >

            <div
                className="
                    w-full
                    max-w-lg

                    rounded-2xl

                    bg-white

                    shadow-2xl

                    overflow-hidden

                    animate-in
                "
            >

                {/* Header */}

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

                            transition
                        "
                    >
                        <X size={20}/>
                    </button>

                </div>

                {/* Body */}

                <div
                    className="
                        p-6
                    "
                >
                    {children}
                </div>

            </div>

        </div>
    );

};

export default Modal;