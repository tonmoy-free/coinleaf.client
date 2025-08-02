import React, { Suspense } from 'react';
import Navbar from '../../components/Home/Navbar';
import Loading from '../../components/Loading/Loading';
import { Link } from 'react-router';
import error from '../../assets/photo/error.png';

const ErrorPage = () => {
    return (
        <div className=''>
            <Navbar></Navbar>
            <Suspense fallback={<Loading></Loading>}>

                <div
                    className="h-screen w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${error})` }}
                >
                    {/* Your content goes here */}
                    <div className="text-white text-4xl text-center pt-140">
                        <p className='font-bold text-base text-center md:text-xl'>Oops ! The page you'r looking for doesn't exist</p>
                        <div className="flex justify-center items-center mt-4 md:mt-10 mb-20">
                            <Link to='/' className="hover:bg-[#e2136e] hover:border-secondary border border-white text-white text-center rounded-4xl hover:text-white font-bold text-base md:text-xl md:px-7 md:py-4 px-5 py-[6px] cursor-pointer">Go Back Home</Link>
                        </div>
                    </div>
                </div>
            </Suspense>
        </div>
    );
};

export default ErrorPage;