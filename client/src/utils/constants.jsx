import path from "./path";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiHouseLineBold } from "react-icons/pi";

export const navigations = [
    {
        id: 1,
        path: "/",
        text: "HOME",
    },
    {
        id: 2,
        path: `/${path.ABOUT_US}`,
        text: "ABOUT US",
    },
    {
        id: 3,
        path: `/${path.OUR_AGENTS}`,
        text: "OUR AGENT",
    },
    {
        id: 4,
        path: `/${path.PROPERTIES}`,
        text: "PROPERTIES",
    },
    {
        id: 5,
        path: `/${path.SEARCH}`,
        text: "SEARCH",
    },
];

export const adminSidebar = [
    {
        id: 12,
        name: "Dashboard",
        path: `/${path.ADMIN_LAYOUT}/${path.DASHBOARD}`,
        icon: <LuLayoutDashboard />,
        type: "SINGLE",
    },
    {
        id: 13,
        name: "Property Types",
        icon: <PiHouseLineBold />,
        type: "PARENT",
        subs: [
            {
                id: 131,
                path: `/${path.ADMIN_LAYOUT}/${path.CREATE_PROPERTY_TYPE}`,
                name: "Create New",
            },
            {
                id: 132,
                path: `/${path.ADMIN_LAYOUT}/${path.MANAGE_PROPERTY_TYPE}`,
                name: "Manage",
            },
        ],
    },
];
