import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../../services/productService";
import { useCart } from "../../../context/CartContext";

const ProductDetailsPage = () => {
    const { id, category } = useParams();
    const navigate = useNavigate();
    const { cartItems = [], addToCart, removeFromCart } = useCart() || {};

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // 1. Define the HOST constant for images
    const HOST = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

    const isInCart = cartItems.some((item) => item.id === (product?.id));

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await getProductById(id);
                setProduct(response.data);
            } catch (err) {
                console.error("Error fetching product:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleCartClick = () => {
        if (isInCart) {
            removeFromCart(product.id);
        } else {
            addToCart(product);
        }
    };

    if (loading) return (
        <div className="container py-5 text-center">
            <div className="spinner-border text-primary"></div>
        </div>
    );

    if (error || !product) return (
        <div className="container py-5 text-center">
            <div className="alert alert-danger shadow-sm">Product not found!</div>
            <button className="btn btn-primary" onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );

    const isFiveM = product.category === 'FIVEM';

    return (
        <div className="container py-5">
            {/* Breadcrumb Navigation */}
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/" className="text-decoration-none">Home</a></li>
                    <li className="breadcrumb-item text-capitalize">
                        <a href={`/${category}`} className="text-decoration-none">{category}</a>
                    </li>
                    <li className="breadcrumb-item active">{product.name}</li>
                </ol>
            </nav>

            <div className="row g-5">
                {/* 2. FIXED IMAGE SECTION */}
                <div className="col-lg-6">
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                        <img
                            // Added the HOST prefix here!
                            src={product.img ? `${HOST}${product.img}` : `https://placehold.co/600x400?text=${product.name}`}
                            alt={product.name}
                            className="img-fluid w-100"
                            style={{ minHeight: '400px', objectFit: 'cover' }}
                        />
                    </div>
                </div>

                {/* INFO SECTION */}
                <div className="col-lg-6">
                    <div className="ps-lg-4">
                        <div className="mb-3">
                            <span className={`badge rounded-pill px-3 py-2 ${isFiveM ? 'bg-primary' : 'bg-success'} bg-opacity-10 text-${isFiveM ? 'primary' : 'success'}`}>
                                <i className={`bi ${isFiveM ? 'bi-car-front' : 'bi-box-seam'} me-1`}></i>
                                {product.category}
                            </span>
                        </div>

                        <h1 className="display-5 fw-bold mb-3">{product.name}</h1>
                        <h2 className="text-primary fw-bold mb-4">${product.price}</h2>

                        <div className="bg-light p-4 rounded-4 mb-4">
                            <p className="lead fs-6 text-secondary mb-0" style={{ whiteSpace: 'pre-line' }}>
                                {product.longDesc || product.shortDesc}
                            </p>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="d-grid gap-3 mb-5">
                            <button
                                className={`btn btn-lg py-3 fw-bold shadow-sm transition-all ${!isInCart ? "btn-primary" : isHovered ? "btn-danger" : "btn-success"
                                    }`}
                                onClick={handleCartClick}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                {!isInCart ? (
                                    <><i className="bi bi-cart-plus-fill me-2"></i> Add to Cart</>
                                ) : isHovered ? (
                                    <><i className="bi bi-trash-fill me-2"></i> Remove from Cart</>
                                ) : (
                                    <><i className="bi bi-check-circle-fill me-2"></i> Item in Cart</>
                                )}
                            </button>

                            <button className="btn btn-dark btn-lg py-3 fw-bold">
                                <i className="bi bi-lightning-fill me-2"></i> Buy It Now
                            </button>
                        </div>

                        {/* FEATURES LIST */}
                        <div>
                            <h5 className="fw-bold mb-3">Key Features</h5>
                            <div className="row g-2">
                                {(product.features || ["High Performance", "Instant Delivery", "Easy Setup"]).map((feat, idx) => (
                                    <div key={idx} className="col-md-6">
                                        <div className="d-flex align-items-center p-2">
                                            <i className="bi bi-patch-check-fill text-success me-2"></i>
                                            <span className="text-muted small">{feat}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;