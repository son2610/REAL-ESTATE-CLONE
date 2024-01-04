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
                // Xử lý việc chuyển trang, khi ở home thì không dùng pd và để background full header
                // Khi vào các sub pabe thì nội dung còn lại sẽ bắt đầu dưới phàn header và top = 170px
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
