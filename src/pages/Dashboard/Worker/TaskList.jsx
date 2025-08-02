import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const TaskList = () => {
    const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure();

    const { data: tasks = [], isLoading } = useQuery({
        queryKey: ['worker-tasks'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tasks/available');
            return res.data;
        }
    });

    if (isLoading) return <div className="text-center text-gray-600 dark:text-gray-300 py-10"><Loading></Loading></div>;

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {tasks.map(task => (
                <div key={task._id} className="card bg-base-100 shadow-md p-4 dark:bg-gray-700 dark:text-white">
                    <img
                        src={task.task_image_url}
                        alt="Task"
                        className="w-25 h-25 object-cover rounded mb-2"
                    />
                    <h2 className="text-lg font-bold">{task.task_title}</h2>
                    <p><strong>Buyer:</strong> {task.buyer_name}</p>
                    <p><strong>Deadline:</strong> {task.completion_date}</p>
                    <p><strong>Pay:</strong> {task.payable_amount} coins</p>
                    <p><strong>Needed:</strong> {task.required_workers}</p>
                    <Link to={`/dashboard/task-details/${task._id}`} className="btn btn-sm btn-primary transition-colors duration-400 hover:border-None ease-in-out hover:bg-secondary hover:border-none mt-3">
                        View Details
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
