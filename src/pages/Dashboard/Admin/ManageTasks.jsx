import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';
import Swal from 'sweetalert2';
import Loading from '../../../components/Loading/Loading';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';

const ManageTasks = () => {
    const axiosInstance = useAxios();
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();

    const { data: tasks = [], isLoading } = useQuery({
        queryKey: ['admin-tasks'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/tasks');
            return res.data;
        }
    });

    const deleteTaskMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/all-tasks/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['admin-tasks']);
            Swal.fire('Deleted!', 'Task has been deleted and refund (if applicable) processed.', 'success');
        }
    });

    const completeTaskMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/tasks/${id}/complete`, { status: 'complete' });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['admin-tasks']);
            Swal.fire('Completed!', 'Task status updated to complete.', 'success');
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete the task and refund coins (if needed).',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTaskMutation.mutate(id);
            }
        });
    };

    const handleComplete = (id) => {
        Swal.fire({
            title: 'Complete this task?',
            text: 'Are you sure you want to mark this task as complete?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Yes, complete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                completeTaskMutation.mutate(id);
            }
        });
    };

    if (isLoading) return <div className="text-center text-gray-600 dark:text-gray-300 py-10"><Loading /></div>;

    return (
        <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
            <h2 className="text-2xl font-bold mb-6">Manage Buyer Tasks</h2>
            <div className="overflow-x-auto rounded shadow">
                <table className="table w-full">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Buyer</th>
                            <th>Workers</th>
                            <th>Pay</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Deadline</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={task._id} className="hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer">
                                <td>{index + 1}</td>
                                <td><img src={task.task_image_url} className="w-12 h-12 rounded" alt="task" /></td>
                                <td>{task.task_title}</td>
                                <td>{task.buyer_name}</td>
                                <td>{task.required_workers}</td>
                                <td>${task.payable_amount}</td>
                                <td>${task.total_cost}</td>
                                <td>
                                    <span className={`badge ${task.status === 'pending' ? 'badge-warning' : 'badge-success'}`}>
                                        {task.status}
                                    </span>
                                </td>
                                <td>{task.completion_date}</td>
                                <td className="flex flex-col gap-2">
                                    <button
                                        className="btn btn-sm btn-error text-white"
                                        onClick={() => handleDelete(task._id)}
                                    >
                                        Delete
                                    </button>
                                    {task.required_workers === 0 && task.status !== 'complete' && (
                                        <button
                                            className="btn btn-sm btn-success text-white"
                                            onClick={() => handleComplete(task._id)}
                                        >
                                            Complete
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageTasks;
