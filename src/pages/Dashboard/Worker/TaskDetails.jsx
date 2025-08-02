import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../../hooks/useAxios';
import WorkerSubmissionForm from './WorkerSubmissionForm';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';
import Loading from '../../../components/Loading/Loading';


const TaskDetails = () => {
    const { id } = useParams(); // 🟢 task_id from URL
    const axiosInstance = useAxios();
    const [task, setTask] = useState(null);
    const axiosSecure = useAxiosSecure();

   

    useEffect(() => {
        axiosSecure.get(`/tasks/${id}`)
            .then(res => { setTask(res.data) })
            .catch(err => console.error(err));
    }, [id, axiosSecure]);

    if (!task) return <p className="text-center mt-10"><Loading></Loading></p>;

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            <div className="bg-base-100 shadow-md p-6 rounded-xl dark:text-white dark:bg-gray-600">
                <img src={task.task_image_url} alt="task" className="rounded-xl mb-4 w-25 max-h-60 " />
                <h2 className="text-2xl font-bold mb-2">{task.task_title}</h2>
                <p><span className="font-semibold">Details:</span> {task.task_detail}</p>
                <p><span className="font-semibold">Submission Requirement:</span> {task.submission_info}</p>
                <p><span className="font-semibold">Buyer:</span> {task.buyer_name}</p>
                <p><span className="font-semibold">Deadline:</span> {task.completion_date}</p>
                <p><span className="font-semibold">Payment:</span> {task.payable_amount} Coins</p>
                <p><span className="font-semibold">Remaining Workers Needed:</span> {task.required_workers}</p>
            </div>

            {/* 🟢 Submission Form */}
            <div className="bg-base-200 p-6 rounded-xl dark:bg-gray-600">
                <h3 className="text-xl dark:text-white font-semibold mb-4">Submit Your Work</h3>
                <WorkerSubmissionForm task={task} />
            </div>
        </div>
    );
};

export default TaskDetails;
