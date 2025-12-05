const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

/**
 * Middleware to protect routes: verifies JWT token in cookie.
 * If valid, attaches user details to req.user
 */
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // 1. Read JWT from the cookie
    token = req.cookies.jwt;

    if (token) {
        try {
            // 2. Verify token and extract userId
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // 3. Find user by ID and attach to request object (excluding password)
            req.user = await User.findById(decoded.userId).select('-password');

            if (!req.user) {
                res.status(401);
                throw new Error('Not authorized, user not found');
            }
            
            // Proceed to the next middleware or controller function
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

/**
 * Middleware to check if user is an admin.
 * Must be used after protect middleware.
 */
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403);
        throw new Error('Not authorized as an admin');
    }
};

module.exports = { protect, admin };