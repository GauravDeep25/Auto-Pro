import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DollarSign, Truck, Loader, Tag, Info, BatteryCharging, Wrench, PackageSearch } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductGridSkeleton } from '../components/LoadingSkeleton';

const SalesPage = ({ isParts = false }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Determine category based on prop
    // E-Rickshaw for /sales, Spare Part for /parts
    const category = isParts ? 'Spare Part' : 'E-Rickshaw';
    const API_URL = `/api/products/category/${category}`;

    const title = isParts ? 'Genuine Spare Parts Inventory' : 'E-Rickshaw Sales & Models';
    const subtitle = isParts ? 'Find certified components for your two-wheeler or e-rickshaw, available for purchase at our garage.' : 'Browse our latest passenger and cargo E-Rickshaw models.';
    const itemType = isParts ? 'Part' : 'Vehicle';

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Fetch data from the public product endpoint
                const { data } = await axios.get(API_URL);
                setProducts(data);
            } catch (err) {
                setError(`Failed to fetch ${itemType} inventory. Ensure backend is running and data is seeded.`);
                console.error(err);
                setProducts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [isParts, API_URL, itemType]);

    return (
        <div className="pt-20 dark:bg-black min-h-screen p-8">
            <div className="max-w-7xl mx-auto py-10">
                <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-2 fade-in-down">{title}</h1>
                <p className="text-neutral-600 dark:text-neutral-400 mb-10 fade-in-down stagger-1">{subtitle}</p>

                {isLoading ? (
                    <ProductGridSkeleton count={6} />
                ) : error ? (
                    <div className="p-6 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg border border-red-300 dark:border-red-800 fade-in">
                        <p>{error}</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="p-10 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-center fade-in">
                        <PackageSearch className="w-10 h-10 mx-auto text-neutral-500 mb-3" />
                        <p className="text-neutral-600 dark:text-neutral-400">No {itemType}s currently in stock. Please check back later.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((product, index) => (
                            <ProductCard key={product._id} product={product} isParts={isParts} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const ProductCard = ({ product, isParts, index = 0 }) => {
    // Determine which specification to display prominently
    const getIconAndSpec = () => {
        const specs = product.specs || [];
        if (product.category === 'E-Rickshaw') {
            const bat = specs.find(s => s.key.includes('Battery'));
            return { icon: BatteryCharging, text: bat ? `${bat.key}: ${bat.value}` : 'No Battery Spec' };
        } else if (product.category === 'Spare Part') {
            const key = specs.find(s => s.key === 'Tyre Size' || s.key === 'Controller' || s.key === 'Battery');
            return { icon: Wrench, text: key ? `${key.key}: ${key.value}` : 'General Part Spec' };
        }
        return { icon: Info, text: 'See Details' };
    };
    
    const { icon: SpecIcon, text: specText } = getIconAndSpec();
    const staggerClass = `stagger-${Math.min(index % 5 + 1, 5)}`;

    return (
        <div className={`bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-100 dark:border-neutral-800 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 group scale-in ${staggerClass}`}>
            
            {/* Image Placeholder */}
            <div className="h-48 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center relative">
                {product.category === 'E-Rickshaw' ? 
                    <Truck className='w-12 h-12 text-neutral-500/50'/> : 
                    <Wrench className='w-12 h-12 text-neutral-500/50'/>}
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">{product.name}</h3>
                
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-xl font-extrabold text-orange-600 dark:text-orange-500">
                        <DollarSign className="w-5 h-5 mr-1" />{product.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                    </div>
                    <div className={`text-xs font-semibold px-3 py-1 rounded-full ${product.countInStock > 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'}`}>
                        {product.countInStock > 0 ? `${product.countInStock} In Stock` : 'Out of Stock'}
                    </div>
                </div>

                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-3">{product.description}</p>
                
                <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm mb-4 border-t pt-3 border-neutral-100 dark:border-neutral-800">
                    <SpecIcon className="w-4 h-4 mr-2" />
                    <span>{specText}</span>
                </div>

                {/* NOTE: No separate product detail page is planned, so this links to Contact */}
                <Link to="/contact" className="block w-full text-center py-2.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-white rounded-lg font-medium hover:bg-orange-600 hover:text-white transition-colors">
                    Inquire at Garage
                </Link>
            </div>
        </div>
    );
};

export default SalesPage;