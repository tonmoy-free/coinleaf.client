import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxios from '../../../hooks/useAxios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../provider/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';

const WorkerSubmissionForm = ({ task }) => {
    const { register, handleSubmit, reset } = useForm();
    const axiosInstance = useAxios();
    const { user } = useContext(AuthContext);
    const [uploading, setUploading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const [previewURL, setPreviewURL] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewURL(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewURL('');
        }
    };

    const onSubmit = async (data) => {
        try {
            setUploading(true);

            let imageURL = '';
            const imageFile = data.proof_image[0];

            // Optional image upload
            if (imageFile) {
                const imageFormData = new FormData();
                imageFormData.append('image', imageFile);

                const imgbbKey = import.meta.env.VITE_image_upload_key;
                const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
                    method: 'POST',
                    body: imageFormData,
                });

                const imgData = await res.json();
                imageURL = imgData?.data?.url;
                console.log(imgData?.data?.url)
            }

            // Prepare submission data
            const submission = {
                task_id: task._id,
                task_title: task.task_title,
                payable_amount: task.payable_amount,
                worker_email: user.email,
                worker_name: user.displayName,
                buyer_name: task.buyer_name,
                buyer_email: task.buyer_email,
                submission_details: data.submission_details,
                screenshot_url: imageURL, // can be empty
                status: 'pending',
                date: new Date(),
            };

            await axiosSecure.post('/submissions', submission);

            Swal.fire({
                icon: 'success',
                title: 'Submitted Successfully!',
                timer: 1500,
                showConfirmButton: false,
            });

            reset();
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Submission failed', 'error');
        } finally {
            setUploading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-base-100 p-6 rounded-lg shadow-md dark:bg-gray-800">
            <div>
                <label className="label text-base dark:text-white">Your Submission</label>
                <textarea {...register('submission_details')} required className="textarea textarea-bordered w-full"></textarea>
            </div>

            <div>
                <label className="label text-base dark:text-white">Upload Screenshot (optional)</label>
                <input
                    type="file"
                    {...register('proof_image')}
                    accept="image/*"
                    className="file-input file-input-bordered w-full"
                    onChange={handleImageChange}
                />
                {previewURL && (
                    <div className="mt-4">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Preview:</p>
                        <img src={previewURL} alt="Preview" className="w-40 h-auto rounded border" />
                    </div>
                )}
            </div>


            <button type="submit" className="btn btn-primary transition-colors duration-400 hover:border-None ease-in-out hover:bg-secondary hover:border-none" disabled={uploading}>
                {uploading ? 'Submitting...' : 'Submit Work'}
            </button>
        </form>
    );
};

export default WorkerSubmissionForm;
