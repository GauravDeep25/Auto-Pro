import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import { Briefcase, Calendar, Package, User, Wrench, Check, X, Loader, Tag, Trash2, Edit } from 'lucide-react';
import { TableRowSkeleton, PageLoader } from '../components/LoadingSkeleton';
import API_BASE_URL from '../config/api';

const AdminDashboard = () => {
    const { userInfo } = useAuth(); // isAdmin is guaranteed true by PrivateRoute
    const [appointments, setAppointments] = useState([]);
    const [products, setProducts] = useState([]);
    const [loadingAppointments, setLoadingAppointments] = useState(true);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [activeTab, setActiveTab] = useState('appointments');

    // URLs for API endpoints
    const APPOINTMENT_API = `${API_BASE_URL}/api/appointments`;
    const PRODUCT_API = `${API_BASE_URL}/api/products`;

    useEffect(() => {
        // Fetch data when component mounts or activeTab changes
        if (activeTab === 'appointments') {
            fetchAppointments();
        } else if (activeTab === 'inventory') {
            fetchProducts();
        }
    }, [activeTab]);

    const fetchAppointments = async () => {
        setLoadingAppointments(true);
        try {
            // Protected Admin Route (fetches all appointments)
            const { data } = await axios.get(APPOINTMENT_API);
            setAppointments(data);
        } catch (err) {
            console.error('Failed to fetch appointments:', err);
            setAppointments([]);
        } finally {
            setLoadingAppointments(false);
        }
    };

    const fetchProducts = async () => {
        setLoadingProducts(true);
        try {
            // Protected Admin Route (fetches all products)
            const { data } = await axios.get(PRODUCT_API);
            setProducts(data);
        } catch (err) {
            console.error('Failed to fetch products:', err);
            setProducts([]);
        } finally {
            setLoadingProducts(false);
        }
    };

    const handleUpdateAppointment = async (id, newStatus) => {
        // We use window.confirm here because this is an administrative action in a controlled environment.
        if (!window.confirm(`Are you sure you want to mark this appointment as ${newStatus}?`)) return;
        try {
            await axios.put(`${APPOINTMENT_API}/${id}/status`, { status: newStatus });
            // Refetch to update the list immediately
            fetchAppointments();
        } catch (err) {
            console.error(`Failed to update appointment status to ${newStatus}:`, err);
            alert('Failed to update status. Check server logs.');
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm("Are you sure you want to permanently delete this product?")) return;
        try {
            await axios.delete(`${PRODUCT_API}/${id}`);
            // Remove from state
            setProducts(products.filter(p => p._id !== id));
        } catch (err) {
            console.error('Failed to delete product:', err);
            alert('Failed to delete product. Check server logs.');
        }
    };

    // Helper for status colors
    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'Approved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'Completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            case 'Cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-900/30 dark:text-neutral-400';
        }
    };

    // Helper for Product Stock color
    const getStockColor = (count) => {
        if (count > 10) return 'text-green-600 dark:text-green-400';
        if (count > 0) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-red-600 dark:text-red-400';
    }


    return (
        <div className="pt-20 dark:bg-black min-h-screen p-8">
            <div className="max-w-7xl mx-auto py-12">
                <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-2 flex items-center">
                    <Briefcase className="w-8 h-8 mr-3 text-orange-600" /> Auto Pro Admin Dashboard
                </h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-10">
                    Welcome, {userInfo?.name}! Manage all garage operations from this panel.
                </p>

                {/* Tab Navigation */}
                <div className="border-b border-neutral-200 dark:border-neutral-800 mb-8">
                    <div className="flex space-x-4">
                        <TabButton
                            Icon={Calendar}
                            name="Appointments"
                            active={activeTab === 'appointments'}
                            onClick={() => setActiveTab('appointments')}
                        />
                        <TabButton
                            Icon={Package}
                            name="Inventory & Pricing"
                            active={activeTab === 'inventory'}
                            onClick={() => setActiveTab('inventory')}
                        />
                        <TabButton
                            Icon={User}
                            name="User & Settings"
                            active={activeTab === 'settings'}
                            onClick={() => setActiveTab('settings')}
                        />
                    </div>
                </div>

                {/* Tab Content */}
                <div className="dashboard-content-container">
                    {activeTab === 'appointments' && (
                        <AppointmentManager
                            appointments={appointments}
                            isLoading={loadingAppointments}
                            getStatusColor={getStatusColor}
                            handleUpdateAppointment={handleUpdateAppointment}
                        />
                    )}

                    {activeTab === 'inventory' && (
                        <InventoryManager
                            products={products}
                            isLoading={loadingProducts}
                            getStockColor={getStockColor}
                            fetchProducts={fetchProducts}
                            handleDeleteProduct={handleDeleteProduct}
                            PRODUCT_API={PRODUCT_API}
                        />
                    )}

                    {activeTab === 'settings' && (
                        <div className='p-6 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800'>
                            <h3 className="text-2xl font-semibold dark:text-white mb-4 flex items-center"><User className='w-5 h-5 mr-2' /> User Management</h3>
                            <p className='text-neutral-600 dark:text-neutral-400'>
                                This is the administrative area for managing users and global settings.
                            </p>
                            <p className='mt-4 text-sm text-red-500'>Note: User management and settings features will be rolled out soon.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

// --- Sub-Components ---

const TabButton = ({ Icon, name, active, onClick }) => (
    <button
        onClick={onClick}
        className={`py-2 px-4 text-sm font-semibold rounded-t-lg transition-colors flex items-center ${active
                ? 'border-b-2 border-orange-600 text-orange-600 dark:text-white dark:border-white'
                : 'text-neutral-500 hover:text-orange-600 dark:text-neutral-400 dark:hover:text-orange-500'
            }`}
    >
        <Icon className='w-4 h-4 mr-2' /> {name}
    </button>
);


const AppointmentManager = ({ appointments, isLoading, getStatusColor, handleUpdateAppointment }) => (
    <div className='bg-white dark:bg-neutral-900 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-800 p-6'>
        <h3 className="text-2xl font-semibold dark:text-white mb-4 flex items-center fade-in-down"><Calendar className='w-5 h-5 mr-2' /> Pending Appointments</h3>

        {isLoading ? (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
                    <thead className="bg-neutral-50 dark:bg-neutral-800">
                        <tr>
                            <TableHeader>Customer</TableHeader>
                            <TableHeader>Vehicle/Service</TableHeader>
                            <TableHeader>Date/Time</TableHeader>
                            <TableHeader>Status</TableHeader>
                            <TableHeader>Actions</TableHeader>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                        {[...Array(5)].map((_, i) => <TableRowSkeleton key={i} />)}
                    </tbody>
                </table>
            </div>
        ) : appointments.length === 0 ? (
            <p className='text-neutral-500 dark:text-neutral-400 fade-in'>No pending appointments found.</p>
        ) : (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
                    <thead className="bg-neutral-50 dark:bg-neutral-800">
                        <tr>
                            <TableHeader>Customer</TableHeader>
                            <TableHeader>Vehicle/Service</TableHeader>
                            <TableHeader>Date/Time</TableHeader>
                            <TableHeader>Status</TableHeader>
                            <TableHeader>Actions</TableHeader>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                        {appointments.map(app => (
                            <tr key={app._id} className='hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors'>
                                <TableData>
                                    <p className='font-medium text-neutral-900 dark:text-white'>{app.user?.name || 'Unknown User'}</p>
                                    <p className='text-sm text-neutral-500 dark:text-neutral-400'>{app.user?.phone || 'N/A'}</p>
                                </TableData>
                                <TableData>
                                    <p className='font-medium'>{app.vehicleType}</p>
                                    <p className='text-sm text-neutral-500 dark:text-neutral-400'>{app.serviceType}</p>
                                    {app.notes && <p className='text-xs italic text-neutral-400 dark:text-neutral-500 line-clamp-1'>"{app.notes}"</p>}
                                </TableData>
                                <TableData>
                                    <p>{new Date(app.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                                    <p className='text-sm font-medium text-orange-600'>{app.timeSlot}</p>
                                </TableData>
                                <TableData>
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(app.status)}`}>
                                        {app.status}
                                    </span>
                                </TableData>
                                <TableData>
                                    {app.status === 'Pending' && (
                                        <div className='flex space-x-2'>
                                            <ActionButton onClick={() => handleUpdateAppointment(app._id, 'Approved')} Icon={Check} color='green'>Approve</ActionButton>
                                            <ActionButton onClick={() => handleUpdateAppointment(app._id, 'Cancelled')} Icon={X} color='red'>Cancel</ActionButton>
                                        </div>
                                    )}
                                    {app.status === 'Approved' && (
                                        <ActionButton onClick={() => handleUpdateAppointment(app._id, 'Completed')} Icon={Wrench} color='blue'>Mark Done</ActionButton>
                                    )}
                                    {(app.status === 'Completed' || app.status === 'Cancelled') && (
                                        <span className='text-neutral-500 text-xs'>Finalized</span>
                                    )}
                                </TableData>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </div>
);


const InventoryManager = ({ products, isLoading, getStockColor, fetchProducts, handleDeleteProduct, PRODUCT_API }) => {
    const [editingId, setEditingId] = useState(null);
    const [editPrice, setEditPrice] = useState('');
    const [editStock, setEditStock] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [newProductData, setNewProductData] = useState({ name: '', price: 0, countInStock: 0, category: 'Spare Part', image: '/images/placeholder.jpg', description: '' });

    const handleEditStart = (product) => {
        setEditingId(product._id);
        setEditPrice(product.price);
        setEditStock(product.countInStock);
    };

    const handleEditSave = async (product) => {
        try {
            const updatedProduct = {
                ...product,
                price: parseFloat(editPrice),
                countInStock: parseInt(editStock, 10),
            };

            await axios.put(`${PRODUCT_API}/${product._id}`, updatedProduct);
            setEditingId(null);
            fetchProducts(); // Refresh list
        } catch (err) {
            console.error('Failed to update product:', err);
            alert('Failed to update product. Ensure price/stock are numbers.');
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            // Sends the new product data. The backend controller (createProduct) handles setting the Admin user ID.
            await axios.post(PRODUCT_API, newProductData);
            setNewProductData({ name: '', price: 0, countInStock: 0, category: 'Spare Part', image: '/images/placeholder.jpg', description: '' });
            setIsAdding(false);
            fetchProducts();
        } catch (err) {
            console.error('Failed to add product:', err);
            alert('Failed to add product. Check server logs.');
        }
    };

    return (
        <div className='bg-white dark:bg-neutral-900 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-800 p-6'>
            <h3 className="text-2xl font-semibold dark:text-white mb-4 flex items-center fade-in-down"><Package className='w-5 h-5 mr-2' /> Inventory Management</h3>

            <div className="flex justify-between mb-4 fade-in-down stagger-1">
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="py-2 px-4 text-sm font-semibold bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all hover:scale-105 flex items-center"
                >
                    <Tag className='w-4 h-4 mr-2' /> {isAdding ? 'Cancel Add' : 'Add New Product'}
                </button>
                <button
                    onClick={fetchProducts}
                    className="py-2 px-4 text-sm font-semibold bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200 rounded-lg hover:bg-neutral-300 transition-all hover:scale-105 flex items-center"
                >
                    <Loader className='w-4 h-4 mr-2' /> Refresh
                </button>
            </div>

            {/* Add Product Form */}
            {isAdding && (
                <form onSubmit={handleAddProduct} className='p-4 mb-6 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                    <input
                        type="text"
                        placeholder='Product Name'
                        value={newProductData.name}
                        onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
                        required
                        className="input-field-edit sm:col-span-2"
                    />
                    <select
                        value={newProductData.category}
                        onChange={(e) => setNewProductData({ ...newProductData, category: e.target.value })}
                        className="input-field-edit"
                    >
                        <option value="E-Rickshaw">E-Rickshaw</option>
                        <option value="Spare Part">Spare Part</option>
                        <option value="Accessory">Accessory</option>
                    </select>
                    <input
                        type="number"
                        placeholder='Price (₹)'
                        value={newProductData.price}
                        onChange={(e) => setNewProductData({ ...newProductData, price: e.target.value })}
                        required
                        className="input-field-edit"
                    />
                    <input
                        type="number"
                        placeholder='Stock'
                        value={newProductData.countInStock}
                        onChange={(e) => setNewProductData({ ...newProductData, countInStock: e.target.value })}
                        required
                        className="input-field-edit sm:col-span-1"
                    />
                    <input
                        type="text"
                        placeholder='Description (50 chars)'
                        value={newProductData.description}
                        onChange={(e) => setNewProductData({ ...newProductData, description: e.target.value })}
                        required
                        className="input-field-edit sm:col-span-2 lg:col-span-3"
                    />
                    <button type="submit" className='sm:col-span-2 lg:col-span-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700'>
                        Confirm Add Product
                    </button>
                </form>
            )}


            {isLoading ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
                        <thead className="bg-neutral-50 dark:bg-neutral-800">
                            <tr>
                                <TableHeader>Product Name</TableHeader>
                                <TableHeader>Category</TableHeader>
                                <TableHeader>Price (₹)</TableHeader>
                                <TableHeader>Stock</TableHeader>
                                <TableHeader>Actions</TableHeader>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                            {[...Array(5)].map((_, i) => <TableRowSkeleton key={i} />)}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
                        <thead className="bg-neutral-50 dark:bg-neutral-800">
                            <tr>
                                <TableHeader>Product Name</TableHeader>
                                <TableHeader>Category</TableHeader>
                                <TableHeader>Price (₹)</TableHeader>
                                <TableHeader>Stock</TableHeader>
                                <TableHeader>Actions</TableHeader>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                            {products.map(p => (
                                <tr key={p._id} className='hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors'>
                                    <TableData>
                                        <p className='font-medium text-neutral-900 dark:text-white'>{p.name}</p>
                                        <p className='text-xs text-neutral-500 dark:text-neutral-400'>{p.description.substring(0, 50)}...</p>
                                    </TableData>
                                    <TableData>{p.category}</TableData>

                                    {/* Editable Price Field */}
                                    <TableData>
                                        {editingId === p._id ? (
                                            <input
                                                type="number"
                                                value={editPrice}
                                                onChange={(e) => setEditPrice(e.target.value)}
                                                className="input-field-edit w-24"
                                            />
                                        ) : (
                                            p.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })
                                        )}
                                    </TableData>

                                    {/* Editable Stock Field */}
                                    <TableData>
                                        {editingId === p._id ? (
                                            <input
                                                type="number"
                                                value={editStock}
                                                onChange={(e) => setEditStock(e.target.value)}
                                                className="input-field-edit w-16"
                                            />
                                        ) : (
                                            <span className={getStockColor(p.countInStock)}>{p.countInStock}</span>
                                        )}
                                    </TableData>

                                    {/* Action Buttons */}
                                    <TableData>
                                        {editingId === p._id ? (
                                            <div className='flex space-x-2'>
                                                <ActionButton onClick={() => handleEditSave(p)} Icon={Check} color='green'>Save</ActionButton>
                                                <ActionButton onClick={() => setEditingId(null)} Icon={X} color='red'>Cancel</ActionButton>
                                            </div>
                                        ) : (
                                            <div className='flex space-x-2'>
                                                <ActionButton onClick={() => handleEditStart(p)} Icon={Edit} color='orange'>Edit</ActionButton>
                                                <ActionButton onClick={() => handleDeleteProduct(p._id)} Icon={Trash2} color='red'>Delete</ActionButton>
                                            </div>
                                        )}
                                    </TableData>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

// --- Reusable Table Components ---

const TableHeader = ({ children }) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">{children}</th>
);

const TableData = ({ children }) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-300">{children}</td>
);

const ActionButton = ({ onClick, Icon, children, color }) => {
    const baseClasses = "text-xs font-semibold py-1 px-2 rounded transition-colors flex items-center";
    const colorClasses = {
        green: 'bg-green-500 hover:bg-green-600 text-white',
        red: 'bg-red-500 hover:bg-red-600 text-white',
        blue: 'bg-blue-500 hover:bg-blue-600 text-white',
        orange: 'bg-orange-600 hover:bg-orange-700 text-white',
    }[color] || 'bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-800 dark:text-white';

    return (
        <button onClick={onClick} className={`${baseClasses} ${colorClasses}`}>
            <Icon className='w-3 h-3 mr-1' /> {children}
        </button>
    );
};

export default AdminDashboard;