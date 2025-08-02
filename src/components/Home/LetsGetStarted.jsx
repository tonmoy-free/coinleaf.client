import React from 'react';
import { Link } from 'react-router';


const LetsGetStarted = () => {
    return (
            <div className='h-auto py-16 md:h-[400px] bg-gradient-to-r from-blue-500 to-red-400 flex flex-col justify-center items-center space-y-6   mb-16 md:mb-24 lg:mb-32 px-4 text-center'>
                <h1 className='text-2xl md:text-4xl lg:text-5xl font-semibold text-white dark:text-white'>
                    Let's Get Started!
                </h1>
                <p className='text-base md:text-lg lg:text-xl font-medium text-white max-w-xl'>
                    💬 "Complete simple tasks, earn real rewards — all in one platform, just a click away!"
                </p>
               
                <Link
                    to="/login/register"
                    className="btn btn-secondary hover:bg-white hover:text-primary text-base md:text-lg lg:text-xl text-white px-6 py-2"
                >
                    Register Now
                </Link>
            </div>
    );
};

export default LetsGetStarted;