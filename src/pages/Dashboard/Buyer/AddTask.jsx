import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxios from '../../../hooks/useAxios';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';

const AddTask = () => {
    const { user } = useContext(AuthContext);

    const [uploading, setUploading] = useState(false);
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const imageUploadKey = import.meta.env.VITE_image_upload_key;

    const onSubmit = async (data) => {
        const {
            task_title,
            task_detail,
            required_workers,
            payable_amount,
            completion_date,
            submission_info,
        } = data;

        const totalPayable = required_workers * payable_amount;

        //  Get current user coin
        const { data: buyer } = await axiosSecure.get(`/users/${user.email}`);
        console.log(buyer)
        console.log(buyer[0].coins)
        if (buyer[0].coins < totalPayable) {
            Swal.fire({
                icon: 'error',
                title: 'Not Enough Coins',
                text: 'Purchase more coins to post this task.',
            });
            return navigate('/dashboard/purchase-coin');
        }


        //  Upload Image to imgbb
        setUploading(true);
        const formData = new FormData();
        formData.append('image', data.task_image_url[0]);

        try {
            const imgbbRes = await fetch(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
                { method: 'POST', body: formData }
            );
            const imgbbData = await imgbbRes.json();
            const imageUrl = imgbbData.data.url;


            // ✅ Prepare Task
            const task = {
                task_title,
                task_detail,
                required_workers: Number(required_workers),
                payable_amount: Number(payable_amount),
                total_cost: totalPayable,
                completion_date,
                submission_info,
                task_image_url: imageUrl,
                buyer_name: user.displayName,
                buyer_email: user.email,
                approved_workers: 0, // initially 0
                status: 'pending',
                createdAt: new Date(),
            };

            //  Save Task
            const taskRes = await axiosSecure.post('/tasks', task);

            //  Deduct Coins
            await axiosSecure.patch(`/users/coin-deduct/${user.email}`, {
                coins: totalPayable,
            });

            reset();
            queryClient.invalidateQueries(['tasks']);

            Swal.fire({
                icon: 'success',
                title: 'Task Added Successfully',
                timer: 1500,
                showConfirmButton: false,
            });

        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Image Upload Failed',
            });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-10 bg-white shadow-lg rounded-lg dark:bg-gray-700">
            <div>
                <h1 className='text-center text-2xl font-bold text-primary dark:text-white'>Add New Task</h1>
                <p className='text-center px-6 md:px-0 text-xs md:text-base font-normal text-gray-600  dark:text-white'>
                    Here Some basic question people wants to know, about us or login register. <br /> Some common question is given below.
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <label className=" text-gray-600 dark:text-white">Task Title</label>
                <input {...register("task_title", { required: true })} placeholder="Task Title" className="input w-full" />
                {errors.task_title && <p className="text-red-500 text-sm">Title is required</p>}

                <label className=" text-gray-600 dark:text-white">Task Detail</label>
                <textarea {...register("task_detail", { required: true })} placeholder="Task Detail" className="textarea w-full" />
                {errors.task_detail && <p className="text-red-500 text-sm">Detail is required</p>}

                <label className=" text-gray-600 dark:text-white">Required Workers</label>
                <input type="number" {...register("required_workers", { required: true, min: 1 })} placeholder="Required Workers" className="input w-full" />

                <label className=" text-gray-600 dark:text-white">Payable Coin per Worker</label>
                <input type="number" {...register("payable_amount", { required: true, min: 1 })} placeholder="Payable Coin per Worker" className="input w-full" />

                <label className=" text-gray-600 dark:text-white">Completing The Task Last Date</label>
                <input type="date" {...register("completion_date", { required: true })} className="input w-full" />

                <label className=" text-gray-600 dark:text-white">What to submit</label>
                <input {...register("submission_info", { required: true })} placeholder="What to submit (e.g., Screenshot)" className="input w-full" />

                <label className=" text-gray-600 dark:text-white">Task Image</label>
                <input type="file" {...register("task_image_url")} className="file-input w-full" />
                {/* <input type="file" {...register("task_image_url", { required: true })} className="file-input w-full" />
                {errors.task_image_url && <p className="text-red-500 text-sm">Image is required</p>} */}

                <button type="submit" className="btn btn-primary
                transition-colors duration-400 hover:border-None ease-in-out hover:bg-secondary hover:border-none w-full" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Add Task'}
                </button>
            </form>
        </div>
    );
};

export default AddTask;
