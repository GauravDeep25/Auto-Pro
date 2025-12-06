const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// Import custom error handler utility (needed for asyncHandler in controllers)
const asyncHandler = require('express-async-handler'); 
const connectDB = require('./config/db');

// Import Routes
const productRoutes = require('./routes/productRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const userRoutes = require('./routes/userRoutes'); // New: User/Auth routes

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware Setup
app.use(express.json()); // Body parser
app.use(cookieParser()); // Cookie parser for Auth

// CORS Configuration (Allowing frontend communication)
app.use(cors({
    origin: [
        'http://localhost:3000', 
        'http://localhost:3001',
        'http://10.50.24.177:3000',
        process.env.FRONTEND_URL || 'https://auto-pro-frontend.vercel.app'
    ],
    credentials: true 
}));

// Basic Route for testing
app.get('/', (req, res) => {
    res.send('Auto Pro API is running...');
});

// Route Definitions
app.use('/api/products', productRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes); // User/Auth routes are now linked here

// Generic Error Handler (Catches errors thrown by asyncHandler in controllers)
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});