import Lottie from 'lottie-react';
import React from 'react';
import subscribe from '../../assets/lottie/subscribe.json';

const Subscribe = () => {
    return (
        <div className='h-auto relative md:h-[300px] bg-gradient-to-r from-blue-500 to-red-400 flex flex-col justify-center items-center space-y-6 md:space-y-10 py-10 md:py-0 px-4 md:px-0 mt-10 '>
            <Lottie className='absolute -top-6 left-40 md:-top-16 md:left-100 w-20 md:w-50'  animationData={subscribe} loop={true}></Lottie>
            <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white text-center dark:text-white'>
                Subscribe Our Newsletter
            </h1>

            <div className='relative w-full max-w-[600px]'>
                <input
                    className='text-white placeholder-white rounded-lg border border-white w-full h-[50px] p-4 shadow-sm focus:outline-none bg-transparent'
                    type="text"
                    placeholder='Login or give your email address...'
                />
                <button
                    className="btn btn-outline border-white text-white btn-secondary px-4 md:px-8 py-[10px] text-sm md:text-xl rounded-l rounded-lg absolute top-0 right-0 h-[50px]"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Subscribe;