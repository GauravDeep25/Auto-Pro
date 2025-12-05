const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    // Allows filtering by keywords, mainly for future search feature
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i',
        },
    } : {};
    
    const products = await Product.find({ ...keyword });
    res.json(products);
});

// @desc    Fetch a single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Fetch products by category (E-Rickshaw or Spare Part)
// @route   GET /api/products/category/:category
// @access  Public
const getProductsByCategory = asyncHandler(async (req, res) => {
    const category = req.params.category;
    const products = await Product.find({ category: category });
    
    if (products.length > 0) {
        res.json(products);
    } else {
        res.status(404);
        throw new Error(`No products found in category: ${category}`);
    }
});

// ******************************************************
// ADMIN ROUTES
// ******************************************************

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    // Uses default mock data for quick creation via Admin Panel
    const product = new Product({
        name: 'Sample Name',
        price: 0,
        user: req.user._id, // Set the logged-in admin as the user
        image: '/images/sample.jpg', 
        category: 'Spare Part', 
        countInStock: 0,
        description: 'Sample description for a new product',
        specs: []
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});


// @desc    Update a product (e.g., changing price or stock)
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { 
        name, 
        price, 
        description, 
        image, 
        category, 
        countInStock,
        specs
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.price = price !== undefined ? price : product.price;
        product.description = description || product.description;
        product.image = image || product.image;
        product.category = category || product.category;
        product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
        product.specs = specs !== undefined ? specs : product.specs;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});


// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({ _id: product._id });
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

module.exports = { 
    getProducts, 
    getProductById,
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct
};