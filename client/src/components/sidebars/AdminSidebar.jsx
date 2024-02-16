import clsx from "clsx";
import { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { adminSidebar } from "~/utils/constants";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { RiArrowGoForwardFill } from "react-icons/ri";

const AdminSidebar = () => {
    const [activeTabs, setActiveTab] = useState([]);

    //Nếu thẻ parent đang mở thì khi click lại ta sẽ xoá phần tử id đi => đóng thẻ parent
    const handleActiveTab = (tabId) => {
        if (activeTabs.some((item) => item === tabId))
            setActiveTab((prev) => prev.filter((item) => item !== tabId));
        // Nếu chưa mở thì ta thêm id vào mảng => mở thẻ parent chứa các phần tử con
        else setActiveTab((prev) => [...prev, tabId]);
    };
    return (
        <div className="h-screen">
            <div className="w-full flex justify-center flex-col items-center p-4">
                <img
                    src="/logo2.png"
                    alt="logo admin sidebar"
                    className="w-3/5 object-contain"
                />
                <small className="text-gray-100 italic my-4">
                    Admin workspace
                </small>
            </div>
            <div className="mt-6">
                {adminSidebar.map((item) => (
                    <Fragment key={item.id}>
                        {item.type === "SINGLE" && (
                            <NavLink
                                className={({ isActive }) =>
                                    clsx(
                                        "flex flex-row items-center gap-4 hover:bg-main-700 px-4 py-3 hover:border-r-4 border-orange-700",
                                        isActive && "bg-main-700 border-r-4"
                                    )
                                }
                                to={item.path}
                            >
                                <span className="text-2xl">{item.icon}</span>
                                <span className="select-none">{item.name}</span>
                            </NavLink>
                        )}
                        {item.type === "PARENT" && (
                            <>
                                <div
                                    onClick={() => handleActiveTab(item.id)}
                                    className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-main-700 px-4 py-3 hover:border-r-4 border-orange-700"
                                >
                                    <span className="flex items-center gap-2">
                                        <span>{item.icon}</span>
                                        <span className="select-none">
                                            {item.name}
                                        </span>
                                    </span>
                                    <span>
                                        {activeTabs.some(
                                            (tabId) => tabId === item.id
                                        ) ? (
                                            <FaChevronRight />
                                        ) : (
                                            <FaChevronDown />
                                        )}
                                    </span>
                                </div>
                                {activeTabs.some(
                                    (tabid) => tabid === item.id
                                ) && (
                                    <div className="transition-all">
                                        {item.subs.map((sub) => (
                                            <NavLink
                                                key={sub.id}
                                                className={({ isActive }) =>
                                                    clsx(
                                                        "flex flex-row items-center gap-4 hover:bg-main-700 px-4 py-3 hover:border-r-4 border-orange-700",
                                                        isActive &&
                                                            "bg-main-700 border-r-4"
                                                    )
                                                }
                                                to={sub.path}
                                            >
                                                <span className="select-none">
                                                    {sub.name}
                                                </span>
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                        <Link
                            className={clsx(
                                "flex flex-row items-center gap-4 hover:bg-main-700 px-4 py-3 hover:border-r-4 border-orange-700"
                            )}
                            to={"/"}
                        >
                            <span className="text-2xl">
                                <RiArrowGoForwardFill />
                            </span>
                            <span className="select-none">Go Homepage</span>
                        </Link>
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default AdminSidebar;
