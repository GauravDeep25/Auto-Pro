import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogIn, UserPlus, Phone, Mail, Lock, User, Loader } from 'lucide-react';

const LoginPage = () => {
    // Access authentication state and functions from context
    const { userInfo, login, register, isLoading: authLoading, error: authError, isAdmin } = useAuth();
    const navigate = useNavigate();

    // State for form data and UI mode
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
    const [localError, setLocalError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Redirect if user is already logged in
    useEffect(() => {
        if (userInfo) {
            // Redirect admin to dashboard, users to home
            navigate(isAdmin ? '/admin' : '/');
        }
    }, [userInfo, navigate, isAdmin]);

    useEffect(() => {
        // Synchronize context error with local display
        if (authError) {
            setLocalError(authError);
        } else {
            setLocalError('');
        }
    }, [authError, isLoginMode]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setLocalError(''); // Clear error on change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setLocalError('');

        try {
            if (isLoginMode) {
                // LOGIN
                await login(formData.email, formData.password);
            } else {
                // REGISTER
                if (formData.password.length < 6) {
                    setLocalError('Password must be at least 6 characters long.');
                    setIsLoading(false);
                    return;
                }
                // Validation for 10-digit Indian phone number
                if (!/^\d{10}$/.test(formData.phone)) {
                    setLocalError('Please enter a valid 10-digit Indian phone number.');
                    setIsLoading(false);
                    return;
                }
                await register(formData.name, formData.email, formData.phone, formData.password);
            }
        } catch (err) {
            // Error handled by AuthContext (set to authError)
        } finally {
            setIsLoading(false);
        }
    };

    if (userInfo || isLoading) return null; // Wait for redirect or final load

    return (
        <div className="login-page-container">
            <div className="auth-card scale-in">
                
                <div className="auth-toggle-buttons fade-in-down">
                    <button 
                        onClick={() => setIsLoginMode(true)}
                        className={`auth-toggle-btn ${isLoginMode ? 'active' : ''}`}
                    >
                        <LogIn className="w-4 h-4 inline mr-2" /> Log In
                    </button>
                    <button
                        onClick={() => setIsLoginMode(false)}
                        className={`auth-toggle-btn ${!isLoginMode ? 'active' : ''}`}
                    >
                        <UserPlus className="w-4 h-4 inline mr-2" /> Register
                    </button>
                </div>

                <h2 className="auth-title fade-in-up stagger-1">
                    {isLoginMode ? 'Welcome Back' : 'Create Your Account'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4 fade-in-up stagger-2">
                    {!isLoginMode && (
                        <InputField 
                            Icon={User}
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    )}

                    <InputField 
                        Icon={Mail}
                        type="email"
                        name="email"
                        placeholder="Email Address (e.g., admin@autopro.com)"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <InputField 
                        Icon={Lock}
                        type="password"
                        name="password"
                        placeholder="Password (Min 6 chars)"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    {!isLoginMode && (
                        <InputField 
                            Icon={Phone}
                            type="tel"
                            name="phone"
                            placeholder="Phone Number (10 digits, India)"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    )}

                    {localError && (
                        <div className="auth-error-message">
                            {localError}
                        </div>
                    )}

                    <button 
                        type="submit"
                        disabled={isLoading || authLoading}
                        className="auth-submit-btn"
                    >
                        {isLoading || authLoading ? (
                            <Loader className="w-5 h-5 animate-spin mr-2" />
                        ) : isLoginMode ? (
                            'Log In'
                        ) : (
                            'Register Account'
                        )}
                    </button>
                </form>

                <p className="auth-switch-text">
                    {isLoginMode ? "Need an account? " : "Already registered? "}
                    <button 
                        onClick={() => setIsLoginMode(!isLoginMode)}
                        className="auth-switch-btn"
                        disabled={isLoading || authLoading}
                    >
                        {isLoginMode ? 'Register Here' : 'Log In Here'}
                    </button>
                </p>
            </div>
        </div>
    );
};

// Reusable Input Field Component
const InputField = ({ Icon, type, name, placeholder, value, onChange, required }) => (
    <div className="relative">
        <Icon className="input-icon" />
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className="input-field"
        />
    </div>
);

export default LoginPage;