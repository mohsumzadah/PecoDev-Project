import React, { useState } from "react";

const ContactPage = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message sent! (This is just a demo.)");
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <div className="container my-5">
            <h1 className="mb-4 text-center">Contact Us</h1>

            <div className="row">
                {/* Left: Contact Info */}
                <div className="col-md-5 mb-4">
                    <div className="p-4 shadow-sm rounded bg-light h-100">
                        <h4>Get in touch</h4>
                        <p className="text-muted">
                            Have questions about our scripts or plugins?
                            <br />
                            <br />
                            Do you have a new idea that we can make?

                            <br />
                            <br />
                            Send us a message!
                        </p>
                        <ul className="list-unstyled mt-3">
                            <li className="mb-2">
                                <i className="bi bi-envelope me-2"></i> support@pecodev.com
                            </li>
                            {/* <li className="mb-2">
                                <i className="bi bi-telephone me-2"></i> +1 234 567 890
                            </li>
                            <li className="mb-2">
                                <i className="bi bi-geo-alt me-2"></i> 123 Dev Street, City
                            </li> */}
                        </ul>
                    </div>
                </div>

                {/* Right: Contact Form */}
                <div className="col-md-7">
                    <div className="p-4 shadow-sm rounded bg-white h-100">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">
                                    Message
                                </label>
                                <textarea
                                    className="form-control"
                                    id="message"
                                    name="message"
                                    rows="5"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;