import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, AlertTriangle } from 'lucide-react';

const ContactPage = () => {
    const [statusMessage, setStatusMessage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Placeholder for email sending functionality (will require a backend endpoint)
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatusMessage(null);

        // Simulate API call success/failure
        setTimeout(() => {
            setIsSubmitting(false);
            // Simulate success
            setStatusMessage({ 
                type: 'success', 
                text: 'Thank you for your inquiry! We will respond within 24 hours.' 
            });
            e.target.reset();
        }, 1500);

        /* // Real API implementation would look like this:
        try {
            await axios.post('/api/contact', formData);
            setStatusMessage({ type: 'success', text: 'Inquiry sent successfully.' });
        } catch (error) {
            setStatusMessage({ type: 'error', text: 'Failed to send message. Please call us directly.' });
        }
        */
    };

    return (
        <div className="pt-20 dark:bg-black min-h-screen p-8">
            <div className="max-w-5xl mx-auto py-12">
                <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-6 fade-in-down">Get in Touch with Auto Pro</h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-10 fade-in-down stagger-1">
                    Visit our garage for all service needs or use the contact information below. We are here to help your two-wheeler or E-Rickshaw run perfectly.
                </p>

                {/* Contact Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <a 
                        href="https://maps.app.goo.gl/MEEW6Y2QA73SxZTk9" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block h-full scale-in"
                    >
                        <ContactDetail Icon={MapPin} title="Our Garage Location" detail="Auto Pro Premium Bike Garage" clickable={true} />
                    </a>
                    <a 
                        href="https://wa.me/918544044020?text=Hello,%20I%20would%20like%20to%20inquire%20about%20your%20services." 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block h-full scale-in stagger-1"
                    >
                        <ContactDetail Icon={Phone} title="Service Helpline (Call/WhatsApp)" detail="+91 85440 44020" clickable={true} />
                    </a>
                    <div className="scale-in stagger-2">
                        <ContactDetail Icon={Clock} title="Working Hours" detail={<>Mon - Sat: 9:00 AM to 6:00 PM<br />Sun: 9:00 AM to 1:00 PM</>} />
                    </div>
                </div>
                
                {/* Form and Map */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div className="p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800 fade-in-up">
                        <h2 className="text-2xl font-semibold text-neutral-800 dark:text-white mb-4 flex items-center"><Send className='w-5 h-5 mr-2 text-orange-600'/> Send a Quick Inquiry</h2>
                        
                        {statusMessage && (
                            <div className={`p-3 mb-4 rounded-lg flex items-center text-sm font-medium ${statusMessage.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'}`}>
                                {statusMessage.type === 'error' && <AlertTriangle className='w-4 h-4 mr-2'/>}
                                {statusMessage.text}
                            </div>
                        )}

                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <input type="text" name="name" placeholder="Your Name" className="input-field-contact" required disabled={isSubmitting} />
                            <input type="email" name="email" placeholder="Your Email" className="input-field-contact" required disabled={isSubmitting} />
                            <textarea name="message" placeholder="Your Message or Service Query" rows="4" className="input-field-contact" disabled={isSubmitting}></textarea>
                            <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors disabled:bg-neutral-500 disabled:cursor-not-allowed flex items-center justify-center">
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                {isSubmitting && <Loader className='w-5 h-5 ml-2 animate-spin'/>}
                            </button>
                        </form>
                    </div>

                    {/* Map Embed */}
                    <div className="p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800 fade-in-up stagger-1">
                        <h2 className="text-2xl font-semibold text-neutral-800 dark:text-white mb-4">Find Our Garage</h2>
                        <div className="rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 relative">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d914.2863652806837!2d84.0441683!3d24.9548398!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398db13063a2c507%3A0xb61839aa2409bc7e!2sAuto%20Pro%20Premium%20Bike%20Garage!5e0!3m2!1sen!2sin!4v1764975557893!5m2!1sen!2sin" 
                                width="100%" 
                                height="300" 
                                style={{border:0}} 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-64 md:h-80"
                            />
                            {/* Dark mode overlay */}
                            <div className="hidden dark:block absolute inset-0 bg-black/30 pointer-events-none mix-blend-multiply"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ContactDetail = ({ Icon, title, detail, clickable = false }) => (
    <div className={`h-full p-6 bg-white dark:bg-neutral-900 rounded-lg shadow-sm border border-neutral-100 dark:border-neutral-800 text-center transition-all duration-300 ${clickable ? 'hover:shadow-lg hover:border-orange-500 dark:hover:border-orange-500 cursor-pointer transform hover:scale-105 hover:-translate-y-1' : ''}`}>
        <Icon className="w-8 h-8 text-orange-600 dark:text-orange-500 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-neutral-900 dark:text-white">{title}</h3>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">{detail}</p>
    </div>
);

export default ContactPage;