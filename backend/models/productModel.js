const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Links to the Admin who created the product
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String, // URL to image
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['E-Rickshaw', 'Spare Part', 'Accessory'] 
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
    // Optional: Technical specs (e.g., "Battery: 48V" or "Tyre Size: 12inch")
    specs: [{
        key: String,
        value: String
    }]
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;