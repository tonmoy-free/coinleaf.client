// components/HeroVideo.jsx

import React, { useContext } from 'react';
import coin from '../../assets/video/coin.mp4';
import { Link } from 'react-router';
import { AuthContext } from '../../provider/AuthProvider';

const HeroVideo = () => {
    const { user } = useContext(AuthContext);
    console.log(user)
    return (
        <div className="relative w-full h-[100vh] overflow-hidden">
            {/* 🔹 Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src={coin} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            {/* <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://youtu.be/RqgT14-yl74?si=xdCM9mjdW1X_wGaV"
                title="YouTube video background"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
            ></iframe> */}

            {/* 🔹 Overlay (dark layer) */}
            {/* <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 to-transparent z-10" /> */}

            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black to-transparent z-10" />


            {/* 🔹 Content */}
            <div className="relative z-11 flex flex-col items-center justify-center h-full text-white text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Earn Coins by Doing Small Tasks</h1>
                <p className="text-lg md:text-xl mb-6">Join the micro-task revolution with CoinLeaf</p>
                {!user &&
                    <>
                        <button className="px-6 py-3 bg-primary hover:bg-secondary text-white font-semibold rounded-lg transition duration-300 cursor-pointer">

                            <Link to="/login/register">Get Started</Link>

                        </button>
                    </>
                }
            </div>
        </div>
    );
};

export default HeroVideo;
