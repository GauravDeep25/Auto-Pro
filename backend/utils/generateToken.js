const jwt = require('jsonwebtoken');

/**
 * Generates a JWT and sets it as an HttpOnly cookie
 * @param {object} res - Express response object
 * @param {string} userId - ID of the authenticated user
 */
const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expires in 30 days
    });

    // Set JWT as HttpOnly cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
        sameSite: 'strict', // Prevents CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
};

module.exports = generateToken;