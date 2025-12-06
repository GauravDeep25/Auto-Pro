import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';
// useNavigate is removed as it caused issues in a provider context before.

// 1. Create the Context
export const AuthContext = createContext();

// Default user state (loaded from sessionStorage if available)
const storedUser = JSON.parse(sessionStorage.getItem('userInfo'));

// 2. Provider Component
export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(storedUser || null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Set the base URL for the backend API
    const API_URL = `${API_BASE_URL}/api/users`;

    // Set credentials globally for Axios to send cookies
    axios.defaults.withCredentials = true;

    // --- Core Authentication Functions ---

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const { data } = await axios.post(`${API_URL}/login`, { email, password });
            
            // Save user data to state and session storage
            setUserInfo(data);
            sessionStorage.setItem('userInfo', JSON.stringify(data));
            setIsLoading(false);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Check server connection or credentials.');
            setIsLoading(false);
            throw err;
        }
    };

    const register = async (name, email, phone, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const { data } = await axios.post(`${API_URL}/register`, { name, email, phone, password });
            
            // Log in the user immediately after successful registration
            setUserInfo(data);
            sessionStorage.setItem('userInfo', JSON.stringify(data));
            setIsLoading(false);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed.');
            setIsLoading(false);
            throw err;
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await axios.post(`${API_URL}/logout`);
            
            // Clear user data from state and session storage
            setUserInfo(null);
            sessionStorage.removeItem('userInfo');
        } catch (err) {
            console.error("Logout process error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // --- State Check on Load (to verify session/cookie) ---
    useEffect(() => {
        const verifySession = async () => {
            if (storedUser) {
                try {
                    // Check if the cookie is still valid
                    const { data } = await axios.get(`${API_URL}/profile`); 
                    setUserInfo(data); // Refresh user info
                } catch (err) {
                    console.warn("Session expired, logging out client.");
                    setUserInfo(null);
                    sessionStorage.removeItem('userInfo');
                }
            }
            setIsLoading(false);
        };
        
        verifySession();
    }, []);

    // 3. Define the context value
    const contextValue = {
        userInfo,
        isLoading,
        error,
        login,
        register,
        logout,
        isAdmin: userInfo?.isAdmin || false,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};