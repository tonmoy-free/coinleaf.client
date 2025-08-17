import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";


import useAxios from "../../hooks/useAxios";
import Loading from "../../components/Loading/Loading";
import { FaCoins } from "react-icons/fa";

const TaskListCards = () => {
    const axiosInstance = useAxios();


    const { data: tasks = [], isLoading } = useQuery({
        queryKey: ['all-tasks'],
        queryFn: async () => {
            const res = await axiosInstance.get('/all-tasks/available');
            return res.data;
        }
    });

    if (isLoading) return <div className="text-center text-gray-600 dark:text-gray-300 py-10"><Loading></Loading></div>;

    return (
        <div className="dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800 bg-gradient-to-r from-blue-100 to-red-100">


            <div className="w-11/12 mx-auto pb-5">
                <div className='pt-10'>
                    <h1 className='text-center text-2xl md:text-5xl font-extrabold text-primary mb-4 dark:text-secondary'>All Tasks</h1>
                    <p className='text-center px-6 md:px-0 text-xs md:text-base font-normal text-gray-600 mb-2 lg:mb-8 md:mb-8 dark:text-white'>
                        “Discover Countless Tasks, Complete with Ease, and Earn Coins Anytime, Anywhere <br />— Your Earning Journey Starts Here.”
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ">
                    {tasks.map(task => (
                        <div key={task._id} className="card bg-white dark:bg-gray-800 shadow-md dark:text-white p-4 ">
                            <img
                                src={task.task_image_url}
                                alt="Task"
                                className="w-full h-full object-cover rounded mb-2"
                            />
                            <h2 className="text-lg font-bold">
                                {/* {task.task_title} */}
                                {task.task_title.length > 50 ? task.task_title.slice(0, 35) + "..." : task.task_title}
                            </h2>
                            <p><strong>Buyer :</strong> {task.buyer_name}</p>
                            <p><strong>Deadline :</strong> {task.completion_date}</p>
                            <p className="flex gap-1 items-center">
                                <strong>Pay :</strong>
                                <div><FaCoins></FaCoins></div>
                                <div>{task.payable_amount} </div>

                                <div>coins</div>
                            </p>
                            <p><strong>Needed :</strong> {task.required_workers}</p>
                            <Link to={`/dashboard/task-details/${task._id}`} className="btn btn-sm btn-primary mt-3 transition-colors duration-400 hover:border-None ease-in-out hover:bg-secondary hover:border-none"
                            >
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default TaskListCards;

