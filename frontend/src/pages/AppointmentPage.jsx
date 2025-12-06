import React, { useState } from 'react';
import axios from 'axios';
import { CalendarCheck, Wrench, Clock, AlertTriangle, Truck, Bike, Loader } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import API_BASE_URL from '../config/api';

const AppointmentPage = () => {
    // Access user info, guaranteed to be logged in by PrivateRoute
    const { userInfo } = useAuth(); 

    const [formData, setFormData] = useState({
        vehicleType: 'Motorcycle',
        serviceType: 'General Service',
        date: '',
        timeSlot: '10:00 AM - 12:00 PM',
        notes: ''
    });
    const [statusMessage, setStatusMessage] = useState({ type: null, text: '' });
    const [isLoading, setIsLoading] = useState(false);

    const timeSlots = [
        "9:00 AM - 10:00 AM", "10:00 AM - 12:00 PM", "12:00 PM - 2:00 PM", 
        "2:00 PM - 4:00 PM", "4:00 PM - 6:00 PM"
    ];

    const vehicleTypes = [
        "Scooty", "Motorcycle", "Sports/Premium Bike", "E-Rickshaw"
    ];

    const serviceTypes = [
        "General Service", "Repair", "Wash & Polish", "Battery Check", "Breakdown"
    ];
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getMinDate = () => {
        // Set minimum booking date to tomorrow
        const today = new Date();
        today.setDate(today.getDate() + 1);
        return today.toISOString().split('T')[0];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatusMessage({ type: null, text: '' });

        try {
            // Send booking data to the protected API endpoint
            const { data } = await axios.post(`${API_BASE_URL}/api/appointments`, formData);

            setStatusMessage({ type: 'success', text: data.message || 'Appointment confirmed! Waiting for Admin approval.' });
            
            // Reset form for next booking
            setFormData({ vehicleType: 'Motorcycle', serviceType: 'General Service', date: '', timeSlot: timeSlots[0], notes: '' });

        } catch (err) {
            const errorText = err.response?.data?.message || 'Booking failed. Please try again.';
            setStatusMessage({ type: 'error', text: errorText });
            console.error('Appointment Error:', err.response?.data);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="pt-20 dark:bg-black min-h-screen p-8">
            <div className="max-w-4xl mx-auto py-12">
                <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center fade-in-down">
                    <CalendarCheck className='w-7 h-7 mr-3 text-orange-600'/> Book Your Garage Appointment
                </h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-10 fade-in-down stagger-1">
                    Hello, {userInfo?.name || 'Customer'}! Schedule your service slot below. All maintenance is strictly performed on-site at our garage location.
                </p>

                {/* Status Message */}
                {statusMessage.type && (
                    <div className={`p-4 mb-6 rounded-lg font-medium flex items-center fade-in ${statusMessage.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'}`}>
                        {statusMessage.type === 'error' && <AlertTriangle className='w-5 h-5 mr-2'/>}
                        {statusMessage.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="p-8 bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-800 space-y-6 scale-in stagger-2">
                    
                    {/* Vehicle Type */}
                    <FormGroup label="Vehicle Type">
                        <div className="grid grid-cols-2 gap-4">
                            {vehicleTypes.map(type => (
                                <RadioOption key={type} name="vehicleType" value={type} currentValue={formData.vehicleType} onChange={handleChange}>
                                    {type === 'E-Rickshaw' ? <Truck className='w-5 h-5'/> : <Bike className='w-5 h-5'/>}
                                    {type}
                                </RadioOption>
                            ))}
                        </div>
                    </FormGroup>

                    {/* Service Type */}
                    <FormGroup label="Type of Service Required">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {serviceTypes.map(type => (
                                <RadioOption key={type} name="serviceType" value={type} currentValue={formData.serviceType} onChange={handleChange}>
                                    <Wrench className='w-5 h-5'/> {type}
                                </RadioOption>
                            ))}
                        </div>
                    </FormGroup>
                    
                    {/* Date and Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormGroup label="Preferred Date">
                            <input 
                                type="date" 
                                name="date" 
                                value={formData.date} 
                                onChange={handleChange} 
                                required 
                                min={getMinDate()}
                                className="input-field-form"
                            />
                        </FormGroup>
                        <FormGroup label="Time Slot">
                            <select 
                                name="timeSlot" 
                                value={formData.timeSlot} 
                                onChange={handleChange} 
                                required
                                className="input-field-form"
                            >
                                {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                            </select>
                        </FormGroup>
                    </div>

                    {/* Notes */}
                    <FormGroup label="Describe the Issue/Service Needed (Optional)">
                        <textarea 
                            name="notes" 
                            value={formData.notes} 
                            onChange={handleChange} 
                            rows="3" 
                            placeholder="e.g., 'Bike is making noise from the engine,' or 'Need full body polish for E-Rickshaw.'"
                            className="input-field-form"
                        />
                    </FormGroup>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full py-4 bg-orange-600 text-white text-lg font-semibold rounded-xl hover:bg-orange-700 transition-colors flex items-center justify-center disabled:bg-neutral-500 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <Loader className='w-5 h-5 animate-spin mr-2'/> : <Clock className='w-5 h-5 mr-2'/>}
                        {isLoading ? 'Processing...' : 'Confirm Appointment'}
                    </button>

                </form>
            </div>
        </div>
    );
};

// Reusable components for clean form structure
const FormGroup = ({ label, children }) => (
    <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">{label}</label>
        {children}
    </div>
);

const RadioOption = ({ name, value, currentValue, onChange, children }) => (
    <label className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${currentValue === value ? 'border-orange-600 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 ring-2 ring-orange-200' : 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-300 hover:border-orange-400'}`}>
        <input 
            type="radio" 
            name={name} 
            value={value} 
            checked={currentValue === value} 
            onChange={onChange} 
            className="hidden"
        />
        <span className="flex items-center text-sm font-medium">
            {children}
        </span>
    </label>
);

export default AppointmentPage;