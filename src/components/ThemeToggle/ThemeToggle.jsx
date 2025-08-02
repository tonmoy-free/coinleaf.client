import React, { useEffect, useState } from 'react';
import { GoMoon } from 'react-icons/go';
import { IoSunnyOutline } from 'react-icons/io5';
import { MdLightMode, MdOutlineLightMode } from 'react-icons/md';


const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(() => {
        // Retrieve theme from localStorage or use system preference
        return localStorage.getItem("theme") === "dark" ||
            (!localStorage.getItem("theme") &&
                window.matchMedia("(prefers-color-scheme: dark)").matches);
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);
    return (
        <div>


            <button
                onClick={() => setDarkMode(!darkMode)}
                className="cursor-pointer px-3 py-2 text-lg md:text-2xl font-medium  dark:text-white transition "
            >
                {/* {darkMode ? <MdOutlineLightMode /> : <MdLightMode />} */}
                {darkMode ? <IoSunnyOutline /> : <GoMoon />}
            </button>


        </div>
    );
};

export default ThemeToggle;