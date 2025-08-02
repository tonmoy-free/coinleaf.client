import React from 'react';
import FullFooter from '../../layouts/DashboardLayouts/FullFooter';

const DashboardFooter = () => {
    return (
        <>
            {/* Desktop Footer only for content area */}
            <div className="hidden md:block bg-white dark:bg-gray-800">
                <footer className="text-center text-gray-600 p-3 dark:text-gray-300">
                    © {new Date().getFullYear()} CoinLeaf. All rights reserved.
                </footer>
            </div>

            {/* Mobile Full Footer */}
            <div className="block md:hidden">
                <FullFooter />
            </div>
        </>
    );
};

export default DashboardFooter;