import React, { useEffect, useState } from 'react';
import { getAllProducts, deleteProduct, updateProduct } from '../../../services/productService';
import { API_BASE_URL } from '../../../config';

function AdminProductList({ refreshTrigger }) {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    // Edit States
    const [editFormData, setEditFormData] = useState(null);
    const [newImage, setNewImage] = useState(null);

    const renderImage = (path) => {
        if (!path) return "https://placehold.co/40x40?text=No+Img";
        return path.startsWith('http') ? path : `${API_BASE_URL}${path.startsWith('/') ? path : '/' + path}`;
    };

    useEffect(() => { loadProducts(); }, [page, refreshTrigger]);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const res = await getAllProducts(page, 10);
            setProducts(res.data.content || []);

            setTotalPages(res.data.totalPages);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        // Clean up features: if string, convert to array
        const finalJson = {
            ...editFormData,
            features: typeof editFormData.features === 'string'
                ? editFormData.features.split(',').map(f => f.trim())
                : editFormData.features
        };

        data.append('product', JSON.stringify(finalJson));
        if (newImage) data.append('image', newImage);

        try {
            await updateProduct(editFormData.id, data);
            setEditFormData(null);
            loadProducts();
        } catch (err) { alert("Update failed"); }
    };

    if (loading) return <div className="text-center p-5"><div className="spinner-border"></div></div>;

    return (
        <div className="card border-0 shadow-sm mt-4">
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th>id</th><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Paddle ID</th><th className="text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map(p => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td><img src={renderImage(p.img)} style={{ width: '40px', height: '40px', objectFit: 'cover' }} className="rounded" /></td>
                                <td>{p.name}</td>
                                <td>{p.category}</td>
                                <td>${p.price}</td>
                                <td>{p.paddlePriceId || "Not Set"}</td>
                                <td className="text-end">
                                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => setEditFormData({ ...p })}><i className="bi bi-pencil"></i></button>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteProduct(p.id).then(loadProducts)}><i className="bi bi-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- BOOTSTRAP MODAL FOR EDITING --- */}
            {editFormData && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <form onSubmit={handleUpdateSubmit}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit Product</h5>
                                    <button type="button" className="btn-close" onClick={() => setEditFormData(null)}></button>
                                </div>
                                <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                                    <div className="row g-3">

                                        <div className="col-md-5">
                                            <label>Name</label>
                                            <input className="form-control" value={editFormData.name} onChange={e => setEditFormData({ ...editFormData, name: e.target.value })} />
                                        </div>
                                        <div className="col-md-2">
                                            <label>Price</label>
                                            <input type="number" className="form-control" value={editFormData.price} onChange={e => setEditFormData({ ...editFormData, price: e.target.value })} />
                                        </div>
                                        <div className="col-md-4">
                                            <label>Paddle Price ID</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="pri_01j7p..."
                                                value={editFormData.paddlePriceId}
                                                onChange={e => setEditFormData({ ...editFormData, paddlePriceId: e.target.value })}
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <label className="form-label fw-semibold">Category</label>
                                            <select name="category" className="form-select" value={editFormData.category} onChange={e => setEditFormData({ ...editFormData, category: e.target.value })}>
                                                <option value="FIVEM">FiveM</option>
                                                <option value="MINECRAFT">Minecraft</option>
                                            </select>
                                        </div>
                                        <div className="col-12">
                                            <label>Short Description</label>
                                            <input className="form-control" value={editFormData.shortDesc} onChange={e => setEditFormData({ ...editFormData, shortDesc: e.target.value })} />
                                        </div>
                                        <div className="col-12">
                                            <label>Long Description</label>
                                            <textarea className="form-control" rows="3" value={editFormData.longDesc} onChange={e => setEditFormData({ ...editFormData, longDesc: e.target.value })}></textarea>
                                        </div>
                                        <div className="col-12">
                                            <label>Features (Comma separated)</label>
                                            <input className="form-control" value={Array.isArray(editFormData.features) ? editFormData.features.join(', ') : editFormData.features}
                                                onChange={e => setEditFormData({ ...editFormData, features: e.target.value })} />
                                        </div>
                                        <div className="col-12">
                                            <label>Change Image (Optional)</label>
                                            <input type="file" className="form-control" onChange={e => setNewImage(e.target.files[0])} />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setEditFormData(null)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary" >Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default AdminProductList;