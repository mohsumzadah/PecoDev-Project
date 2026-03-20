import React from "react";
import { Link } from "react-router-dom";
// import "bootstrap-icons/font/bootstrap-icons.css";

const Footer = () => {
    return (
        <footer className="bg-light text-dark pt-5 pb-3 ">
            <div className="container">
                <div className="row">
                    {/* Logo & About */}
                    <div className="col-md-4 mb-4">
                        <h5 className="fw-bold">PecoDev</h5>
                        <p className="text-muted">
                            Marketplace for FiveM and Minecraft scripts. Find the best scripts and plugins for your server.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-4 mb-4">
                        <h6 className="fw-bold">Quick Links</h6>
                        <ul className="list-unstyled">
                            <li className="mb-1">
                                <Link to="/" className="text-dark text-decoration-none">
                                    Home
                                </Link>
                            </li>
                            <li className="mb-1">
                                <Link to="/fivem" className="text-dark text-decoration-none">
                                    FiveM
                                </Link>
                            </li>
                            <li className="mb-1">
                                <Link to="/minecraft" className="text-dark text-decoration-none">
                                    Minecraft
                                </Link>
                            </li>
                            <li className="mb-1">
                                <Link to="/contact" className="text-dark text-decoration-none">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div className="col-md-4 mb-4">
                        <h6 className="fw-bold">Contact</h6>
                        <p className="mb-2"><i className="bi bi-envelope me-2"></i>support@pecodev.com</p>
                        {/* <p className="mb-2"><i className="bi bi-telephone me-2"></i>+1 234 567 890</p> */}
                        <div className="d-flex mt-2">
                            <a href="https://facebook.com/pecodev" className="text-dark me-3 fs-5">
                                <i className="bi bi-facebook"></i>
                            </a>
                            {/* <a href="#" className="text-dark me-3 fs-5">
                                <i className="bi bi-twitter"></i>
                            </a> */}
                            {/* <a href="#" className="text-dark me-3 fs-5">
                                <i className="bi bi-github"></i>
                            </a> */}
                            <a href="https://instagram.com/peco_dev" className="text-dark fs-5">
                                <i className="bi bi-instagram"></i>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer bottom */}
                <div className="text-center border-top pt-3 mt-3 text-muted small">
                    &copy; {new Date().getFullYear()} PecoDev. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;