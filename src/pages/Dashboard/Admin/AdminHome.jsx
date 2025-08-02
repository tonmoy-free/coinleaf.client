import React, { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';
import { AuthContext } from '../../../provider/AuthProvider';
import Loading from '../../../components/Loading/Loading';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';
import Swal from 'sweetalert2';

const AdminHome = () => {
    const axiosInstance = useAxios();
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading: statsLoading } = useQuery({
        queryKey: ['adminStats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/stats');
            return res.data;
        },
    });

    const { data: withdrawals = [], isLoading: withdrawalLoading } = useQuery({
        queryKey: ['withdrawals-pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/withdrawals-pending');
            return res.data;
        },
    });

    const mutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/withdrawals/approve/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['withdrawals-pending']);
            queryClient.invalidateQueries(['adminStats']);
            Swal.fire('Approved!', 'The withdrawal has been approved.', 'success');
        },
    });

    if (statsLoading || withdrawalLoading) return <div className="text-center text-gray-400 dark:text-gray-300"><Loading></Loading></div>;

    return (
        
            <div className="p-6 max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Admin Dashboard</h1>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    <div className="bg-white dark:bg-gray-800 p-4 shadow rounded text-center">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Workers</h2>
                        <p className="text-2xl text-blue-600 dark:text-blue-300">{stats.totalWorkers}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 shadow rounded text-center">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Buyers</h2>
                        <p className="text-2xl text-green-600 dark:text-green-300">{stats.totalBuyers}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 shadow rounded text-center">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Coin</h2>
                        <p className="text-2xl text-yellow-600 dark:text-yellow-300">{stats.totalCoins}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 shadow rounded text-center">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Payments</h2>
                        <p className="text-2xl text-purple-600 dark:text-purple-300">${stats.totalPayments}</p>
                    </div>
                </div>

                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Pending Withdrawal Requests</h2>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                            <tr>
                                <th>User</th>
                                <th>Coin</th>
                                <th>Amount ($)</th>
                                <th>System</th>
                                <th>Account</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {withdrawals.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-4 text-gray-500 dark:text-gray-400">
                                        No Pending Withdrawal Requests
                                    </td>
                                </tr>
                            ) : (

                                withdrawals.map((item) => (
                                    <tr key={item._id} className="text-gray-700 dark:text-gray-300">
                                        <td>{item.worker_name}</td>
                                        <td>{item.withdrawal_coin}</td>
                                        <td>${item.withdrawal_amount}</td>
                                        <td>{item.payment_system}</td>
                                        <td>{item.account_number}</td>
                                        <td>{new Date(item.withdraw_date).toLocaleDateString()}</td>
                                        <td>
                                            <button
                                                onClick={() => mutation.mutate(item._id)}
                                                className="btn btn-success btn-sm"
                                            >
                                                Approve
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
    
    );
};

export default AdminHome;
