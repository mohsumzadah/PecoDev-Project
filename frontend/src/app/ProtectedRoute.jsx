import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user } = useAuth();

    // 1. Not logged in? Send to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // 2. Admin page but user is just a "USER"? Send home
    if (adminOnly && user.role !== "ROLE_ADMIN") {
        return <Navigate to="/" replace />;
    }

    // 3. Everything is fine? Show the page
    return children;
};

export default ProtectedRoute;