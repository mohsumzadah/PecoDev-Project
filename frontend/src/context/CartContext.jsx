import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // 1. Initialize state from localStorage (or empty array if nothing exists)
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("peco_cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // 2. Every time cartItems changes, save it to localStorage
    useEffect(() => {
        localStorage.setItem("peco_cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        // Optional: Check if item already exists to avoid duplicates
        setCartItems((prev) => {
            const exists = prev.find(item => item.id === product.id);
            if (exists) return prev;
            return [...prev, product];
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem("peco_cart");
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);