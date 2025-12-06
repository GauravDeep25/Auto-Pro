const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const asyncHandler = require('express-async-handler');
const connectDB = require('./config/db');

// Import Routes
const productRoutes = require('./routes/productRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const userRoutes = require('./routes/userRoutes');

// Load env vars
dotenv.config();

// Connect to database (don't await - let it connect in background)
connectDB().catch(err => console.error('MongoDB connection error:', err));

const app = express();

// Middleware Setup
app.use(express.json());
app.use(cookieParser());

// CORS Configuration
app.use(cors({
    origin: (origin, callback) => {
        // Allow all origins
        callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware to check/establish DB connection
app.use(async (req, res, next) => {
    const mongoose = require('mongoose');
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    if (mongoose.connection.readyState !== 1) {
        try {
            await connectDB();
        } catch (error) {
            console.error('Database connection failed in middleware:', error);
            return res.status(503).json({ message: 'Database not connected' });
        }
    }
    next();
});

// Basic Route
app.get('/', (req, res) => {
    res.send('Auto Pro API is running...');
});

// Ignore favicon requests
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.get('/api', (req, res) => {
    res.send('Auto Pro API is running...');
});

// Route Definitions
app.use('/api/products', productRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);

// Error Handler
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

module.exports = app;
