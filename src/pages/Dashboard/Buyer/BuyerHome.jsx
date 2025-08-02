// BuyerHome.jsx
import { useContext, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxios from '../../../hooks/useAxios';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';
import Loading from '../../../components/Loading/Loading';

const BuyerHome = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosInstance = useAxios();
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();

    // Fetch user's tasks
    const { data: tasks = [] } = useQuery({
        queryKey: ['buyer-tasks', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tasks/buyer/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    // Fetch user's payments
    const { data: payments = [] } = useQuery({
        queryKey: ['buyer-payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    // Fetch submissions to review
    const { data: submissions = [] } = useQuery({
        queryKey: ['buyer-submissions', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/buyer/submissions/${user.email}?status=pending`);
            return res.data;
        },
        enabled: !!user?.email
    });

    const approveMutation = useMutation({
        mutationFn: async (submission) => {
            await axiosSecure.patch(`/submissions/approve/${submission._id}`);
            // await axiosSecure.patch(`/users/increase-coin/${submission.worker_email}`, {
            //     amount: submission.payable_amount
            // });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['buyer-submissions']);
            Swal.fire('Approved!', '', 'success');
        }
    });

    const rejectMutation = useMutation({
        mutationFn: async (submission) => {
            await axiosSecure.patch(`/submission/reject/${submission._id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['buyer-submissions']);
            Swal.fire('Rejected!', '', 'info');
        }
    });

    const totalTasks = tasks.length;
    const pendingWorkers = tasks.reduce((sum, t) => sum + t.required_workers, 0);
    const totalPayments = payments.reduce((sum, p) => sum + p.price, 0);
    if (loading) return <Loading></Loading>;

    return (
        <div data-aos="zoom-in">
            <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
                <h2 className="text-2xl font-bold mb-6">Buyer Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">
                        <h4 className="text-lg">Total Tasks</h4>
                        <p className="text-2xl font-bold">{totalTasks}</p>
                    </div>
                    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">
                        <h4 className="text-lg">Pending Tasks</h4>
                        <p className="text-2xl font-bold">{pendingWorkers}</p>
                    </div>
                    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">
                        <h4 className="text-lg">Total Payment</h4>
                        <p className="text-2xl font-bold">${totalPayments}</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <h3 className="text-xl font-semibold mb-4">Pending Submissions</h3>
                    <table className="table w-full">
                        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                            <tr>
                                <th>No</th>
                                <th>Worker</th>
                                <th>Task</th>
                                <th>Payable</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map((s, index) => (
                                <tr key={s._id} className="hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer">
                                    <td>{index + 1}</td>
                                    <td>{s.worker_name}</td>
                                    <td>{s.task_title}</td>
                                    <td>{s.payable_amount}</td>
                                    <td className="space-x-2">
                                        <button
                                            onClick={() => Swal.fire('Submission Detail', s.submission_details, 'info')}
                                            className="btn btn-sm btn-info"
                                        >
                                            View Submission
                                        </button>
                                        <button
                                            onClick={() => approveMutation.mutate(s)}
                                            className="btn btn-sm btn-success"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => rejectMutation.mutate(s)}
                                            className="btn btn-sm btn-error"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BuyerHome;
