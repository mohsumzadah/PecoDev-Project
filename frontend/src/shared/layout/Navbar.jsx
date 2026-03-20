import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { API_BASE_URL } from "../../config";
import "./Navbar.css";

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartItems = [] } = useCart() || {};
    // Helper to check if user is Admin
    const isAdmin = user?.role === "ROLE_ADMIN";

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
            <div className="container">
                {/* Logo */}
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <i className="bi bi-code-slash me-2 text-primary fs-3"></i>
                    <span className="fw-bold fs-4 text-dark">PecoDev</span>
                </Link>

                {/* Mobile toggle */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        {/* Centered links */}
                        <ul className="navbar-nav mx-auto d-flex gap-3">
                            <li className="nav-item"><Link className="nav-link custom-nav-link" to="/">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link custom-nav-link" to="/fivem">FiveM</Link></li>
                            <li className="nav-item"><Link className="nav-link custom-nav-link" to="/minecraft">Minecraft</Link></li>
                            <li className="nav-item"><Link className="nav-link custom-nav-link" to="/contact">Contact</Link></li>
                        </ul>

                        {/* Right-side */}
                        <ul className="navbar-nav d-flex align-items-center ms-3">
                            <li className="nav-item me-3">
                                <Link className="nav-link fs-4 text-dark position-relative" to="/cart">
                                    <i className="bi bi-cart3"></i>
                                    {cartItems.length > 0 && (
                                        <span className="position-absolute badge rounded-pill bg-danger border border-white"
                                            style={{ fontSize: '0.65rem', top: '5px', left: '80%', padding: '0.35em 0.5em' }}>
                                            {cartItems.length}
                                        </span>
                                    )}
                                </Link>
                            </li>

                            {user ? (
                                <li className="nav-item dropdown">
                                    <button className="btn d-flex align-items-center p-0 border-0 bg-transparent dropdown-toggle" id="profileDropdown" data-bs-toggle="dropdown">
                                        <img
                                            src={user?.profilePicture
                                                ? `${API_BASE_URL}${user.profilePicture}`
                                                : `https://ui-avatars.com/api/?name=${user?.username}&background=random`}
                                            className="rounded-circle me-2"
                                            style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                                            alt="User"
                                        />
                                        <span className="fw-semibold text-dark">{user.username}</span>
                                    </button>

                                    <ul className="dropdown-menu dropdown-menu-end shadow p-2" aria-labelledby="profileDropdown">

                                        {/* ADMIN ONLY SECTION */}
                                        {isAdmin && (
                                            <>
                                                <li>
                                                    <Link className="dropdown-item d-flex align-items-center text-primary fw-bold" to="/admin/dashboard">
                                                        <i className="bi bi-speedometer2 me-2"></i> Admin Dashboard
                                                    </Link>
                                                </li>
                                                <li><hr className="dropdown-divider" /></li>
                                            </>
                                        )}

                                        <li>
                                            <Link className="dropdown-item d-flex align-items-center" to="/my-products">
                                                <i className="bi bi-box me-2"></i> My Products
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item d-flex align-items-center" to="/settings">
                                                <i className="bi bi-gear me-2"></i> Settings
                                            </Link>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <button className="dropdown-item d-flex align-items-center text-danger" onClick={logout}>
                                                <i className="bi bi-box-arrow-right me-2"></i> Logout
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <Link className="btn btn-outline-primary rounded-pill px-4 py-2" to="/login">Login</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;