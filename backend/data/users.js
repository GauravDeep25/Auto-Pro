const bcrypt = require('bcryptjs');

// We need to hash passwords manually for the seeder
// The password for everyone will be "123456"
const users = [
    {
        name: 'Admin User',
        email: 'admin@autopro.com',
        phone: '9876543210',
        password: '123456',
        isAdmin: true,
    },
    {
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        phone: '9988776655',
        password: '123456',
        isAdmin: false,
    },
    {
        name: 'Amit Singh',
        email: 'amit@example.com',
        phone: '9123456789',
        password: '123456',
        isAdmin: false,
    },
    {
        name: 'Gaurav',
        email: 'gauravdeepgd12007@gmail.com',
        phone: '9304505204',
        password: '123456',
        isAdmin: true,
    }
];

module.exports = users;