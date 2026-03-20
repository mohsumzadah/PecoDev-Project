import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = (userData) => {
        // userData contains { token, username, role }
        setUser(userData);

        // 1. Save the whole object for the UI
        localStorage.setItem("user", JSON.stringify(userData));

        // 2. SAVE THE TOKEN SEPARATELY (So your Axios Interceptor can find it!)
        localStorage.setItem("token", userData.token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token"); // Clean up
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};