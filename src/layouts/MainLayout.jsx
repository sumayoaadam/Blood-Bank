import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/footer";

function MainLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer  />
        </>
    );
}

export default MainLayout;
