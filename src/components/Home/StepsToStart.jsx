import React from 'react';
import Lottie from 'lottie-react';

// Import your Lottie JSON animations
import signupAnimation from '../../assets/lottie/signup1.json';
import tasksAnimation from '../../assets/lottie/task1.json';
import earnAnimation from '../../assets/lottie/earn.json';

const steps = [
    {
        title: 'Sign Up',
        description: 'Create a free account in just a few minutes and get access to micro-tasks right away.',
        animation: signupAnimation,
    },
    {
        title: 'Browse Tasks',
        description: 'Explore a variety of tasks that suit your skills and start completing them at your own pace.',
        animation: tasksAnimation,
    },
    {
        title: 'Earn & Withdraw',
        description: 'Complete tasks, earn rewards, and withdraw your earnings securely through multiple payment options.',
        animation: earnAnimation,
    },
];

const StepsToStart = () => {
    return (
        <section className=" text-white py-16 px-4 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800 bg-gradient-to-r from-blue-100 to-red-100">
            <div className="max-w-6xl mx-auto text-center">
                <div className='mt-20'>
                    <h1 className='text-center text-2xl md:text-5xl font-extrabold text-primary mb-4 dark:text-secondary'>3 Easy Steps to Start Earning</h1>
                    <p className='text-center px-6 md:px-0 text-xs md:text-base font-normal text-gray-600 mb-2 lg:mb-8 md:mb-8 dark:text-white'>
                        Getting started with CoinLeaf is quick and  <br /> Follow these 3 simple steps and start earning right away—no experience needed!
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 hover:scale-105 transition-transform duration-300 cursor-pointer"
                        >
                            <div className="flex justify-center mb-4">
                                <Lottie animationData={step.animation} loop={true} className="w-24 h-24" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 dark:text-white text-gray-800">{step.title}</h3>
                            <p className="text-gray-800 dark:text-white">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StepsToStart;
