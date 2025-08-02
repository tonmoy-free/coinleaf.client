import React, { useContext, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';


import Swal from 'sweetalert2';
import useAxios from '../../../hooks/useAxios';
import { AuthContext } from '../../../provider/AuthProvider';
import BuyerTaskUpdateModal from '../../../components/Modal/BuyerTaskUpdateModal';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';

const MyTasks = () => {
    const axiosInstance = useAxios();
    const queryClient = useQueryClient();
    const { user } = useContext(AuthContext);
    const axiosSecure =useAxiosSecure();

    //Update Modal
    const [selectedTask, setSelectedTask] = useState(null);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);

    //Update Modal
    const handleOpenUpdate = (task) => {
        setSelectedTask(task);
        setIsUpdateOpen(true);
    };

    const { data: tasks = [] } = useQuery({
        queryKey: ['tasks', user?.email],
        enabled: !!user?.email, // user.email না থাকলে query disable থাকবে
        queryFn: async () => {
            const res = await axiosSecure.get(`/tasks/buyer/${user.email}`);
            return res.data;
        },
    });

    const deleteTask = async (task) => {
        const { _id, required_workers, payable_amount, status } = task;
        const total = required_workers * payable_amount;
        const willRefund = status !== 'completed';

        Swal.fire({
            title: 'Are you sure?',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/tasks/${_id}`);
                if (willRefund) {
                    await axiosSecure.patch(`/users/coin/refund/${user.email}`, { coin: total });
                }
                Swal.fire('Deleted!', '', 'success');
                queryClient.invalidateQueries(['tasks', user.email]);
            }
        });
    };

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead className='bg-primary text-white dark:bg-secondary'>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Workers</th>
                        <th>Pay</th>
                        <th>Deadline</th>
                        <th>Submission</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task._id} className='dark:border-b-secondary'>
                            <td className='dark:text-white'>
                                <img className='w-8' src={task.task_image_url} alt="" />
                            </td>
                            <td className='dark:text-white'>{task.task_title}</td>
                            <td className='dark:text-white'>{task.required_workers}</td>
                            <td className='dark:text-white'>{task.payable_amount}</td>
                            <td className='dark:text-white'>{task.completion_date}</td>
                            <td className='dark:text-white'>{task.submission_info}</td>
                            <td className='flex gap-1'>
                                <button onClick={() => handleOpenUpdate(task)} className="btn btn-xs btn-info">
                                    Update
                                </button>
                                <button onClick={() => deleteTask(task)} className="btn btn-xs btn-error">
                                    Delete
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                isUpdateOpen && selectedTask && (
                    <BuyerTaskUpdateModal isOpen={isUpdateOpen} setIsOpen={setIsUpdateOpen} task={selectedTask} />
                )
            }
        </div>


    );
};

export default MyTasks;