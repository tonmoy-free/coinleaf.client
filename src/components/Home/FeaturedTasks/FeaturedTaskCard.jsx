import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { BiDislike, BiLike } from "react-icons/bi";
import { Link } from 'react-router';
import { AuthContext } from '../../../provider/AuthProvider';
import { Tooltip } from 'react-tooltip';
import { FaCoins } from 'react-icons/fa';

const FeaturedTaskCard = ({ task }) => {
    const { user } = useContext(AuthContext);
    // const { _id, task_image_url, task_title, task_detail, buyer_name, completion_date, required_workers } = task;


    return (
        <div className="card bg-base-100 dark:bg-gray-800 md:w-96 w-full shadow-sm border border-gray-200 hover:border-primary dark:border-primary dark:hover:border-secondary  mt-8 dark:text-white">

            <img
                src={task.task_image_url}
                alt="task"
                className=" w-full h-full object-cover rounded px-4 py-4" />

            <div className="card-body items-center ">
                <h2 className="card-title dark:text-white text-center">
                    {task.task_title.length > 25 ? task.task_title.slice(0, 35) + "..." : task.task_title}
                </h2>
                <p className='dark:text-white text-center'>
                    {task.task_detail.length > 30 ? task.task_detail.slice(0, 35) + "...." : task.task_detail}
                </p>
                <p><strong>Buyer :</strong> {task.buyer_name}</p>
                <p><strong>Deadline :</strong> {task.completion_date}</p>
                <p className="flex gap-1 items-center">
                    <strong>Pay :</strong>
                    <div><FaCoins></FaCoins></div>
                    <div>{task.payable_amount} </div>

                    <div>coins</div>
                </p>
                <p><strong>Needed :</strong> {task.required_workers}</p>

            </div>
            <div className='flex justify-around items-center pb-5'>


                <div className="card-actions">
                    <Link to={`/dashboard/task-details/${task._id}`}>
                        <button className="btn btn-outline btn-primary hover:bg-secondary hover:border-secondary dark:text-white dark:border-white rounded-lg">View Details</button>
                    </Link>
                </div>


            </div>
        </div>
    );
};

export default FeaturedTaskCard;