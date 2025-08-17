import React from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

const ContactUs = () => {
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Message send Successful.Wait for reply.",
            showConfirmButton: false,
            timer: 1500
        });
        form.reset();
    }
    return (
        <section className="bg-gray-100 dark:bg-gray-900 py-16 px-4 md:px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold text-primary dark:text-secondary">
                        Contact Us
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                        Have a question or want to get in touch? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                name="name"
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Your Email"
                                required
                                name="email"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Message
                            </label>
                            <textarea
                                rows="4"
                                placeholder="Your Message"
                                name="Message"
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            ></textarea>
                        </div>

                        <button type="submit" className="w-full px-6 py-6 btn btn-outline btn-primary hover:bg-secondary hover:border-secondary dark:text-white dark:border-white rounded-lg transition-all duration-300">Send Message</button>

                    </form>

                    {/* Contact Info */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col justify-center">
                        <h2 className="text-xl font-semibold text-primary dark:text-secondary mb-4">
                            Get In Touch
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Whether you have a question about features, pricing, or anything else —
                            our team is ready to answer all your questions.
                        </p>

                        <div className="space-y-3">
                            <p className="text-gray-700 dark:text-gray-300">
                                📍 Address: CoinLeaf Tower, Tikatuli, Mutashop
                                Road, Jaupol-1236, Dhaka, Bangladesh
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                                📞 Phone: 01677 057 845
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                                📧 Email: contact@coinleaf.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;