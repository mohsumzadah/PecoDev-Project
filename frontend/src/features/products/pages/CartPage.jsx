import React from "react";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { issueLicenses } from "../../../services/licenseService"; // Updated to match your new service structure
import { useEffect } from "react";
import { API_BASE_URL } from "../../../config";


const CartPage = () => {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);


    const renderImage = (path) => {
        if (!path) return "https://placehold.co/200x200?text=PecoDev";
        // Ensures we don't get double slashes //
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `${API_BASE_URL}${cleanPath}`;
    };
    useEffect(() => {
        if (window.Paddle) {
            window.Paddle.Environment.set("sandbox");
            window.Paddle.Initialize({
                token: "test_6d55d47997871d6073fd5f0128f",
                eventCallback: (event) => {
                    if (event.name === "checkout.completed") {
                        clearCart();
                        navigate("/my-products", { state: { fromCheckout: true } });
                    }
                }
            });
        }
    }, [clearCart, navigate]);

    // 2. The trigger logic—This ONLY runs on button click now
    const handleCheckout = () => {
        if (!user) {
            navigate("/login", { state: { from: location.pathname } });
            return;
        }

        if (!window.Paddle) {
            alert("Payment system is still loading. Please wait a moment.");
            return;
        }

        window.Paddle.Checkout.open({
            items: cartItems.map(item => ({
                priceId: item.paddlePriceId || "pri_01j7p...",
                quantity: 1
            })),
            customer: { email: user.email },
            customData: {
                userId: user.id,
                productIds: cartItems.map(item => item.id).join(',')
            }
        });
    };

    return (
        <div className="container mt-5 mb-5">
            <h2 className="mb-4 fw-bold">Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <div className="text-center py-5 shadow-sm rounded bg-light">
                    <i className="bi bi-cart-x display-1 text-muted"></i>
                    <h3 className="mt-3">Your cart is empty</h3>
                    <p className="text-muted">Looks like you haven't added any products yet.</p>
                    <Link to="/" className="btn btn-primary px-4 mt-2">
                        Back to Shop
                    </Link>
                </div>
            ) : (
                <div className="row g-4">
                    {/* Left Side: Item List */}
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-0">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="p-3 border-bottom d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={renderImage(item.img)}
                                                alt={item.name}
                                                className="rounded"
                                                style={{ width: "80px", height: "60px", objectFit: "cover" }}
                                            />
                                            <div className="ms-3">
                                                <h6 className="mb-0 fw-bold">{item.name}</h6>
                                                <small className="text-muted">{item.category}</small>
                                            </div>
                                        </div>

                                        <div className="text-end">
                                            <p className="mb-1 fw-bold fs-5">${item.price}</p>
                                            <button
                                                className="btn btn-link btn-sm text-danger p-0 text-decoration-none"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                <i className="bi bi-trash3 me-1"></i> Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Order Summary */}
                    <div className="col-lg-4">
                        {/* FIX: Added z-index: 1 to ensure it stays below the Navbar dropdown 
                        */}
                        <div
                            className="card border-0 shadow-sm sticky-top"
                            style={{ top: "90px", zIndex: 1 }}
                        >
                            <div className="card-body">
                                <h5 className="mb-4 fw-bold">Order Summary</h5>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Subtotal</span>
                                    <span>${totalPrice}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Taxes</span>
                                    <span className="text-success">Free for PecoDev Launch</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between mb-4">
                                    <span className="fw-bold fs-5">Total</span>
                                    <span className="fw-bold fs-5 text-primary">${totalPrice}</span>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className="btn btn-primary w-100 btn-lg shadow-sm mb-3"
                                >
                                    {user ? "Proceed to Checkout" : "Login to Checkout"}
                                </button>

                                <div className="text-center mt-3 d-flex align-items-center justify-content-center gap-3">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" height="18" className="opacity-75" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Visa_Inc._logo_%282021%E2%80%93present%29.svg/640px-Visa_Inc._logo_%282021%E2%80%93present%29.svg.png" alt="Visa" height="12" className="opacity-75" style={{ filter: 'grayscale(100%)' }} />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" height="22" className="opacity-75" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" height="18" className="opacity-75" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;