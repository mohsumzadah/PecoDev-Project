import client from "./api"; // Import your standardized axios instance

// Fetch all products (General shop)
export const getAllProducts = () => client.get('/products');

// Fetch by category (FiveM or Minecraft)
// This matches your @GetMapping("/category/{cat}")
export const getProductsByCategory = (category) => client.get(`/products/category/${category}`);

// Fetch single product details
export const getProductById = (id) => client.get(`/products/${id}`);

// Admin only: Add a new product
export const createProduct = (productData) => client.post('/products', productData);

export const deleteProduct = (id) => client.delete(`/products/${id}`);

export const updateProduct = (id, data) => client.put(`/products/${id}`, data);