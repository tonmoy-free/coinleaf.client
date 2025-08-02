import { useForm } from 'react-hook-form';
import { Dialog } from '@headlessui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';

const BuyerTaskUpdateModal = ({ isOpen, setIsOpen, task }) => {
    const { register, handleSubmit, reset } = useForm();
    const queryClient = useQueryClient();
    const axiosInstance = useAxios();
    // console.log(task.task_title)

    // reset form with task data when modal opens
    useEffect(() => {
        if (task) {
            reset({
                task_title: task.task_title,
                task_detail: task.task_detail,
                submission_info: task.submission_info,
            });
        }
    }, [task, reset]);

    const { mutate: updateTask, isLoading } = useMutation({
        mutationFn: (updatedTask) => axiosInstance.patch(`/tasks/${task._id}`, updatedTask),
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks', task.buyer_email]); // match your queryKey
            setIsOpen(false);
            Swal.fire({
                icon: 'success',
                title: 'Task updated successfully!',
                showConfirmButton: false,
                timer: 1500,
                position: 'top-end',
            });
        },
    });

    const onSubmit = (data) => {
        updateTask(data);
        // console.log("data", data)
    };

    const closeModal = () => {
        reset();
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onClose={closeModal} className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-30" />
            <div className="bg-white rounded-xl shadow-lg p-6 z-50 w-full max-w-md mx-auto">
                <Dialog.Title className="text-lg font-semibold mb-4">Update Task</Dialog.Title>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="label">Task Title</label>
                        <input type="text" {...register('task_title')} className="input input-bordered w-full" />
                    </div>

                    <div>
                        <label className="label">Task Detail</label>
                        <textarea {...register('task_detail')} className="textarea textarea-bordered w-full" />
                    </div>

                    <div>
                        <label className="label">Submission Info</label>
                        <input type="text" {...register('submission_info')} className="input input-bordered w-full" />
                    </div>

                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={closeModal} className="btn btn-ghost">Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Updating...' : 'Update Task'}
                        </button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
};

export default BuyerTaskUpdateModal;
