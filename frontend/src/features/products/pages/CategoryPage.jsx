import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getProductsByCategory } from "../../../services/productService";

const CategoryPage = () => {
    // 1. Get the category from the URL (e.g., 'fivem' or 'minecraft')
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 2. Use your existing service method dynamically
        setLoading(true);
        getProductsByCategory(category.toLowerCase())
            .then(({ data }) => {
                console.log(`Fetched products for category "${category}":`, data);
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("API Error:", err);
                setLoading(false);
            });
    }, [category]); // 3. IMPORTANT: Refetch whenever the URL category changes

    // UI Theme Helper
    const isMinecraft = category.toLowerCase() === 'minecraft';
    const accentColor = isMinecraft ? 'success' : 'primary';

    if (loading) {
        return (
            <div className="text-center py-5 mt-5">
                <div className={`spinner-border text-${accentColor}`}></div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            {/* Dynamic Header */}
            <div className="d-flex align-items-center mb-5 border-bottom pb-4">
                <div className={`bg-${accentColor} bg-opacity-10 text-${accentColor} p-3 rounded-4 me-4`}>
                    <i className={`bi ${isMinecraft ? 'bi-box-seam' : 'bi-car-front'} display-5`}></i>
                </div>
                <div>
                    <h1 className="text-uppercase fw-extrabold mb-1">
                        {category} <span className={`text-${accentColor}`}>Store</span>
                    </h1>
                    <p className="text-muted mb-0">Premium resources for your {category} server.</p>
                </div>
            </div>

            {/* Dynamic Grid */}
            <div className="row g-4">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div className="col-md-4 col-lg-3" key={product.id}>
                            <ProductCard
                                product={product}
                                category={category.toLowerCase()}
                            />
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center py-5">
                        <div className="p-5 bg-light rounded-4">
                            <i className="bi bi-search display-1 text-muted opacity-25 mb-3"></i>
                            <h3>No products available yet.</h3>
                            <p className="text-muted">Check back soon for new {category} releases!</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;