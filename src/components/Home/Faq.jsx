import React, { useEffect, useState } from 'react';
import FAQ from '../../assets/photo/faq.png'
import FAQDark from '../../assets/photo/faqDarkMode.png'
import faqG from '../../assets/photo/faqG.gif';
import faDark from '../../assets/lottie/faq.json';
import { motion } from "motion/react"
import Lottie from 'lottie-react';

const Faq = () => {
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

        <div className="w-11/12 mx-auto mt-0 md:mt-18 lg:mt-20">

            <div className='mt-20'>
                <h1 className='text-center text-2xl md:text-5xl font-extrabold text-primary mb-4 dark:text-secondary'>Frequently asked questions.</h1>
                <p className='text-center px-6 md:px-0 text-xs md:text-base font-normal text-gray-600 mb-2 lg:mb-8 md:mb-8 dark:text-white'>
                    Here Some basic question people wants to know, about us or login register. <br /> Some common question is given below.
                </p>
            </div>
            <div className="hero-content flex p-4">

                <div className="text-center lg:text-left flex-1 hidden md:block">
                    {/* <img className='' src={FAQ} alt="" /> */}
                    {
                        isDark ?
                            // <img className='' src={FAQDark} alt="" />
                            <Lottie style={{ width: '500px' }} animationData={faDark} loop={true}></Lottie>
                            :
                            <img className='' src={faqG} alt="" />
                    }
                </div>

                <div className=" w-full  shadow-2xl flex-1 rounded-2xl">
                    <div className="collapse collapse-arrow bg-base-100 border border-base-300 dark:bg-primary dark:hover:border-secondary">
                        <input type="radio" name="my-accordion-2" defaultChecked />
                        <div className="collapse-title font-semibold dark:text-white">How do I create an account?</div>
                        <div className="collapse-content text-sm dark:text-white">Click the "Register" button in the top right corner and follow the registration process.</div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-100 border border-base-300 mt-1 dark:bg-primary dark:hover:border-secondary">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold dark:text-white">I forgot my password. What should I do?</div>
                        <div className="collapse-content text-sm dark:text-white">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-100 border border-base-300 mt-1 dark:bg-primary dark:hover:border-secondary">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold dark:text-white">How do I update my profile information?</div>
                        <div className="collapse-content text-sm dark:text-white">Go to "Profile" settings and select "Edit Profile" to make changes.</div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-100 border border-base-300 mt-1 dark:bg-primary dark:hover:border-secondary">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold dark:text-white">Can i sign up with my google account?</div>
                        <div className="collapse-content text-sm dark:text-white">Yes you can.</div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-100 border border-base-300 mt-1 dark:bg-primary dark:hover:border-secondary">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold dark:text-white">How does CoinLeaf work?</div>
                        <div className="collapse-content text-sm dark:text-white">Task creators (buyers) post small jobs, and workers complete them. Once approved, workers earn coins which they can later withdraw.</div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 border border-base-300 mt-1 dark:bg-primary dark:hover:border-secondary">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold dark:text-white">What is <span className='text-primary dark:text-white'>CoinLeaf </span>
                            ?
                        </div>
                        <div className="collapse-content text-sm dark:text-white"> CoinLeaf is a micro-task and earning platform where users can complete small tasks and earn coins that can be withdrawn as real money.</div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-100 border border-base-300 mt-1 dark:bg-primary dark:hover:border-secondary">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold dark:text-white">Who can join CoinLeaf?</div>
                        <div className="collapse-content text-sm dark:text-white">Anyone above the minimum legal age in their country with a valid email can register as a buyer or a worker.</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;