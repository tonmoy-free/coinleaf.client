import React, { memo, useContext, useEffect, useState } from 'react';
import LogoWhite from '../Logo/LogoWhite';
import LogoBlue from '../Logo/LogoBlue';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { Link } from 'react-router';
import { MdNotifications } from 'react-icons/md';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import { AuthContext } from '../../provider/AuthProvider';
import { FaCoins } from 'react-icons/fa';
import NotificationDropdown from '../NotificationDropdown';


const dummyNotifications = [
    "You earned 10 coins from Task A.",
    "Your submission for Task B was approved.",
    "New task available: Design Poster."
];

const DashboardNavBar = memo(() => {
    const { user, showMobileSidebar, setShowMobileSidebar } = useContext(AuthContext);
    const [showNotifications, setShowNotifications] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    // const [showMobileSidebar, setShowMobileSidebar] = useState(false);

    const axiosInstance = useAxios();
    const queryClient = useQueryClient();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosInstance.get(`/users/${user.email}`);
            // console.log(res.data)
            return res.data;
        },
    });

    // console.log('Users:', users[0]?.coins || 0);
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
        <header className="w-full bg-gradient-to-r from-blue-100 to-red-100 dark:from-black dark:to-blue-900 shadow-sm px-6 py-4 flex justify-between items-center">
            <div className="text-xl font-bold text-gray-900 dark:text-white">
                {isDark ? <LogoWhite /> : <LogoBlue />}
            </div>
            <div className="flex items-center gap-2 md:gap-6">


                <ThemeToggle></ThemeToggle>

                <div className="text-right hidden md:block cursor-pointer">
                    <div className="text-sm font-bold text-gray-700 dark:text-gray-200 flex gap-2 items-center justify-start hover:text-primary dark:hover:text-secondary">
                        <div> Available Coins:</div>
                        <div><FaCoins /></div>
                        <div>{users[0]?.coins || 0}</div>
                        {/* Available Coins:<FaCoins />{users[0]?.coins || 0} */}
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                        {users[0]?.role || 'loading'} | {users[0]?.name}
                    </div>
                </div>
                <img
                    src={users[0]?.photoUrl}
                    alt="User"
                    className="w-10 h-10 rounded-full border hidden md:block"
                />
                <div className="dropdown dropdown-end md:hidden">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={users[0]?.photoUrl || 'loading'} alt="User" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                        <li><Link>Available Coins:<FaCoins />{users[0]?.coins || 0}</Link></li>
                        <li><Link> {users[0]?.name}</Link></li>
                        <li><Link>{users[0]?.role || 'loading'}</Link></li>
                    </ul>
                </div>
                <div className="relative">
                    {/* <button onClick={() => setShowNotifications(!showNotifications)}>
                        <MdNotifications className="text-gray-600 dark:text-white text-2xl" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">{dummyNotifications.length}</span>
                    </button>
                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-700 shadow-lg rounded p-4 z-50">
                            <h4 className="text-sm font-bold mb-2 text-gray-800 dark:text-gray-100">Notifications</h4>
                            <ul className="text-sm text-gray-700 dark:text-gray-200 space-y-1">
                                {dummyNotifications.map((note, idx) => (
                                    <li key={idx}>• {note}</li>
                                ))}
                            </ul>
                        </div>
                    )} */}
                    <NotificationDropdown></NotificationDropdown>
                </div>
                <button onClick={() => setShowMobileSidebar(!showMobileSidebar)} className="block md:hidden text-xl ml-2 text-gray-800 dark:text-white">☰</button>
            </div>
        </header>
    );
});

export default DashboardNavBar;