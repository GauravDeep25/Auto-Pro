const products = [
    // --- E-RICKSHAWS ---
    {
        name: 'Mayuri Pro 500',
        image: '/images/rickshaw1.jpg', // We will add images later
        description: 'Heavy duty E-Rickshaw with 100km mileage per charge. Best for city transport.',
        category: 'E-Rickshaw',
        price: 135000, // ₹1,35,000
        countInStock: 3,
        specs: [
            { key: 'Battery', value: '48V 100Ah' },
            { key: 'Motor', value: '1000W BLDC' }
        ]
    },
    {
        name: 'Saarthi Plus Deluxe',
        image: '/images/rickshaw2.jpg',
        description: 'Comfortable seating for 4 passengers with roof carrier and rain curtains.',
        category: 'E-Rickshaw',
        price: 142000,
        countInStock: 5,
        specs: [
            { key: 'Top Speed', value: '25 km/hr' },
            { key: 'Charging Time', value: '6-8 Hours' }
        ]
    },
    {
        name: 'Yatri Super Loader',
        image: '/images/loader.jpg',
        description: 'Cargo E-Rickshaw designed for heavy loads and delivery services.',
        category: 'E-Rickshaw',
        price: 155000,
        countInStock: 2,
        specs: [
            { key: 'Load Capacity', value: '400 kg' }
        ]
    },
    // --- SPARE PARTS ---
    {
        name: 'Exide E-Ride Battery',
        image: '/images/battery.jpg',
        description: 'Tubular battery specifically designed for E-Rickshaws. 12V.',
        category: 'Spare Part',
        price: 8500,
        countInStock: 20,
    },
    {
        name: 'Ceat Rickshaw Tyre (Set of 2)',
        image: '/images/tyre.jpg',
        description: 'Durable tyres with anti-skid grip for monsoon season.',
        category: 'Spare Part',
        price: 3200,
        countInStock: 50,
    },
    {
        name: 'BLDC Motor Controller 48V',
        image: '/images/controller.jpg',
        description: 'Universal controller unit for 1000W motors.',
        category: 'Spare Part',
        price: 4500,
        countInStock: 10,
    },
    {
        name: 'Hydraulic Shock Absorber',
        image: '/images/shocker.jpg',
        description: 'Front shocker set for smooth ride on rough roads.',
        category: 'Spare Part',
        price: 2800,
        countInStock: 15,
    },
    {
        name: 'LED Headlight Assembly',
        image: '/images/light.jpg',
        description: 'High brightness LED headlight with focus beam.',
        category: 'Accessory',
        price: 850,
        countInStock: 30,
    }
];

module.exports = products;