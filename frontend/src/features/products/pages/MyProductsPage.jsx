import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyLicenses } from "../../../services/licenseService"; // Import the service
import { API_BASE_URL } from "../../../config";

const MyProductsPage = () => {
    const navigate = useNavigate();

    const [ownedProducts, setOwnedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLicenses = async () => {
            try {
                const response = await getMyLicenses();
                // Map the license objects to a flat structure for the UI
                const products = response.data.map(item => ({
                    id: item?.id || 0,
                    name: item?.productName || "Unknown Product",
                    category: item?.category || "N/A",
                    img: item?.productImg || "",
                    version: item?.version || "v1.0.0",
                    licenseKey: item?.licenseKey,
                    file: item?.file || ""
                }));

                setOwnedProducts(products);
            } catch (error) {
                console.error("Failed to fetch licenses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLicenses();
    }, []);

    const renderImage = (path) => {
        if (!path) return "https://placehold.co/200x200?text=PecoDev";
        // Ensures we don't get double slashes //
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `${API_BASE_URL}${cleanPath}`;
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("License key copied to clipboard!");
    };

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <h1 className="fw-extrabold mb-1">My <span className="text-primary">PecoDev</span> Vault</h1>
                    <p className="text-muted mb-0">Manage your licenses and download your server resources.</p>
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded-4 text-primary text-center">
                    <h4 className="fw-bold mb-0">{ownedProducts.length}</h4>
                    <small className="fw-bold text-uppercase" style={{ fontSize: '0.7rem' }}>Assets Owned</small>
                </div>
            </div>

            <div className="row g-4">
                {ownedProducts.map((product, index) => (
                    <div className="col-12" key={`${product.id}-${index}`}>
                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                            <div className="row g-0 align-items-center">
                                {/* Product Preview */}
                                <div className="col-md-2 p-3">
                                    <img
                                        src={renderImage(product.img)}
                                        className="img-fluid rounded-3 shadow-sm"
                                        alt={product.name}
                                        style={{ height: '120px', width: '100%', objectFit: 'cover' }}
                                        onError={(e) => e.target.src = "https://placehold.co/200x200?text=PecoDev"}
                                    />
                                </div>

                                {/* Main Info */}
                                <div className="col-md-4 p-3">
                                    <span className={`badge mb-2 ${product.category === 'FIVEM' ? 'bg-primary' : 'bg-success'}`}>
                                        {product.category}
                                    </span>
                                    <h5 className="fw-bold mb-1">{product.name}</h5>
                                    <p className="text-muted small mb-0">Latest Version: <span className="text-dark fw-bold">{product.version}</span></p>
                                </div>

                                {/* License Management */}
                                <div className="col-md-3 p-3 text-center border-start border-end">
                                    <label className="text-muted small fw-bold d-block mb-2 text-uppercase">License Key</label>
                                    <div className="input-group input-group-sm">
                                        <input
                                            type="text"
                                            className="form-control bg-light border-0 fw-mono"
                                            value={product.licenseKey}
                                            readOnly
                                        />
                                        <button
                                            className="btn btn-outline-secondary border-0"
                                            onClick={() => copyToClipboard(product.licenseKey)}
                                        >
                                            <i className="bi bi-clipboard"></i>
                                        </button>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="col-md-3 p-3 text-center">
                                    <div className="d-flex flex-column gap-2 px-3">
                                        {/* Updated to use actual file path from DB */}
                                        <a
                                            href={`${API_BASE_URL}${product.file}`}
                                            className="btn btn-primary fw-bold shadow-sm"
                                            download
                                        >
                                            <i className="bi bi-download me-2"></i> Download File
                                        </a>
                                        <button
                                            onClick={() => navigate(`/${product.category.toLowerCase()}/${product.id}`)}
                                            className="btn btn-link btn-sm text-decoration-none text-muted"
                                        >
                                            View Documentation
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {!loading && ownedProducts.length === 0 && (
                <div className="text-center py-5">
                    <i className="bi bi-box-seam display-1 text-muted opacity-25"></i>
                    <h3 className="mt-3">Your vault is empty</h3>
                    <p className="text-muted">Head over to the store to start your collection.</p>
                </div>
            )}
        </div>
    );
};

export default MyProductsPage;