import React, { useEffect, useState } from 'react';
import LogoBlue from '../Logo/LogoBlue';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { GrLocation } from 'react-icons/gr';
import { IoCallOutline } from 'react-icons/io5';
import { LuSend } from 'react-icons/lu';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import LogoWhite from '../Logo/LogoWhite';
import { Link } from 'react-router';

const FooterOne = () => {
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
        <footer className="px-4 divide-y dark:bg-black dark:text-white bg-blue-100">
            <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
                <div className="lg:w-1/3">
                    <div rel="noopener noreferrer" className=" justify-center space-x-3 lg:justify-start">
                        <div className="flex items-center md:justify-start  justify-center  rounded-full">
                            <div className='md:text-start text-center'>
                                {
                                    isDark ?
                                        <LogoWhite></LogoWhite>

                                        :
                                        <LogoBlue ></LogoBlue>
                                }
                            </div>
                        </div>
                        <span className="self-center text-2xl font-semibold">

                            <div className="flex-1 space-y-3 ">

                                <div className='flex md:justify-start justify-center items-center gap-4 dark:hover:text-secondary hover:text-primary mt-5'>
                                    <p className='hidden md:block'><IoMdInformationCircleOutline className='text-xl' /></p>
                                    <p className='text-sm font-semibold  cursor-pointer text-center md:text-start'>Contact info </p>
                                </div>

                                <div className="flex  items-center md:justify-start justify-center gap-3 dark:hover:text-secondary  hover:text-primary  cursor-pointer">
                                    <GrLocation className='text-xl pt-1 hidden md:block' />
                                    <p className="text-sm ">CoinLeaf Tower,
                                        Tikatuli, Mutashop <br /> Road, Jaupol-1236,
                                        Dhaka, Bangladesh</p>
                                </div>
                                <div className="flex  items-center gap-3 justify-center md:justify-start dark:hover:text-secondary  hover:text-primary  cursor-pointer">
                                    <IoCallOutline className='text-xl pt-0 hidden md:block' />
                                    <p className="text-sm">01677 057 845 </p>
                                </div>
                                <div className="flex  items-center gap-3 justify-center md:justify-start dark:hover:text-secondary  hover:text-primary  cursor-pointer">
                                    <LuSend className='text-xl pt-1 hidden md:block' />
                                    <p className="text-sm">coinleaf@coinleaf.com</p>
                                </div>


                            </div>
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-3 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
                    <div className="space-y-3">
                        <h3 className="tracking-wide font-medium uppercase dark:hover:text-secondary  hover:text-primary  cursor-pointer ">Product</h3>
                        <ul className="space-y-1">

                            <li>
                                <Link className='dark:hover:text-secondary  hover:text-primary  cursor-pointer' rel="noopener noreferrer" to='/faq'>FAQ</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="tracking-wide uppercase font-medium  dark:hover:text-secondary  hover:text-primary  cursor-pointer">Company</h3>
                        <ul className="space-y-1">
                            <li>
                                <Link className='dark:hover:text-secondary  hover:text-primary  cursor-pointer' rel="noopener noreferrer" to="/privacy-policy">Privacy</Link>
                            </li>
                            <li>
                                <Link className='dark:hover:text-secondary  hover:text-primary  cursor-pointer' rel="noopener noreferrer" to='/terms-Of-service'>Terms of Service</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className=" font-medium uppercase dark:hover:text-secondary  hover:text-primary  cursor-pointer">Developers</h3>
                        <ul className="space-y-1">
                            <li>
                                <Link className='dark:hover:text-secondary  hover:text-primary  cursor-pointer' rel="noopener noreferrer" to='/public-api'>Public API</Link>
                            </li>
                            <li>
                                <a className='dark:hover:text-secondary  hover:text-primary  cursor-pointer' rel="noopener noreferrer" href="#">Documentation</a>
                            </li>
                            <li>
                                <a className='dark:hover:text-secondary  hover:text-primary  cursor-pointer' rel="noopener noreferrer" href="#">Guides</a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <div className="uppercase dark:text-white">Social media</div>
                        <div className="flex justify-start space-x-3">
                            <Link to="https://www.facebook.com/md.tonmoy.khan.132489/" rel="noopener noreferrer" href="#" title="Facebook" className="flex items-center p-1" target="_blank">
                                <FaSquareFacebook className='text-2xl hover:text-primary dark:hover:text-secondary' />
                            </Link>
                            <Link to="https://www.linkedin.com/" rel="noopener noreferrer" href="#" title="Linkedin" className="flex items-center p-1" target="_blank">
                                <FaLinkedin className='text-2xl hover:text-primary dark:hover:text-secondary' />
                            </Link>
                            <Link to="https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-tonmoy-free" rel="noopener noreferrer" href="#" title="Github" className="flex items-center p-1" target="_blank">
                                <FaGithub className='text-2xl hover:text-primary dark:hover:text-secondary' />
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
            <div className="py-6 text-sm text-center dark:text-white">© 2025 CoinLeaf  All rights reserved.</div>
        </footer>
    );
};

export default FooterOne;