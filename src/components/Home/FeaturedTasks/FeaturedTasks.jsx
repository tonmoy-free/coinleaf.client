import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router';
import { AuthContext } from '../../../provider/AuthProvider';
import Loading from '../../Loading/Loading';
import FeaturedTaskCard from './FeaturedTaskCard';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';


const FeaturedTasks = () => {
    const { user, logOut } = useContext(AuthContext);
    const [displayTasks, setDisplayTasks] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const accessToken = user?.accessToken;
    // console.log(' accessToken', user)
    const axiosInstance = useAxios();


    const { data: tasks = [], isLoading } = useQuery({
        queryKey: ['all-tasks'],
        queryFn: async () => {
            const res = await axiosInstance.get('/all-tasks/available');
            return res.data;
        }
    });

    useEffect(() => {
        if (tasks.length > 0) {
            if (showAll) {
                setDisplayTasks(tasks);
            } else {
                setDisplayTasks(tasks.slice(0, 3));
            }
        }
    }, [tasks, showAll]);

    if (isLoading) return <div className="text-center text-gray-600 dark:text-gray-300 py-10"><Loading></Loading></div>;



    return (
        <div className='w-11/12 mx-auto md:px-0 px-2'>
            <div className=''>
                <h1 className='text-center text-2xl md:text-5xl font-bold text-primary mb-2 dark:text-secondary'>Featured Tasks</h1>
                <p className='text-center px-6 md:px-0 text-xs md:text-base font-normal text-gray-600 mb-4 dark:text-white'>
                    Join The Earning Game...
                </p>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 cursor-pointer'>
                {
                    displayTasks.map(task =>
                        <FeaturedTaskCard
                            key={task._id}
                            task={task}>
                        </FeaturedTaskCard>)
                }
            </div>
            <div className='flex justify-center mt-8 mb-9 '>
                <Link to='/allTasks'>
                    <button
                        type='submit'

                        className="hover:bg-secondary hover:border-secondary border border-primary text-primary  rounded-4xl hover:text-white font-bold text-sm md:text-xl px-7 py-2 md:py-3 cursor-pointer dark:text-white dark:border-white">See All
                    </button>
                </Link>
            </div>
        </div >
    );
};

export default FeaturedTasks;