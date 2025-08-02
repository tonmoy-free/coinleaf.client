import React from "react";
import { Link } from "react-router";


const Forbidden = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900 text-center px-4">
            <h1 className="text-6xl font-bold text-red-600 dark:text-red-400">403</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mt-4">
                Access Forbidden
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2 mb-6 max-w-md">
                Sorry, you don't have permission to access this page. If you think this is a mistake, please contact the administrator.
            </p>

            <Link to="/" className="btn btn-primary">
                Go to Home
            </Link>
        </div>
    );
};

export default Forbidden;
