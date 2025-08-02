import React, { useContext, useEffect, useState } from 'react';
import coinLeafBlue from '../../assets/logo/coinLeafBlue.png'
import { Link, NavLink } from 'react-router';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import coinLeafWhite from '../../assets/logo/coinLeafWhite.png'
import { AuthContext } from '../../provider/AuthProvider';
import { format } from 'date-fns';
import { Tooltip } from 'react-tooltip';
import { toast } from 'react-toastify';
import pImage from '../../assets/icon/profile.png';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import { FaCoins } from 'react-icons/fa';
import useUserRole from '../../hooks/useUserRole';

const Navbar = () => {
    const { logOut, user, loading } = useContext(AuthContext);
    const [userImage, setUserImage] = useState("");
    const today = new Date();
    const axiosInstance = useAxios();
    const queryClient = useQueryClient();
    const { role } = useUserRole();

    const userRole = role;

    const dashboardHome =
        userRole === "worker" ? "/dashboard/worker-home" :
            userRole === "buyer" ? "/dashboard/buyer-home" :
                userRole === "admin" ? "/dashboard/admin-home" :
                    "/";

    //user data fetch for auth login user
    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosInstance.get(`/users/${user.email}`);
            return res.data;
        },
    });
    // Format as "dd-MM-yyyy"
    const formattedDate = format(today, 'dd-MM-yyyy');
    useEffect(() => {
        if (user?.photoURL && user.photoURL !== userImage) {
            setUserImage(user.photoURL);
        }
    }, [user, userImage]);

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

    const link = (
        <>
            <li className='text-primary dark:text-white'><NavLink to="/">Home</NavLink></li>
            <li className='text-primary dark:text-white'><NavLink to="/allTasks">Tasks</NavLink></li>
            {!user?.email && (
                <>
                    <li className="text-primary md:hidden dark:text-white">
                        <NavLink to="/login" end>Login</NavLink>
                    </li>
                    <li className="text-primary md:hidden dark:text-white">
                        <NavLink to="/login/register">Register</NavLink>
                    </li>
                    <li className="text-primary md:hidden dark:text-white" target="_blank">
                        <NavLink to="https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-tonmoy-free/commits/main/" target="_blank">Join As Developer</NavLink>
                    </li>
                </>
            )}
        </>
    )
    return (
        <>
            <div className='bg-gradient-to-r from-blue-100 to-red-100 dark:bg-gradient-to-r dark:from-black dark:to-blue-900 shadow-sm  dark:border dark:border-b-secondary sticky top-0 z-20'>
                <div className='w-11/12 mx-auto'>
                    <div className="navbar ">
                        <div className="navbar-start">
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className=" lg:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content dark:bg-black bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                    {link}

                                </ul>
                            </div>
                            <div>
                                {
                                    isDark ?
                                        <Link to="/"><img className='md:w-40 w-30' src={coinLeafWhite} alt="" /></Link>
                                        :
                                        <Link to="/"><img className='md:w-40 w-30' src={coinLeafBlue} alt="" /></Link>
                                }
                            </div>
                        </div>
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1">
                                {link}
                            </ul>
                        </div>
                        <div className="navbar-end">
                            <div className='pl-5'>
                                <ThemeToggle></ThemeToggle>
                            </div>

                            <div>
                                {user?.email ?
                                    (<div>
                                        <div className="dropdown dropdown-end ">
                                            <a data-tooltip-id="my-tooltip" data-tooltip-content={user?.displayName}>
                                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                                    <div className="w-10 rounded-full">
                                                        {/* <img
                                            alt="Tailwind CSS Navbar component"
                                            src={pImage} /> */}
                                                        <img className='w-full rounded-full' alt="user" src={`${user?.photoURL ? user?.photoURL : pImage}`} referrerPolicy='no-referrer' />

                                                    </div>
                                                </div>
                                            </a>
                                            <Tooltip id="my-tooltip" />
                                            <ul
                                                tabIndex={0}
                                                className="menu menu-sm dropdown-content bg-base-100 dark:bg-black rounded-box z-1 mt-0 w-35 md:w-54 p-1 md:p-2 lg:p-3 shadow">
                                                {/* <li className='hover:text-[#e2136e] text-xl font-semibold'><p>Users current balance :<span className='font-bold text-2xl text-pink-700'>{balance}</span>BDT</p></li> */}
                                                <div className='hover:text-secondary px-1 md:px-2 lg:px-3 text-center' >
                                                    <p className='cursor-pointer font-medium text-primary hover:text-secondary dark:text-white text-[8px] md:text-[12px]'>{user?.displayName}</p>
                                                </div>
                                                <div className='hover:text-secondary px-1 md:px-2 lg:px-3 text-center' >
                                                    <p className='cursor-pointer font-medium text-primary dark:text-white hover:text-secondary text-[8px] md:text-[12px]'>{user?.email}</p>
                                                </div>
                                                <div className='px-1 text-primary  md:px-2 text-center' >
                                                    <li>
                                                        <Link to="/dashboard">
                                                            <p className="hover:text-secondary dark:text-white font-extrabold text-sm flex gap-2 items-center justify-start">
                                                                <span className='text-[10px] md:text-[14px]'> Available Coins:</span>
                                                                <span><FaCoins /></span>
                                                                <span>{users[0]?.coins || 0}</span>
                                                            </p>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to={dashboardHome}>
                                                            <p className="hover:text-secondary dark:text-white">Dashboard </p>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/profile">
                                                            <p className="hover:text-secondary dark:text-white">Profile </p>
                                                        </Link>
                                                    </li>

                                                    <li>
                                                        <Link to="/editProfile">
                                                            <p className="hover:text-secondary dark:text-white">Update Profile</p>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            onClick={() => {

                                                                logOut().then(
                                                                    () => {
                                                                        toast("log out successfully");
                                                                        window.location.reload();
                                                                    }
                                                                )


                                                            }}
                                                            className="hover:text-secondary dark:text-white">
                                                            Logout

                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-tonmoy-free" target="_blank">
                                                            <p className="hover:text-secondary dark:text-white"
                                                                >Join As Developer</p>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <p className="text-[10px] hover:text-secondary dark:text-white">Date : {formattedDate}</p>
                                                    </li>

                                                </div>
                                                {/* <li className='mt-1'>
                                            <Link onClick={() => {
                                                logOut();
                                                toast("log out successfull");
                                            }} className="btn btn-outline btn-secondary">LogOut</Link>

                                        </li> */}
                                            </ul>
                                        </div>
                                    </div>)

                                    :

                                    (<div className='hidden md:flex justify-center items-center gap-2'>
                                        <div>
                                            <Link to="/login/register" className="btn btn-outline btn-primary dark:border-secondary hover:bg-secondary hover:border-secondary dark:text-white">Register</Link>
                                        </div>
                                        <div>
                                            {
                                                user?.email ?
                                                    <Link onClick={logOut} className="btn btn-outline btn-primary hover:bg-secondary hover:border-secondary dark:text-white dark:border-secondary">LogOut</Link>
                                                    :
                                                    <Link to="/login" className="btn btn-outline btn-primary hover:bg-secondary hover:border-secondary dark:text-white dark:border-secondary">Login</Link>
                                            }
                                        </div>
                                        <div>
                                            <Link to="https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-tonmoy-free" className="btn btn-outline btn-primary dark:border-secondary hover:bg-secondary hover:border-secondary dark:text-white" target="_blank">Join As Developer</Link>
                                        </div>

                                    </div>)


                                }
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;