import React from 'react';
import { Link } from 'react-router';


const AboutUs = () => {
    return (
        <section className="bg-gray-100 dark:bg-gray-900 py-16 px-4 md:px-8 lg:px-16">
            <div className="max-w-6xl mx-auto text-center">
                {/* Heading */}
                <h1 className="text-center text-2xl md:text-5xl font-bold text-primary mb-2 dark:text-secondary">
                    About Us
                </h1>
                <p className="text-center px-6 md:px-0 text-sm md:text-lg font-normal text-gray-600 mb-8 dark:text-gray-300">
                    Connecting People Through History
                </p>

                {/* Description */}
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                    <span className="font-semibold text-primary dark:text-secondary">CoinLeaf </span> is a secure, responsive micro-task and earning platform where users can complete small jobs — like submissions, verifications, or content-based tasks — and earn digital coins. Whether you're a task buyer or a worker, CoinLeaf offers a smooth and user-friendly experience with personalized dashboards, real-time earnings tracking, and built-in notification and approval systems. Perfect for students, freelancers, or anyone looking to monetize their spare time.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4 max-w-3xl mx-auto">
                    We aim to connect people through the power of history. Track legendary artifacts, add your
                    discoveries, and explore the stories that shaped civilization.
                </p>

                {/* Vision / Mission / Goal */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg cursor-pointer hover:border hover:border-primary transition-all duration-300 ease-in-out dark:border-secondary">
                        <h3 className="text-xl font-bold text-primary dark:text-secondary mb-2">Our Vision</h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                            To become the most trusted and accessible global micro-task platform that empowers individuals to earn, grow, and connect — anytime, anywhere.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg cursor-pointer hover:border hover:border-primary transition-all duration-300 ease-in-out dark:border-secondary">
                        <h3 className="text-xl font-bold text-primary dark:text-secondary mb-2">Our Mission</h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                            To provide a secure and user-friendly platform where buyers and workers can collaborate seamlessly.To enable students, freelancers, and everyday users to monetize their skills and time effectively.To build a community-driven ecosystem with transparency, fairness, and innovation at its core.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg cursor-pointer hover:border hover:border-primary transition-all duration-300 ease-in-out dark:border-secondary">
                        <h3 className="text-xl font-bold text-primary dark:text-secondary mb-2">Our Goal</h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                            Help millions of people gain financial independence through micro-tasks.Ensure safe transactions, verified tasks, and reliable payment systems.Connect buyers and workers across borders, making opportunities available worldwide.
                        </p>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-10">
                    <Link to={`/allTasks`}>
                        <button className="px-6 py-5 btn btn-outline btn-primary hover:bg-secondary hover:border-secondary dark:text-white  rounded-lg dark:border-secondary">Explore Tasks</button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;