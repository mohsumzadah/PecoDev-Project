import React, { useState } from 'react';
import AddProductForm from '../components/AddProductForm';
import AdminProductList from '../components/AdminProductList';

function Dashboard() {
    const [activeTab, setActiveTab] = useState('products');
    // This is our "signal" to refresh the list
    const [refreshKey, setRefreshKey] = useState(0);

    const handleProductAdded = () => {
        // Incrementing this number acts as a "trigger" for the List component
        setRefreshKey(prev => prev + 1);

        // Optional: Close the collapse menu automatically after adding
        const collapseElement = document.getElementById('addProductCollapse');
        const bsCollapse = window.bootstrap?.Collapse.getInstance(collapseElement);
        if (bsCollapse) bsCollapse.hide();
    };

    return (
        <div className="container-fluid p-0">
            <div className="row g-0 vh-100 overflow-hidden">
                {/* LEFT PANEL: Fixed Sidebar */}
                <div className="col-md-3 col-lg-2 bg-dark d-flex flex-column p-3 text-white border-end">
                    <div className="text-center mb-4 mt-3">
                        <i className="bi bi-shield-lock fs-2 text-primary"></i>
                        <h6 className="mt-2 text-uppercase fw-bold">Admin</h6>
                    </div>
                    <ul className="nav nav-pills flex-column mb-auto gap-2">
                        <li className="nav-item">
                            <button
                                onClick={() => setActiveTab('products')}
                                className={`nav-link w-100 text-start border-0 py-3 ${activeTab === 'products' ? 'active' : 'text-white opacity-75'}`}
                            >
                                <i className="bi bi-box-seam me-2"></i> Products
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                onClick={() => setActiveTab('users')}
                                className={`nav-link w-100 text-start border-0 py-3 ${activeTab === 'users' ? 'active' : 'text-white opacity-75'}`}
                            >
                                <i className="bi bi-people me-2"></i> Users
                            </button>
                        </li>
                    </ul>
                    <hr />
                    <div className="pb-3 text-center opacity-50 small">PecoDev v1.0</div>
                </div>

                {/* RIGHT PANEL: Scrollable Content Area */}
                <div className="col-md-9 col-lg-10 bg-light h-100 overflow-auto p-5">
                    <div className="pb-5">
                        {activeTab === 'products' && (
                            <section>
                                <div className="mb-4 d-flex justify-content-between align-items-end">
                                    <div>
                                        <h2 className="fw-bold">Inventory Management</h2>
                                        <p className="text-muted mb-0">Manage your FiveM & Minecraft scripts catalog.</p>
                                    </div>
                                    <button className="btn btn-primary" data-bs-toggle="collapse" data-bs-target="#addProductCollapse">
                                        <i className="bi bi-plus-lg me-2"></i> Add New Product
                                    </button>
                                </div>

                                <div className="collapse mb-4" id="addProductCollapse">
                                    {/* Pass the toggle function here */}
                                    <AddProductForm onProductAdded={handleProductAdded} />
                                </div>

                                {/* Key is the magic part: when refreshKey changes, AdminProductList knows it needs to update */}
                                <AdminProductList refreshTrigger={refreshKey} />
                            </section>
                        )}

                        {activeTab === 'users' && (
                            <section>
                                <h2 className="fw-bold mb-4">Registered Users</h2>
                                <div className="card border-0 shadow-sm p-4">
                                    <p>User table will load here...</p>
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;