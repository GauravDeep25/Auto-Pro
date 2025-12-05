import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Correct path relative to hooks folder

/**
 * Custom hook to easily access and use authentication state and functions.
 * @returns {object} AuthContext values (userInfo, login, logout, isAdmin, etc.)
 */
export const useAuth = () => {
    // Check if the component is wrapped in AuthProvider
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};