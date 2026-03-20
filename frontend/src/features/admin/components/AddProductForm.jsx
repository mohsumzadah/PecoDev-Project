import React, { useState } from 'react';
import { createProduct } from '../../../services/productService';

function AddProductForm({ onProductAdded }) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [imageFile, setImageFile] = useState(null); // New state for file

    const [formData, setFormData] = useState({
        name: '', price: '', category: 'FIVEM',
        shortDesc: '', longDesc: '', features: '', paddlePriceId: ''
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Handle file selection
    const handleFileChange = (e) => setImageFile(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            // 1. Prepare Product Data
            const productData = {
                ...formData,
                price: parseFloat(formData.price),
                paddlePriceId: formData.paddlePriceId, // Include in payload
                features: formData.features.split(',').map(f => f.trim()).filter(f => f !== '')
            };

            // 2. Use FormData to package text + file
            const data = new FormData();
            data.append('product', JSON.stringify(productData)); // Send text as JSON blob
            data.append('image', imageFile); // Send the actual file


            // 3. Send to Service
            await createProduct(data);

            if (onProductAdded) onProductAdded();
            setMessage({ type: 'success', text: 'Product & Image uploaded successfully!' });

            // Reset
            setFormData({ name: '', price: '', category: 'FIVEM', shortDesc: '', longDesc: '', features: '', paddlePriceId: '' });
            setImageFile(null);
            e.target.reset(); // Clears file input
        } catch (err) {
            setMessage({ type: 'danger', text: 'Upload failed. Check backend.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
                {message.text && <div className={`alert alert-${message.type}`}>{message.text}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Product Name</label>
                            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label fw-semibold">Price ($)</label>
                            <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} required />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label fw-semibold">Category</label>
                            <select name="category" className="form-select" value={formData.category} onChange={handleChange}>
                                <option value="FIVEM">FiveM</option>
                                <option value="MINECRAFT">Minecraft</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label fw-semibold">Paddle Price ID (pri_...)</label>
                            <input
                                type="text"
                                name="paddlePriceId"
                                className="form-control"
                                placeholder="pri_01j7p..."
                                value={formData.paddlePriceId}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* File Upload Row */}
                        <div className="col-12">
                            <label className="form-label fw-semibold">Product Image</label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="bi bi-upload"></i></span>
                                <input type="file" className="form-control" accept="image/*" onChange={handleFileChange} required />
                            </div>
                            <small className="text-muted">Best size: 600x400px</small>
                        </div>

                        <div className="col-12">
                            <label className="form-label fw-semibold">Tagline</label>
                            <input type="text" name="shortDesc" className="form-control" value={formData.shortDesc} onChange={handleChange} required />
                        </div>
                        <div className="col-12">
                            <label className="form-label fw-semibold">Full Description</label>
                            <textarea name="longDesc" className="form-control" rows="4" value={formData.longDesc} onChange={handleChange} required></textarea>
                        </div>
                        <div className="col-12">
                            <label className="form-label fw-semibold">Features List</label>
                            <input type="text" name="features" className="form-control" value={formData.features} onChange={handleChange} />
                        </div>

                        <div className="col-12 mt-4 text-end">
                            <button type="submit" className="btn btn-primary px-5 fw-bold" disabled={loading}>
                                {loading ? 'Uploading...' : 'Save Product'}
                            </button>
                        </div>


                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddProductForm;