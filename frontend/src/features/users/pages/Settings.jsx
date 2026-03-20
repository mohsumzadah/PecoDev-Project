import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { updateUserSettings, getUserProfile } from "../../../services/userService";
import { API_BASE_URL } from "../../../config";

const Settings = () => {
    const { user, setUser } = useAuth();
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Cleanup preview URL
    useEffect(() => {
        return () => preview && URL.revokeObjectURL(preview);
    }, [preview]);

    // --- Helper: Centralized Update Logic ---
    const executeUpdate = async (formData, successText) => {
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            await updateUserSettings(formData);

            // Fetch and Sync
            const freshUser = await getUserProfile();
            const updatedUser = { ...freshUser.data, token: user.token };

            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));

            setMessage({ type: 'success', text: successText });
            resetForm();
        } catch (err) {
            setMessage({ type: 'danger', text: 'Action failed. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setPassword("");
        setPreview(null);
        setImage(null);
    };

    // --- Handlers ---
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const onRemoveImage = () => {
        if (!window.confirm("Remove profile picture?")) return;
        const formData = new FormData();
        formData.append("settings", JSON.stringify({ removeImage: true }));
        executeUpdate(formData, 'Profile picture removed!');
    };

    const onSaveSettings = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("settings", JSON.stringify({ password }));
        if (image) formData.append("image", image);

        executeUpdate(formData, 'Profile updated successfully!');
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm border-0 p-4">
                        <h4 className="fw-bold mb-4">Account Settings</h4>

                        {message.text && (
                            <div className={`alert alert-${message.type} alert-dismissible fade show`}>
                                {message.text}
                                <button className="btn-close" onClick={() => setMessage({ type: '', text: '' })} />
                            </div>
                        )}

                        {/* Profile Section */}
                        <div className="text-center mb-4">
                            <ProfileImage
                                preview={preview}
                                currentPath={user?.profilePicture}
                                username={user?.username}
                                host={API_BASE_URL}
                            />
                            <div className="mt-2">
                                <label className="btn btn-sm btn-outline-primary rounded-pill px-3 me-2">
                                    <i className="bi bi-camera me-1"></i> Change
                                    <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                                </label>
                                {(user?.profilePicture || preview) && (
                                    <button className="btn btn-sm btn-outline-danger rounded-pill px-3" onClick={onRemoveImage} disabled={loading}>
                                        <i className="bi bi-trash"></i> Remove
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Form Section */}
                        <form onSubmit={onSaveSettings}>
                            <ReadOnlyInput label="Email Address" value={user?.email} />
                            <ReadOnlyInput label="Username" value={user?.username} />

                            <div className="mb-4">
                                <label className="form-label fw-semibold">New Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Leave blank to keep current"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <button className="btn btn-primary w-100 py-2 fw-bold" disabled={loading}>
                                {loading ? "Saving..." : "Save Changes"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Sub-Components (Keep the main component clean) ---

const ProfileImage = ({ preview, currentPath, username, host }) => {
    const src = preview || (currentPath ? `${host}${currentPath}` : `https://ui-avatars.com/api/?name=${username || 'User'}&background=random`);
    return (
        <img
            src={src}
            className="rounded-circle mb-3 shadow-sm border border-3 border-light"
            style={{ width: '130px', height: '130px', objectFit: 'cover' }}
            alt="Profile"
        />
    );
};

const ReadOnlyInput = ({ label, value }) => (
    <div className="mb-3">
        <label className="form-label fw-semibold">{label}</label>
        <input type="text" className="form-control bg-light" value={value || ''} disabled />
    </div>
);

export default Settings;