import React from 'react';

const AboutUs = () => {
    return (
        <div className="bg-base-100 min-h-screen">
            {/* Hero Section */}
            <div className="hero bg-blue-900 text-white py-16">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">About Us</h1>
                        <p className="py-6 text-lg">
                            We are dedicated to bridging the gap between citizens and city maintenance for a better tomorrow.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-5 py-16">
                {/* Mission & Vision Section */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <h2 className="text-3xl font-bold mb-4 text-blue-800">Our Mission</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Our primary goal is to empower citizens to report public infrastructure issues easily. Whether it's a broken streetlight, a dangerous pothole, or water leakage, our platform ensures your voice is heard and the problem is resolved by the right authorities.
                        </p>
                        <ul className="mt-6 space-y-3">
                            <li className="flex items-center gap-2">
                                <span className="bg-green-500 text-white rounded-full p-1 text-xs">✓</span> Transparency in city services
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="bg-green-500 text-white rounded-full p-1 text-xs">✓</span> Real-time issue tracking
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="bg-green-500 text-white rounded-full p-1 text-xs">✓</span> Faster response from staff
                            </li>
                        </ul>
                    </div>
                    <div className="flex justify-center">
                        <img 
                            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600" 
                            alt="City Maintenance" 
                            className="rounded-2xl shadow-2xl"
                        />
                    </div>
                </div>

                {/* Statistics / Impact Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-20">
                    <div className="p-8 bg-blue-50 rounded-xl border border-blue-100">
                        <h3 className="text-4xl font-bold text-blue-900 mb-2">5,000+</h3>
                        <p className="text-gray-600 font-medium">Issues Reported</p>
                    </div>
                    <div className="p-8 bg-orange-50 rounded-xl border border-orange-100">
                        <h3 className="text-4xl font-bold text-orange-600 mb-2">85%</h3>
                        <p className="text-gray-600 font-medium">Resolution Rate</p>
                    </div>
                    <div className="p-8 bg-blue-50 rounded-xl border border-blue-100">
                        <h3 className="text-4xl font-bold text-blue-900 mb-2">24/7</h3>
                        <p className="text-gray-600 font-medium">Active Monitoring</p>
                    </div>
                </div>

                {/* Team / How we work CTA */}
                <div className="text-center bg-gray-900 text-white p-12 rounded-3xl">
                    <h2 className="text-3xl font-bold mb-4">Want to make a difference?</h2>
                    <p className="mb-8 opacity-80">Be a responsible citizen. Report issues and help us build a safer city.</p>
                    <button className="btn btn-primary bg-orange-500 border-none hover:bg-orange-600 px-8">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;