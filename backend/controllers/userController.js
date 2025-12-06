const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user (Customer or potential Admin)
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, phone, password } = req.body;

    // 1. Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists with this email address.');
    }

    // 2. Create the new user
    const user = await User.create({
        name,
        email,
        phone,
        password, // The userModel 'pre-save' hook will hash this
        isAdmin: false // Default to regular customer
    });

    if (user) {
        // 3. Generate JWT and set cookie
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data received.');
    }
});

// @desc    Authenticate user & get token (Login)
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await User.findOne({ email });

    if (!user) {
        console.log(`Login failed: User not found for email ${email}`);
    }

    // 2. Check password
    if (user && (await user.matchPassword(password))) {
        // 3. Generate JWT and set cookie
        console.log(`Login successful for user: ${user.email}`);
        generateToken(res, user._id);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        console.log(`Login failed: Invalid password for user ${email}`);
        res.status(401); // Unauthorized
        throw new Error('Invalid email or password.');
    }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0), // Set cookie to expire immediately
    });
    res.status(200).json({ message: 'User logged out successfully' });
};


// @desc    Get user profile (Used after login or to check session)
// @route   GET /api/users/profile
// @access  Private (Requires authentication)
const getUserProfile = asyncHandler(async (req, res) => {
    // We will get the user ID from the protected route middleware (req.user)
    const user = await User.findById(req.user._id).select('-password'); // Exclude password

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found.');
    }
});


module.exports = {
    registerUser,
    authUser,
    logoutUser,
    getUserProfile,
};