import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        // d-flex = display: flex
        // flex-column = flex-direction: column
        // min-vh-100 = min-height: 100vh (viewport height)
        <div className="d-flex flex-column min-vh-100">
            <Navbar />

            {/* flex-grow-1 = main takes up all available space, pushing footer down */}
            <main className="flex-grow-1">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default MainLayout;