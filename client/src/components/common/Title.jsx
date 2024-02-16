import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const Title = ({ title, children, className }) => {
    return (
        <div
            className={twMerge(
                clsx(
                    "px-4 border-b flex justify-between items-center",
                    className
                )
            )}
        >
            <h1 className="font-bold text-2xl tracking-tight">{title}</h1>
            {children}
        </div>
    );
};

export default Title;
