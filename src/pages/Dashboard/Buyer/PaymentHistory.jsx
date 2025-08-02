// PaymentHistory.jsx
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxios from '../../../hooks/useAxios';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';
import Loading from '../../../components/Loading/Loading';




const PaymentHistory = () => {
    const axiosInstance = useAxios();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    });

    if (isLoading) return <div className="text-center text-gray-600 dark:text-gray-300 py-10"><Loading></Loading></div>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Payment History</h2>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Coins</th>
                        <th>Price ($)</th>
                        <th>Transaction ID</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map(p => (
                        <tr key={p._id}>
                            <td>{p.email}</td>
                            <td>{p.coinAmount}</td>
                            <td>{p.price}</td>
                            <td>{p.transactionId}</td>
                            <td>{new Date(p.date).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;
