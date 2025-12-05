import React from 'react';
import { UserCheck, Zap, Shield, MapPin, Award } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="pt-20 dark:bg-black min-h-screen p-8">
            <div className="max-w-5xl mx-auto py-12">
                <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-6 fade-in-down">About Auto Pro: Our Commitment</h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 fade-in-down stagger-1">
                    Auto Pro is your trusted local garage, specializing in the professional service of two-wheelers (motorcycles, scooties, sports bikes) and E-Rickshaws. We are committed to reliability, transparency, and top-tier expertise, ensuring every service is conducted on-site by our dedicated team. We aim to be the most reliable garage for both conventional and electric transport in the region.
                </p>

                <h2 className="text-3xl font-semibold text-neutral-800 dark:text-white mt-10 mb-6 border-b pb-2 border-neutral-200 dark:border-neutral-800 fade-in-up">Why Choose Our Garage?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FeatureItem 
                        Icon={UserCheck} 
                        title="Professional, Trained Mechanics" 
                        description="Every service is handled by certified experts with specialized training in both EV technology and high-performance two-wheeler maintenance." 
                    />
                    <FeatureItem 
                        Icon={Zap} 
                        title="Specialized E-Mobility Service" 
                        description="As local experts in E-Rickshaw service, we handle everything from motor diagnostics to battery restoration with precision." 
                    />
                    <FeatureItem 
                        Icon={Shield} 
                        title="100% Genuine Spares Guarantee" 
                        description="We guarantee the use of only genuine and high-quality spare parts for all repairs, ensuring safety and maximizing vehicle longevity." 
                    />
                    <FeatureItem 
                        Icon={MapPin} 
                        title="Local, Dedicated Garage Operations" 
                        description="All work is strictly performed at our dedicated garage facility. No outsourced work, ensuring tight quality control and quick turnaround times." 
                    />
                    <FeatureItem 
                        Icon={Award} 
                        title="Two-Wheeler Performance Experts" 
                        description="Beyond scooties, we offer specialized maintenance for premium and sports bikes, ensuring peak performance and handling." 
                    />
                </div>
            </div>
        </div>
    );
};

const FeatureItem = ({ Icon, title, description }) => (
    <div className="flex items-start p-4 bg-white dark:bg-neutral-900 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-800 transition-all duration-300 hover:shadow-lg scale-in hover:scale-105 hover:-translate-y-1">
        <Icon className="w-6 h-6 text-orange-600 dark:text-orange-500 mt-1 mr-4 shrink-0" />
        <div>
            <h3 className="text-lg font-medium text-neutral-900 dark:text-white">{title}</h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">{description}</p>
        </div>
    </div>
);

export default AboutPage;