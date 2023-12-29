import React from "react";
import { IoIosMail } from "react-icons/io";
import { FaFacebookF, FaInstagram, FaPhone, FaYoutube } from "react-icons/fa";
import withRouter from "~/hocs/withRouter";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const TopHeader = ({ location }) => {
    console.log(location.pathname);
    return (
        <div
            className={twMerge(
                clsx(
                    "h-[85px] text-white border-b border-main-400 bg-transparent fixed z-50 top-0 w-full px-[100px] py-[26px] flex items-center justify-between",
                    location.pathname !== "/" && "bg-main-700"
                )
            )}
        >
            <span className="flex items-center gap-2">
                <IoIosMail />
                <span>
                    <span>Email us at:</span>
                    <span className="text-gray-300">example@gmail.com</span>
                </span>
            </span>

            <div className="flex flex-row items-center">
                <div className="flex flex-row gap-6 text-gray-300 text-xl">
                    <FaFacebookF />
                    <FaYoutube />
                    <FaInstagram />
                </div>
                <div className="flex items-center border-l bg-main-50 w-[1px] h-5 mx-4"></div>
                <span className="flex items-center gap-2 items-center">
                    <FaPhone />
                    <span className="text-gray-300">123-456 7890</span>
                </span>
            </div>
        </div>
    );
};

export default withRouter(TopHeader);
