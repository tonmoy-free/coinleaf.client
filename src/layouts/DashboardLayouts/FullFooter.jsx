import React, { useEffect, useState } from "react";
import LogoWhite from "../../components/Logo/LogoWhite";
import LogoBlue from "../../components/Logo/LogoBlue";

const FullFooter = () => {
    // Dark mode toggle
    const [isDark, setIsDark] = useState(false);
    useEffect(() => {
        const root = document.documentElement;
        const isDarkMode = root.classList.contains('dark');
        setIsDark(isDarkMode);

        // Optional: Listen for class changes (e.g., user toggles theme)
        const observer = new MutationObserver(() => {
            setIsDark(root.classList.contains('dark'));
        });
        observer.observe(root, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);
    return (
        <div className="bg-gray-800 text-white p-6 text-center space-y-2">
            <div className="text-lg font-semibold flex justify-center items-center">
                {isDark ? <LogoWhite /> : <LogoBlue />}
            </div>
            <div className="text-sm">Empowering freelancers & buyers together.</div>
            <div className="flex justify-center gap-4 text-sm">
                <a href="#" className="hover:underline">Privacy Policy</a>
                <a href="#" className="hover:underline">Terms of Service</a>
                <a href="#" className="hover:underline">Help</a>
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-300">© {new Date().getFullYear()} CoinLeaf. All rights reserved.</div>
        </div>
    );
};

export default FullFooter;