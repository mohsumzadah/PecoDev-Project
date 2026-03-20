// src/api/client.js
import axios from 'axios';
import { API_BASE_URL } from "../config";

const client = axios.create({
    baseURL: `${API_BASE_URL}/api`,
});

// Senior Tip: Automatically add the token to EVERY request
client.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {

        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default client;