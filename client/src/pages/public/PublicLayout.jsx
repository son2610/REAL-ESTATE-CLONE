import clsx from "clsx";
import { Outlet } from "react-router-dom";
import { Navigation, TopHeader } from "~/components";
import withRouter from "~/hocs/withRouter";

function PublicLayout() {
    return (
        <main>
            <TopHeader />
            <Navigation />
            <div
                className={clsx(
                    location.pathname === "/" ? "pt-0" : "pt-[170px]"
                )}
            >
                <Outlet />
            </div>
        </main>
    );
}

export default withRouter(PublicLayout);
