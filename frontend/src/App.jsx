import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Tailwind CSS utility classes are assumed to be available

// --- Page Imports ---
import HomePage from './pages/HomePage'; 
import SalesPage from './pages/SalesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AppointmentPage from './pages/AppointmentPage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';

// --- Component Imports ---
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute'; 

// --- Theme Logic ---
// This hook encapsulates the theme state management (dark mode persistence)
const useTheme = () => {
    const [isDark, setIsDark] = useState(() => {
        // Default to dark mode
        const storedTheme = sessionStorage.getItem('color-theme');
        
        // If there's no stored preference, set it to dark and add dark class immediately
        if (!storedTheme) {
            sessionStorage.setItem('color-theme', 'dark');
            document.documentElement.classList.add('dark');
            return true;
        }
        
        const isDarkMode = storedTheme === 'dark';
        // Use stored preference
        return isDarkMode;
    });

    useEffect(() => {
        // Apply the theme class on mount based on initial state
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        if (newIsDark) {
            document.documentElement.classList.add('dark');
            sessionStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            sessionStorage.setItem('color-theme', 'light');
        }
    };

    return { isDark, toggleTheme };
};

// --- Main Application Component ---
const App = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <AuthProvider>
            <Router>
                {/* Navbar is fixed and receives theme props */}
                <Navbar isDark={isDark} toggleTheme={toggleTheme} /> 
                
                {/* Main Content Area */}
                <main className="min-h-screen bg-neutral-50 dark:bg-black transition-colors duration-300 pt-20">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/sales" element={<SalesPage />} />
                        <Route path="/parts" element={<SalesPage isParts={true} />} /> {/* Uses same component, toggled by prop */}
                        <Route path="/about" element={<AboutPage />} /> 
                        <Route path="/contact" element={<ContactPage />} /> 
                        <Route path="/login" element={<LoginPage />} />

                        {/* Private Routes for Logged-In Users (e.g., booking) */}
                        <Route path='' element={<PrivateRoute />}>
                            <Route path="/appointment" element={<AppointmentPage />} />
                        </Route>

                        {/* Private Routes for Administrators */}
                        <Route path='' element={<PrivateRoute adminOnly={true} />}>
                            <Route path="/admin" element={<AdminDashboard />} /> 
                        </Route>
                        
                        {/* Fallback Route */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </main>

                <Footer />
            </Router>
        </AuthProvider>
    );
};

export default App;