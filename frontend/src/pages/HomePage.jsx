import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Wrench, Sprout, TrendingUp, Clock, MapPin } from 'lucide-react';

const HomePage = () => {
    return (
        <div className="pt-20 bg-neutral-50 dark:bg-black min-h-screen transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden border-b border-neutral-200 dark:border-neutral-900 fade-in">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block py-1 px-3 rounded-full bg-orange-50 dark:bg-neutral-900 border border-orange-100 dark:border-neutral-800 text-orange-700 dark:text-orange-500 text-xs font-semibold uppercase tracking-wider mb-6 fade-in-up">
                            The Future of Transport
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6 leading-tight fade-in-up stagger-1">
                            Your <span className="text-orange-600">Auto Pro</span> Garage for Two-Wheelers & E-Rickshaws.
                        </h1>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-10 leading-relaxed max-w-2xl fade-in-up stagger-2">
                            Expert service by professional, trained mechanics. Your reliable local partner for genuine spares, quick service, and E-Rickshaw sales -all performed on-site at our garage facility.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 fade-in-up stagger-3">
                            <Link to="/appointment" className="px-8 py-4 text-base font-medium text-white bg-orange-600 rounded-full hover:bg-orange-700 transition-all text-center shadow-lg shadow-orange-600/30 hover:scale-105">
                                Book Service Now
                            </Link>
                            <Link to="/sales" className="px-8 py-4 text-base font-medium text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all text-center hover:scale-105">
                                View E-Rickshaws
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-24 bg-white dark:bg-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16 fade-in-down">
                        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">Our Core Offerings</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">Comprehensive solutions for two-wheelers and E-Rickshaws, managed exclusively at our facility.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ServiceCard Icon={Truck} title="E-Rickshaw Sales" description="Sales of new passenger and cargo E-Rickshaws. Find your next commercial vehicle." link="/sales" />
                        <ServiceCard Icon={Wrench} title="Expert Two-Wheeler Service" description="Specialized repair and service for motorcycles, scooties, and premium bikes." link="/appointment" />
                        <ServiceCard Icon={Sprout} title="Genuine Spare Parts" description="High-quality, certified spare parts for all vehicle types, available in stock." link="/parts" />
                    </div>
                </div>
            </section>

            {/* Stats / Trust Section */}
            <section className="py-20 bg-neutral-900 dark:bg-neutral-900 text-white border-y border-neutral-800">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="scale-in">
                            <div className="text-4xl font-bold text-orange-500 mb-2">500+</div>
                            <div className="text-neutral-400 text-sm font-medium">Vehicles Serviced</div>
                        </div>
                        <div className="scale-in stagger-1">
                            <div className="text-4xl font-bold text-orange-500 mb-2"><TrendingUp className="inline w-8 h-8"/></div>
                            <div className="text-neutral-400 text-sm font-medium">Certified Quality</div>
                        </div>
                        <div className="scale-in stagger-2">
                            <div className="text-4xl font-bold text-orange-500 mb-2"><Clock className="inline w-8 h-8"/></div>
                            <div className="text-neutral-400 text-sm font-medium">Quick Turnaround</div>
                        </div>
                        <div className="scale-in stagger-3">
                            <div className="text-4xl font-bold text-orange-500 mb-2"><MapPin className="inline w-8 h-8"/></div>
                            <div className="text-neutral-400 text-sm font-medium">Local Garage Only</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section (Replicating the Footer/CTA section) */}
            <section className="py-24 bg-white dark:bg-black transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="bg-orange-600 dark:bg-neutral-900 border dark:border-neutral-800 rounded-[2.5rem] p-8 md:p-16 text-center shadow-none overflow-hidden relative scale-in">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to book your service?</h2>
                            <p className="text-orange-100 dark:text-neutral-400 text-lg mb-10 max-w-2xl mx-auto">
                                Schedule your bike or E-Rickshaw appointment now and rely on our expert mechanics.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link to="/appointment" className="px-8 py-4 bg-white text-orange-600 dark:text-black font-semibold rounded-full hover:bg-neutral-100 transition-all shadow-lg dark:shadow-none hover:scale-105">
                                    Book Appointment
                                </Link>
                                <Link to="/contact" className="px-8 py-4 bg-transparent border border-orange-200 dark:border-neutral-700 text-white font-semibold rounded-full hover:bg-orange-700 dark:hover:bg-neutral-800 transition-all hover:scale-105">
                                    Get Directions to Garage
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const ServiceCard = ({ Icon, title, description, link }) => (
    <Link to={link} className="block p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-lg hover:shadow-xl dark:shadow-neutral-950/50 border border-neutral-100 dark:border-neutral-800 transition-all duration-300 group scale-in hover:scale-105 hover:-translate-y-1">
        <div className="mb-4 flex justify-center">
            <div className="p-3 bg-orange-500/10 dark:bg-orange-600/20 text-orange-600 dark:text-orange-500 rounded-lg">
                <Icon className="w-8 h-8" />
            </div>
        </div>
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-orange-600 transition-colors">{title}</h3>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">{description}</p>
    </Link>
);

export default HomePage;