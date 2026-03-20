import client from "./api"; // Your standardized axios instance

// Fetch all licenses for the logged-in user
export const getMyLicenses = () => client.get('/licenses/my-licenses');

// Issue new licenses for products in the cart
// Expects an object: { productIds: [1, 2, 3] }
export const issueLicenses = (licenseData) => client.post('/licenses/issue', licenseData);

// Fetch details for a specific license
export const getLicenseById = (id) => client.get(`/licenses/${id}`);