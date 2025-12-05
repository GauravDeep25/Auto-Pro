const express = require('express');
const router = express.Router();
const { 
    getProducts, 
    getProductById, 
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public access routes
router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct); // Admin only

router.route('/category/:category')
    .get(getProductsByCategory); // Used for Sales Page and Spare Parts Page

router.route('/:id')
    .get(getProductById) // Used for single product detail page
    .put(protect, admin, updateProduct) // Admin only
    .delete(protect, admin, deleteProduct); // Admin only

module.exports = router;