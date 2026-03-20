import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../shared/layout/MainLayout";
import ProductDetailsPage from "../features/products/pages/ProductDetailsPage";
import HomePage from "../features/home/pages/HomePage";
import ContactPage from "../features/contact/pages/ContactPage";
import LoginPage from "../features/users/pages/Login";
import RegisterPage from "../features/users/pages/Register";
import CartPage from "../features/products/pages/CartPage";
import Dashboard from "../features/admin/pages/Dashboard";
import Settings from "../features/users/pages/Settings";
import CategoryPage from "../features/products/pages/CategoryPage";
import MyProductsPage from "../features/products/pages/MyProductsPage";

import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            { path: "/:category", element: <CategoryPage /> },
            { path: "/:category/:id", element: <ProductDetailsPage /> },
            { path: "/contact", element: <ContactPage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/register", element: <RegisterPage /> },
            {
                path: "/cart",
                element: <CartPage />
            },
            {
                path: "/settings",
                element: (
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>
                )
            },
            {
                path: "/my-products",
                element: (
                    <ProtectedRoute>
                        <MyProductsPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "/admin/dashboard", element: (
                    <ProtectedRoute adminOnly={true}>
                        <Dashboard />
                    </ProtectedRoute>
                )
            }

        ],
    },
]);