const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const users = require('./data/users');
const products = require('./data/products');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Appointment = require('./models/appointmentModel');
const connectDB = require('./config/db');

dotenv.config();

const importData = async () => {
    try {
        // FIX: We must await the connection before doing any DB operations
        await connectDB();

        console.log('Database Connected. Starting data import...');

        // 1. Clear existing data
        await Appointment.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // 2. Hash passwords and insert Users
        const usersWithHashedPasswords = await Promise.all(
            users.map(async (user) => {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(user.password, salt);
                return { ...user, password: hashedPassword };
            })
        );
        
        const createdUsers = await User.insertMany(usersWithHashedPasswords);
        
        // 3. Get the Admin User's ID (The first user in our users.js file is Admin)
        const adminUser = createdUsers[0]._id;

        // 4. Assign the Admin as the owner of all products
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        // 5. Insert Products
        await Product.insertMany(sampleProducts);

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        // FIX: Await connection here as well
        await connectDB();

        await Appointment.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}