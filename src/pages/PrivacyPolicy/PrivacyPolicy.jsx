import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-6 lg:px-24 py-12">
            <div className='pt-10'>
                <h1 className='text-center text-2xl md:text-5xl font-extrabold text-primary mb-4 dark:text-secondary'>Privacy Policy</h1>
                <p className='text-center px-6 md:px-0 text-xs md:text-base font-normal text-gray-600 mb-2 lg:mb-8 md:mb-8 dark:text-white'>
                    Last updated: {new Date().toLocaleDateString()}
                </p>
            </div>
            <div className="max-w-4xl mx-auto">


                {/* Section 1 */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
                    <p>
                        At <strong>CoinLeaf</strong>, we value your privacy and are
                        committed to protecting your personal information. This Privacy
                        Policy explains how we collect, use, and safeguard your information
                        when you use our platform.
                    </p>
                </section>

                {/* Section 2 */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Personal information like name, email, and profile details.</li>
                        <li>Transaction details such as coin purchases and withdrawals.</li>
                        <li>Usage data like browser type, device info, and IP address.</li>
                    </ul>
                </section>

                {/* Section 3 */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">3. How We Use Your Data</h2>
                    <p>
                        We use your information to provide a seamless user experience,
                        including:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Account creation and authentication</li>
                        <li>Task management and earnings tracking</li>
                        <li>Improving security and fraud prevention</li>
                        <li>Sending notifications and updates</li>
                    </ul>
                </section>

                {/* Section 4 */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">4. Data Protection</h2>
                    <p>
                        We use industry-standard security measures to protect your
                        information. However, no method of transmission over the internet is
                        100% secure, so we cannot guarantee absolute protection.
                    </p>
                </section>

                {/* Section 5 */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">5. Sharing of Information</h2>
                    <p>
                        We do not sell or rent your personal data. We may share your
                        information with:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Trusted service providers (e.g., payment gateways).</li>
                        <li>Legal authorities if required by law.</li>
                    </ul>
                </section>

                {/* Section 6 */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
                    <p>
                        You have the right to access, update, or delete your personal
                        information. You can also opt out of receiving notifications at any
                        time.
                    </p>
                </section>

                {/* Section 7 */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">7. Updates to Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. Any changes
                        will be posted on this page with the updated date.
                    </p>
                </section>

                {/* Contact */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact
                        us at:{" "}
                        <a
                            href="mailto:support@coinleaf.com"
                            className="text-primary dark:text-secondary underline"
                        >
                            support@coinleaf.com
                        </a>
                    </p>
                </section>

                
            </div>
        </div>
    );
};

export default PrivacyPolicy;
