import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';
import Loading from '../../../components/Loading/Loading';

const WithdrawalsHistory = () => {
    const { user } = useContext(AuthContext);
    const axiosInstance = useAxios();
    const axiosSecure =useAxiosSecure();

    const { data: withdrawals = [], isLoading } = useQuery({
        queryKey: ['withdrawals', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/withdrawals/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading) {
        return <div className="text-center text-gray-600 dark:text-gray-300"><Loading></Loading></div>;
    }

    return (
        <div className="overflow-x-auto max-w-4xl mx-auto mt-10 p-4 bg-white dark:bg-gray-800 shadow-md rounded">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Withdrawal History</h2>
            <table className="table w-full">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        <th>Coin</th>
                        <th>Amount ($)</th>
                        <th>System</th>
                        <th>Account</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {withdrawals.map((withdrawal, idx) => (
                        <tr key={idx} className="hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 cursor-pointer">
                            <td>{withdrawal.withdrawal_coin}</td>
                            <td>${withdrawal.withdrawal_amount}</td>
                            <td>{withdrawal.payment_system}</td>
                            <td>{withdrawal.account_number}</td>
                            <td>
                                <span
                                    className={`badge ${withdrawal.status === 'pending'
                                            ? 'badge-warning'
                                            : withdrawal.status === 'approved'
                                                ? 'badge-success'
                                                : 'badge-error'
                                        }`}
                                >
                                    {withdrawal.status}
                                </span>
                            </td>
                            <td>{new Date(withdrawal.withdraw_date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WithdrawalsHistory;
