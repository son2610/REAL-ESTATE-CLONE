import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";
import { CgSpinner } from "react-icons/cg";

const Button = ({
    children,
    className,
    onClick,
    type = "button",
    disabaled = false,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={twMerge(
                clsx(
                    "py-3 px-4 text-white bg-main-700 rounded-md flex items-center justify-center flex-row gap-2",
                    className
                )
            )}
        >
            {disabaled && (
                <span className="animate-spin">
                    <CgSpinner />
                </span>
            )}
            {children}
        </button>
    );
};

export default Button;
