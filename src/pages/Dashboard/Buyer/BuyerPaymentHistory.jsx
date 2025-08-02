import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxios from '../../../hooks/useAxios';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';
import Loading from '../../../components/Loading/Loading';

const BuyerPaymentHistory = () => {
    const axiosInstance = useAxios();
    const { user } = useContext(AuthContext);
    const axiosSecure =useAxiosSecure();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        },
    });

    if (isLoading) {
        return <p className="text-center mt-10 dark:text-white"><Loading></Loading></p>;
    }

    return (
        <div className="p-4 min-h-screen bg-white dark:bg-gray-900">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Payment History
            </h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                        <tr>
                            <th>#</th>
                            <th>Coins</th>
                            <th>Price ($)</th>
                            <th>Transaction ID</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800 dark:text-gray-100">
                        {payments.map((payment, index) => (
                            <tr key={payment._id} className="border-b dark:border-gray-700">
                                <td>{index + 1}</td>
                                <td>{payment.coinAmount}</td>
                                <td>{payment.price}</td>
                                <td className="text-sm break-all text-blue-600 dark:text-blue-400">
                                    {payment.transactionId}
                                </td>
                                <td>
                                    {new Date(payment.date).toLocaleString('en-BD', {
                                        dateStyle: 'medium',
                                        timeStyle: 'short',
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {payments.length === 0 && (
                    <p className="text-center mt-6 text-gray-500 dark:text-gray-400">No payment history found.</p>
                )}
            </div>
        </div>
    );
};

export default BuyerPaymentHistory;
