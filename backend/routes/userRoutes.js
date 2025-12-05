const express = require('express');
const router = express.Router();
const { 
    registerUser, 
    authUser, 
    logoutUser,
    getUserProfile
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // We will create this next

// Public routes (no authentication needed)
router.post('/login', authUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);

// Private routes (authentication required)
router.route('/profile').get(protect, getUserProfile);

module.exports = router;