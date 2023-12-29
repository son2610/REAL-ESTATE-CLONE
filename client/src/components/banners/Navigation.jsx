import { Link, NavLink } from "react-router-dom";
import { Button } from "..";
import { navigations } from "~/utils/constants";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import withRouter from "~/hocs/withRouter";

function Navigation({ locattion }) {
    return (
        <div className="h-[85px] bg-transparent fixed z-50 top-[85px] w-full px-[100px] py-[26px] flex items-center justify-between">
            <Link to="/">
                <img
                    src="./logo.png"
                    alt="logo"
                    className="w-[60px] object-contain"
                />
            </Link>
            <div
                className={twMerge(
                    clsx(
                        "flex items-center gap-6 text-main-100",
                        location.pathname !== "/" && "text-gray-700"
                    )
                )}
            >
                {navigations.map((itemnav) => (
                    <NavLink
                        key={itemnav.id}
                        to={itemnav.path}
                        className={({ isActive }) =>
                            clsx(
                                isActive ? "font-medium" : "",
                                location.pathname === "/"
                                    ? "text-white"
                                    : "text-gray-950"
                            )
                        }
                    >
                        {itemnav.text}
                    </NavLink>
                ))}
                <Button
                    className={twMerge(
                        clsx(
                            location.pathname === "/" &&
                                "bg-transparent border border-main-100"
                        )
                    )}
                >
                    Add Listing
                </Button>
            </div>
        </div>
    );
}

export default withRouter(Navigation);
