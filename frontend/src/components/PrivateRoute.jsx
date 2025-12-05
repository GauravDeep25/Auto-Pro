import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Loader } from 'lucide-react';

/**
 * Secures a route, redirecting non-logged-in users to the login page.
 * @param {boolean} adminOnly - If true, restricts access to only administrators.
 */
const PrivateRoute = ({ adminOnly = false }) => {
    const { userInfo, isLoading, isAdmin } = useAuth();

    if (isLoading) {
        // Render a loading state while authentication status is being determined
        return (
            <div className="flex justify-center items-center min-h-[50vh] dark:text-white">
                <Loader className="w-10 h-10 animate-spin text-orange-600" />
                <p className="ml-4">Checking session...</p>
            </div>
        );
    }

    // 1. Check if user is logged in
    if (!userInfo) {
        // User not logged in, redirect to login page
        return <Navigate to="/login" replace />;
    }

    // 2. If adminOnly is required, check admin status
    if (adminOnly && !isAdmin) {
        // Logged-in user is not an admin, redirect to homepage
        return <Navigate to="/" replace />;
    }

    // If checks pass, render the child route content (<Outlet /> renders the nested route element)
    return <Outlet />;
};

export default PrivateRoute;