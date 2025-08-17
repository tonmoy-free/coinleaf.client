import React from "react";

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-6 lg:px-24 py-12">
            <div className='pt-10'>
                <h1 className='text-center text-2xl md:text-5xl font-extrabold text-primary mb-4 dark:text-secondary'>Terms of Service</h1>
                <p className='text-center px-6 md:px-0 text-xs md:text-base font-normal text-gray-600 mb-2 lg:mb-8 md:mb-8 dark:text-white'>
                    Last updated: {new Date().toLocaleDateString()}
                </p>
            </div>
            <div className="max-w-4xl mx-auto">

                {/* Section 1 */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using <strong>CoinLeaf</strong>, you agree to be
                        bound by these Terms of Service. If you do not agree, you may not
                        use our platform.
                    </p>
                </section>

                {/* Section 2 */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">2. Eligibility</h2>
                    <p>
                        You must be at least 18 years old to use our services. By using the
                        platform, you confirm that you meet this requirement.
                    </p>
                </section>

                {/* Section 3 */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">3. User Accounts</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Provide accurate and complete information during registration.</li>
                        <li>You are responsible for maintaining account security.</li>
                        <li>
                            Any suspicious or unauthorized use must be reported immediately.
                        </li>
                    </ul>
                </section>

                {/* Section 4 */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">4. Use of Services</h2>
                    <p>
                        Our services allow users to create tasks, complete tasks, and earn
                        digital coins. You agree not to misuse the platform or engage in
                        fraudulent activities.
                    </p>
                </section>

                {/* Section 5 */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">5. Payments & Withdrawals</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            Buyers must ensure sufficient coin balance before creating tasks.
                        </li>
                        <li>
                            Workers can withdraw earnings once minimum withdrawal requirements
                            are met.
                        </li>
                        <li>All payments are final and non-refundable, unless stated otherwise.</li>
                    </ul>
                </section>

                {/* Section 6 */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">6. Prohibited Activities</h2>
                    <p>You agree not to:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Use the platform for illegal or harmful purposes.</li>
                        <li>Post misleading or fraudulent tasks.</li>
                        <li>Exploit bugs, vulnerabilities, or automation tools.</li>
                    </ul>
                </section>

                {/* Section 7 */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">7. Termination</h2>
                    <p>
                        We reserve the right to suspend or terminate your account if you
                        violate these terms or misuse our services.
                    </p>
                </section>

                {/* Section 8 */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">8. Limitation of Liability</h2>
                    <p>
                        CoinLeaf is not responsible for any direct, indirect, or incidental
                        damages resulting from your use of the platform.
                    </p>
                </section>

                {/* Section 9 */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">9. Changes to Terms</h2>
                    <p>
                        We may update these Terms of Service at any time. Changes will be
                        effective immediately upon posting on this page.
                    </p>
                </section>

                {/* Section 10 */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
                    <p>
                        If you have any questions about these Terms, please contact us at:{" "}
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

export default TermsOfService;
