import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../../services/productService";
import ProductCard from "../../products/components/ProductCard";

const HomePage = () => {
    const [latestProducts, setLatestProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLatest = async () => {
            try {
                const response = await getAllProducts();
                const sorted = response.data.content
                    .sort((a, b) => b.id - a.id)
                    .slice(0, 3);
                setLatestProducts(sorted);
            } catch (error) {
                console.error("Error fetching latest products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLatest();
    }, []);

    const reviews = [
        { id: 1, user: "Alex", rating: 5, text: "Amazing scripts, easy to use!", role: "Server Owner" },
        { id: 2, user: "Sophie", rating: 4, text: "Great support and fast updates.", role: "Developer" },
        { id: 3, user: "John", rating: 5, text: "High-quality scripts, highly recommend!", role: "Admin" },
    ];

    return (
        <div className="bg-light">
            {/* 🚀 PREMIUM HERO SECTION */}
            {/* 🚀 PREMIUM HERO SECTION */}
            <section className="position-relative overflow-hidden text-white py-5"
                style={{
                    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                    minHeight: "500px",
                    display: "flex",
                    alignItems: "center"
                }}>

                {/* Background Decorative Icon - Fixed Position */}
                <div className="position-absolute h-100 w-100 d-none d-lg-block" style={{ top: 0, right: 0, zIndex: 1 }}>
                    <i className="bi bi-controller text-white opacity-10"
                        style={{
                            fontSize: "25rem",
                            position: "absolute",
                            right: "5%",
                            top: "50%",
                            transform: "translateY(-50%) rotate(-15deg)"
                        }}></i>
                </div>

                <div className="container position-relative" style={{ zIndex: 2 }}>
                    <div className="row">
                        <div className="col-lg-8 text-start">
                            <div className="animate-fade-in">
                                <span className="badge bg-primary mb-3 px-3 py-2 rounded-pill shadow-sm">
                                    <i className="bi bi-stars me-1"></i> NEW RELEASES OUT NOW
                                </span>
                                <h1 className="display-2 fw-extrabold mb-3">
                                    Elevate Your <span className="text-primary">Gaming</span> <br />
                                    Server Experience
                                </h1>
                                <p className="lead fs-4 opacity-75 mb-4 col-md-10">
                                    Premium FiveM scripts and Minecraft resources engineered for
                                    maximum performance and player retention.
                                </p>
                                <div className="d-flex gap-3 flex-wrap">
                                    <div className="d-flex gap-3 flex-wrap mt-4">
                                        {/* FiveM Path */}
                                        <Link to="/fivem" className="btn btn-primary btn-lg px-4 py-3 fw-bold rounded-3 shadow-lg border-0 d-flex align-items-center">
                                            <i className="bi bi-car-front-fill me-2"></i> FiveM Scripts
                                        </Link>

                                        {/* Minecraft Path */}
                                        <Link to="/minecraft" className="btn btn-success btn-lg px-4 py-3 fw-bold rounded-3 shadow-lg border-0 d-flex align-items-center">
                                            <i className="bi bi-box-seam-fill me-2"></i> Minecraft Plugins
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* 🆕 LATEST PRODUCTS SECTION */}
            <section id="latest" className="py-5">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-end mb-5">
                        <div>
                            <h2 className="fw-bold mb-1">Latest Releases</h2>
                            <p className="text-muted mb-0">The newest additions to the PecoDev collection.</p>
                        </div>
                        <Link to="/products" className="text-primary fw-bold text-decoration-none">View All <i className="bi bi-arrow-right"></i></Link>
                    </div>

                    {loading ? (
                        <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
                    ) : (
                        <div className="row g-4">
                            {latestProducts.map((product) => (
                                <div className="col-md-4" key={product.id}>
                                    <div className="h-100 transition-up shadow-hover">
                                        <ProductCard product={product} category={product.category.toLowerCase()} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ⭐ FEATURES (The "Why Choose Us") */}
            <section className="py-5 bg-white border-top border-bottom">
                <div className="container">
                    <div className="row g-4 text-center">
                        <FeatureItem icon="bi-lightning-charge" color="warning" title="Optimized" text="Minimal resmon usage." />
                        <FeatureItem icon="bi-shield-lock" color="success" title="Secure" text="Encrypted & safe code." />
                        <FeatureItem icon="bi-headset" color="info" title="24/7 Support" text="We help you install." />
                    </div>
                </div>
            </section>
            {/* 🎮 CATEGORY GRID */}
            <section className="py-5">
                <div className="container">
                    <div className="row g-4">
                        {/* FiveM Card */}
                        <div className="col-md-6">
                            <div className="card border-0 rounded-4 overflow-hidden shadow-sm bg-dark text-white h-100">
                                <div className="card-body p-5 d-flex flex-column align-items-start"
                                    style={{ background: "linear-gradient(45deg, #000000 0%, #3b82f6 300%)" }}>
                                    <i className="bi bi-car-front-fill display-1 opacity-25 mb-3"></i>
                                    <h2 className="fw-bold">FiveM Edition</h2>
                                    <p className="opacity-75">Ultimate roleplay assets, scripts, and maps for your GTA V server.</p>
                                    <Link to="/fivem" className="btn btn-light mt-auto fw-bold px-4">Enter Store</Link>
                                </div>
                            </div>
                        </div>

                        {/* Minecraft Card */}
                        <div className="col-md-6">
                            <div className="card border-0 rounded-4 overflow-hidden shadow-sm text-white h-100"
                                style={{ backgroundColor: "#1e3a1e" }}>
                                <div className="card-body p-5 d-flex flex-column align-items-start"
                                    style={{ background: "linear-gradient(45deg, #1e3a1e 0%, #22c55e 300%)" }}>
                                    <i className="bi bi-box-seam-fill display-1 opacity-25 mb-3"></i>
                                    <h2 className="fw-bold">Minecraft Edition</h2>
                                    <p className="opacity-75">Performance-focused plugins, custom builds, and server setups.</p>
                                    <Link to="/minecraft" className="btn btn-light mt-auto fw-bold px-4">Enter Store</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* 💬 TESTIMONIALS */}
            <section className="py-5 bg-light">
                <div className="container text-center">
                    <h2 className="fw-bold mb-5">Trusted by Server Owners</h2>
                    <div className="row g-4">
                        {reviews.map((review) => (
                            <div className="col-md-4" key={review.id}>
                                <div className="card h-100 border-0 shadow-sm p-3">
                                    <div className="card-body">
                                        <div className="text-warning mb-3">
                                            {"★".repeat(review.rating)}
                                        </div>
                                        <p className="fst-italic mb-4 text-secondary">"{review.text}"</p>
                                        <div className="d-flex align-items-center justify-content-center mt-auto">
                                            <div className="bg-primary-subtle text-primary rounded-circle p-2 fw-bold" style={{ width: '40px', height: '40px' }}>
                                                {review.user[0]}
                                            </div>
                                            <div className="text-start ms-3">
                                                <h6 className="mb-0 fw-bold">{review.user}</h6>
                                                <small className="text-muted">{review.role}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

// --- Small UI Sub-components to keep things tidy ---

const CategoryCard = ({ title, desc, icon, color, link }) => (
    <div className="col-md-5">
        <div className="card border-0 shadow-sm overflow-hidden h-100 transition-up">
            <div className="card-body p-4 text-center">
                <div className={`bg-${color} bg-opacity-10 text-${color} rounded-circle d-inline-flex align-items-center justify-content-center mb-3`} style={{ width: '80px', height: '80px' }}>
                    <i className={`bi ${icon} fs-1`}></i>
                </div>
                <h3 className="fw-bold">{title}</h3>
                <p className="text-muted">{desc}</p>
                <Link to={link} className={`btn btn-outline-${color} rounded-pill px-4 mt-2 fw-bold`}>Explore {title}</Link>
            </div>
        </div>
    </div>
);

const FeatureItem = ({ icon, color, title, text }) => (
    <div className="col-md-4">
        <i className={`bi ${icon} text-${color} fs-1 mb-3 d-block`}></i>
        <h5 className="fw-bold">{title}</h5>
        <p className="text-muted small px-lg-5">{text}</p>
    </div>
);

export default HomePage;