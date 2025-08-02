import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useNotifications from '../hooks/useNotifications';
import { MdNotifications } from 'react-icons/md';

const NotificationDropdown = () => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { notifications } = useNotifications();

    const toggleDropdown = () => setOpen(!open);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="btn btn-ghost btn-circle">
                <span className="indicator">
                    <MdNotifications className='text-2xl dark:text-white dark:hover:text-black' />
                    {notifications.length > 0 && (
                        <span className="badge badge-sm indicator-item">{notifications.length}</span>
                    )}
                </span>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white dark:bg-gray-900 shadow-lg rounded-md z-50 p-3">
                    {notifications.length === 0 ? (
                        <p className="text-sm text-gray-500 dark:text-white">No notifications</p>
                    ) : (
                        notifications.map((notif, idx) => (
                            <Link
                                to={`https://coinleaf-21397.web.app${notif.actionRoute}`}
                                key={idx}
                                className="block px-4 py-2 mb-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white text-sm"
                            >
                                {notif.message}
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {new Date(notif.time).toLocaleString()}
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
