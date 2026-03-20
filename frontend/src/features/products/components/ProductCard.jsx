import React, { useState } from "react"; // Added useState
import { useCart } from "../../../context/CartContext";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../../config";

const ProductCard = ({ product, category }) => {
    const { cartItems = [], addToCart, removeFromCart } = useCart() || {};
    const [isHovered, setIsHovered] = useState(false);

    const isInCart = cartItems.some((item) => item.id === product.id);

    const handleCartClick = () => {
        if (isInCart) {
            removeFromCart(product.id);
        } else {
            addToCart(product);
        }
    };

    const renderImage = (path) => {
        if (!path) return "https://placehold.co/40x40?text=No+Img";
        // This handles both "/uploads/..." and "uploads/..."
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `${API_BASE_URL}${cleanPath}`;
    };

    return (
        <div className="card h-100 shadow-sm border-0">
            <img src={renderImage(product.img)} className="card-img-top" alt={product.name} />

            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text flex-grow-1 text-muted small">{product.description}</p>

                <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="fw-bold fs-5">${product.price}</span>

                    <div className="d-flex gap-2">
                        <Link to={`/${category}/${product.id}`} className="btn btn-light btn-sm">
                            View
                        </Link>

                        <button
                            className={`btn btn-sm transition-all ${!isInCart
                                ? "btn-primary"
                                : isHovered
                                    ? "btn-danger" // Red on hover if in cart
                                    : "btn-success" // Green by default if in cart
                                }`}
                            onClick={handleCartClick}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            style={{ minWidth: "100px", transition: "0.3s" }}
                        >
                            {!isInCart ? (
                                <>
                                    <i className="bi bi-cart-plus me-1"></i> Add
                                </>
                            ) : isHovered ? (
                                <>
                                    <i className="bi bi-trash me-1"></i> Remove
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-check-lg me-1"></i> In Cart
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;