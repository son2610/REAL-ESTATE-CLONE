import { Route, Routes } from "react-router-dom";
import path from "./utils/path";
import {
    AboutUs,
    Home,
    OurAgents,
    Properties,
    PublicLayout,
    Search,
} from "./pages/public";
import { Modal } from "./components";
import { useAppStore } from "./store/useAppStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";
import {
    AdminLayout,
    CreatePropertyType,
    Dashboard,
    ManagePropertyType,
} from "./pages/admin";

function App() {
    const { isShowModal } = useAppStore();
    const { getCurrent, current, getRole, token } = useUserStore();
    useEffect(() => {
        getCurrent();
        getRole();
    }, [token]);
    return (
        <>
            {isShowModal && <Modal />}
            <Routes>
                <Route path={path.PUBLIC_LAYOUT} element={<PublicLayout />}>
                    <Route path={path.HOME} element={<Home />} />
                    <Route path={path.ABOUT_US} element={<AboutUs />} />
                    <Route path={path.OUR_AGENTS} element={<OurAgents />} />
                    <Route path={path.PROPERTIES} element={<Properties />} />
                    <Route path={path.SEARCH} element={<Search />} />
                </Route>

                {/* Admin routes */}
                <Route path={path.ADMIN_LAYOUT} element={<AdminLayout />}>
                    <Route path={path.DASHBOARD} element={<Dashboard />} />
                    <Route
                        path={path.CREATE_PROPERTY_TYPE}
                        element={<CreatePropertyType />}
                    />
                    <Route
                        path={path.MANAGE_PROPERTY_TYPE}
                        element={<ManagePropertyType />}
                    />
                </Route>
            </Routes>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    );
}

export default App;
