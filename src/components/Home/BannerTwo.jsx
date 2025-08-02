import React from 'react';
import { motion } from "motion/react"
import { Link } from 'react-router';
import Lottie from 'lottie-react';
import coin from '../../assets/lottie/coin.json';


const BannerTwo = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <div className="hero bg-base-200 min-h-96 dark:bg-black">
                <div className="hero-content flex-col lg:flex-row">
                    <div className='flex-1 '>
                        <Lottie className='ml-55 hidden lg:block' style={{ width: '350px' }} animationData={coin}  loop={true}></Lottie>
                    </div>
                    <div className='flex-1'>
                        <motion.h1
                            initial={{ scale: 0 }}
                            animate={{ scale: 1, transition: { duration: 4 } }}
                            className="text-2xl md:text-5xl font-bold dark:text-white"><motion.span animate=
                                {{
                                    color: ['#0562af', '#dd3333', '#8A33FF'],
                                    transition: { duration: 2, repeat: Infinity }

                                }}
                            >CoinLeaf</motion.span> for you!</motion.h1>
                        <p className="py-1 md:py-6 dark:text-white">
                            Anyone can complete simple tasks — writing, reviewing, testing, designing, and more — as long as it's done right and adds real value.
                        </p>


                        
                            <Link to="/allTasks">
                                <button className="btn btn-primary">Work</button>
                            </Link>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerTwo;