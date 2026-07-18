import React, { useEffect } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

const variants = {
    success: {
        bg: "bg-[#10B981]",
        icon: <CheckCircle size={20} />,
    },
    error: {
        bg: "bg-[#EF4444]",
        icon: <XCircle size={20} />,
    },
    warning: {
        bg: "bg-[#F59E0B]",
        icon: <AlertTriangle size={20} />,
    },
    info: {
        bg: "bg-[#06B6D4]",
        icon: <Info size={20} />,
    },
};

const Toast = ({
    message,
    type = "success",
    show,
    onClose,
}) => {

    useEffect(() => {

        if (!show) return;

        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);

    }, [show, onClose]);

    if (!show) return null;

    return (

        <div
            className={`
                fixed
                top-6
                right-6

                z-50

                flex
                items-center
                justify-between
                gap-3

                min-w-[320px]

                px-5
                py-4

                rounded-xl

                text-white

                shadow-xl

                ${variants[type].bg}
            `}
        >

            <div className="flex items-center gap-3">

                {variants[type].icon}

                <span className="font-medium">
                    {message}
                </span>

            </div>

            <button onClick={onClose}>
                <X size={18}/>
            </button>

        </div>

    );

};

export default Toast;