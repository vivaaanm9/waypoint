import React from "react";
import { AlertCircle } from "lucide-react";

const ErrorState = ({
    title = "Something went wrong",
    message = "Please try again later.",
}) => {

    return (
        <div
            className="
                flex
                flex-col
                items-center
                justify-center

                gap-4

                py-12
                px-6

                text-center
            "
        >

            <div
                className="
                    flex
                    items-center
                    justify-center

                    w-16
                    h-16

                    rounded-full

                    bg-red-100
                    text-[#EF4444]
                "
            >
                <AlertCircle size={32}/>
            </div>

            <h2
                className="
                    text-2xl
                    font-semibold
                    text-[#0F172A]
                "
            >
                {title}
            </h2>

            <p
                className="
                    max-w-md

                    text-[#64748B]
                "
            >
                {message}
            </p>

        </div>
    );

};

export default ErrorState;