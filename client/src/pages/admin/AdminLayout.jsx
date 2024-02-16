import React from "react";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "~/components";

const AdminLayout = () => {
    return (
        <main className="grid grid-cols-12">
            <div className="col-span-2 bg-main-600 text-white h-full max-h-screen overflow-y-auto">
                <AdminSidebar />
            </div>
            <div className="col-span-10 max-h-screen overflow-y-auto">
                <Outlet />
            </div>
            <div>kdajlfdjslk</div>
        </main>
    );
};

export default AdminLayout;
