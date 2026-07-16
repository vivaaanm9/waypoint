import React from "react";
import { ChevronRight } from "lucide-react";

const Breadcrumb = ({ items = [] }) => {

    return (
        <nav className="flex items-center text-sm text-[#64748B]">

            {items.map((item, index) => (

                <React.Fragment key={index}>

                    <span
                        className={`
                            ${
                                index === items.length - 1
                                    ? "text-[#0F172A] font-medium"
                                    : "hover:text-[#4F46E5] cursor-pointer"
                            }
                        `}
                    >
                        {item}
                    </span>

                    {index !== items.length - 1 && (
                        <ChevronRight
                            size={16}
                            className="mx-2"
                        />
                    )}

                </React.Fragment>

            ))}

        </nav>
    );

};

export default Breadcrumb;