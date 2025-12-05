import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Power, Menu, X, Sun, Moon, Briefcase } from 'lucide-react';

const Navbar = ({ isDark, toggleTheme }) => {
    const { userInfo, logout, isLoading } = useAuth();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
        setMobileMenuOpen(false);
    };

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'E-Rickshaws', path: '/sales' },
        { name: 'Spare Parts', path: '/parts' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const closeMobileMenu = () => setMobileMenuOpen(false);

    if (isLoading) {
        // Simple loading state
        return (
            <nav className="fixed w-full z-50 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-all duration-300 h-20 flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-600"></div>
            </nav>
        );
    }

    return (
        <>
            <nav className="fixed w-full z-50 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 sm:h-20">
                        {/* Logo */}
                        <Link to="/" className="shrink-0 flex items-center gap-2 cursor-pointer" onClick={closeMobileMenu}>
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm sm:text-base">A</div>
                            <span className="font-bold text-lg sm:text-xl tracking-tight text-neutral-900 dark:text-white">Auto Pro</span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                            {navItems.map(item => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-white transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4">
                            {/* Admin Link (Desktop only) */}
                            {userInfo?.isAdmin && (
                                <Link
                                    to="/admin"
                                    className="text-sm font-medium text-orange-600 dark:text-orange-500 hover:underline hidden lg:flex items-center"
                                >
                                    <Briefcase className="w-5 h-5 inline mr-1" /> Admin Dashboard
                                </Link>
                            )}

                            {/* Theme Toggler */}
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900 transition-all focus:outline-none"
                                aria-label="Toggle theme"
                            >
                                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>

                            {/* Desktop Auth Button */}
                            <div className="hidden md:block">
                                {userInfo ? (
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 lg:px-5 py-2 lg:py-2.5 text-sm font-medium text-white bg-red-600 rounded-full hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
                                    >
                                        <Power className="w-4 h-4 inline mr-1" /> Logout
                                    </button>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="px-4 lg:px-5 py-2 lg:py-2.5 text-sm font-medium text-white bg-orange-600 rounded-full hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20"
                                    >
                                        Login / Register
                                    </Link>
                                )}
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                className="md:hidden p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label="Toggle mobile menu"
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6 transition-transform duration-300 rotate-90" /> : <Menu className="w-6 h-6 transition-transform duration-300" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Drawer */}
                <div className={`md:hidden bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 transition-all duration-300 ease-in-out overflow-hidden ${mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 border-t-0'}`}>
                    <div className="px-4 pt-2 pb-4 space-y-1">
                        {navItems.map(item => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={closeMobileMenu}
                                className="block px-3 py-2 rounded-lg text-base font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-orange-600 transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* Admin Link (Mobile) */}
                        {userInfo?.isAdmin && (
                            <Link
                                to="/admin"
                                onClick={closeMobileMenu}
                                className="block px-3 py-2 rounded-lg text-base font-medium text-orange-600 dark:text-orange-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                            >
                                <Briefcase className="w-5 h-5 inline mr-2" /> Admin Dashboard
                            </Link>
                        )}

                        {/* Mobile Auth Button */}
                        <div className="pt-2">
                            {userInfo ? (
                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all"
                                >
                                    <Power className="w-4 h-4 inline mr-1" /> Logout
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={closeMobileMenu}
                                    className="block text-center px-4 py-2.5 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-all"
                                >
                                    Login / Register
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;