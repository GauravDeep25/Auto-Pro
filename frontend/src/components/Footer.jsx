import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-neutral-50 dark:bg-black pt-16 pb-8 border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <div className="w-6 h-6 bg-orange-600 rounded flex items-center justify-center text-white text-xs font-bold">A</div>
                            <span className="font-bold text-lg text-neutral-900 dark:text-white">Auto Pro</span>
                        </Link>
                        <p className="text-neutral-500 dark:text-neutral-500 text-sm leading-relaxed">
                            Empowering drivers with sustainable transport solutions and reliable service since 2023.
                        </p>
                    </div>
                    
                    <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-white mb-4">Services</h4>
                        <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
                            <li><Link to="/sales" className="hover:text-orange-600 dark:hover:text-white transition-colors">New Sales</Link></li>
                            <li><Link to="/appointment" className="hover:text-orange-600 dark:hover:text-white transition-colors">Repair Service</Link></li>
                            <li><Link to="/parts" className="hover:text-orange-600 dark:hover:text-white transition-colors">Spare Parts</Link></li>
                            <li><Link to="/contact" className="hover:text-orange-600 dark:hover:text-white transition-colors">Consultation</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-white mb-4">Company</h4>
                        <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
                            <li><Link to="/about" className="hover:text-orange-600 dark:hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-orange-600 dark:hover:text-white transition-colors">Contact</Link></li>
                            <li><Link to="#" className="hover:text-orange-600 dark:hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link to="#" className="hover:text-orange-600 dark:hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-white mb-4">Contact</h4>
                        <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
                            <li>Auto Pro, Opp. Pilot Baba, Madaini, Sasaram, Bihar - 821115</li>
                            <li>spfautopro@gmail.com</li>
                            <li>+91 8544044020</li>
                        </ul>
                    </div>
                </div>
                
                <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-neutral-400 dark:text-neutral-600 text-sm">© 2024 Auto Pro. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a href="#" className="text-neutral-400 hover:text-orange-600 dark:hover:text-white transition-colors"><Facebook className='w-4 h-4' /></a>
                        <a href="#" className="text-neutral-400 hover:text-orange-600 dark:hover:text-white transition-colors"><Instagram className='w-4 h-4' /></a>
                        <a href="#" className="text-neutral-400 hover:text-orange-600 dark:hover:text-white transition-colors"><Twitter className='w-4 h-4' /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;