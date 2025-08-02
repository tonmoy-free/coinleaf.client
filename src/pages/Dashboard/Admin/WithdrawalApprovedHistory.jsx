import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';
import Loading from '../../../components/Loading/Loading';

const WithdrawalApprovedHistory = () => {
    const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure();

    const { data: withdrawals = [], isLoading } = useQuery({
        queryKey: ['withdrawals', 'approved'],
        queryFn: async () => {
            const res = await axiosSecure.get('/withdrawals/status/approved');
            return res.data;
        },
    });

    if (isLoading) {
        return <div className="text-center text-gray-600 dark:text-gray-300 mt-10"><Loading></Loading></div>;
    }

    return (
        <div className="p-6 bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 min-h-screen transition-colors">
            <h2 className="text-2xl font-bold mb-6">Approved Withdrawals</h2>

            {withdrawals.length === 0 ? (
                <p className="text-gray-700 dark:text-gray-300">No approved withdrawals found.</p>
            ) : (
                <div className="overflow-x-auto rounded shadow">
                    <table className="table w-full">
                        <thead className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-200">
                            <tr>
                                <th>Worker</th>
                                <th>Email</th>
                                <th>Coins</th>
                                <th>Amount ($)</th>
                                <th>Payment</th>
                                <th>Account</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {withdrawals.map((w) => (
                                <tr key={w._id} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                                    <td>{w.worker_name}</td>
                                    <td>{w.worker_email}</td>
                                    <td>{w.withdrawal_coin}</td>
                                    <td>${w.withdrawal_amount}</td>
                                    <td>{w.payment_system}</td>
                                    <td>{w.account_number}</td>
                                    <td>{new Date(w.withdraw_date).toLocaleDateString()}</td>
                                    <td>
                                        <span className="badge badge-success text-white">Approved</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default WithdrawalApprovedHistory;
