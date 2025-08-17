import { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';
import { FaCoins } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';
import Loading from '../../../components/Loading/Loading';
import WorkerChart from '../../../components/Dashboard/Worker/WorkerChart';

const WorkerHome = () => {
    const { user } = useContext(AuthContext);
    const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure();

    const { data: submissions = [], isLoading } = useQuery({
        queryKey: ['worker-home', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/worker/home/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    const totalSubmissions = submissions.length;
    const totalPending = submissions.filter(sub => sub.status === 'pending').length;
    const totalEarnings = submissions
        .filter(sub => sub.status === 'approved')
        .reduce((sum, sub) => sum + (sub.payable_amount || 0), 0);

    const approvedSubmissions = submissions.filter(sub => sub.status === 'approved');

    if (isLoading) return <div className="text-center py-10"><Loading></Loading></div>;

    return (
        <div className="p-6 text-gray-800 dark:text-white">
            <h2 className="text-2xl font-bold mb-6">Worker Dashboard</h2>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                <div className="p-4 bg-white dark:bg-gray-800 shadow rounded">
                    <p className="text-sm">Total Submissions</p>
                    <h3 className="text-xl font-semibold">{totalSubmissions}</h3>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 shadow rounded">
                    <p className="text-sm">Pending Submissions</p>
                    <h3 className="text-xl font-semibold">{totalPending}</h3>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 shadow rounded">
                    <p className="text-sm">Total Earnings</p>
                    <div className='flex gap-2 items-center justify-start'>
                        <FaCoins />
                        <h3 className="text-xl font-semibold">{totalEarnings}</h3>
                    </div>
                </div>
            </div>

            <div>
                <WorkerChart
                    totalSubmissions={totalSubmissions}
                    totalPending={totalPending}
                    totalEarnings={totalEarnings}
                ></WorkerChart>
            </div>

            {/* Approved Submissions Table */}
            <div className="overflow-x-auto rounded shadow">
                <table className="table w-full">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                        <tr>
                            <th>#</th>
                            <th>Task Title</th>
                            <th>Payable Amount Coin</th>
                            <th>Buyer</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {approvedSubmissions.map((sub, index) => (
                            <tr key={sub._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                                <td>{index + 1}</td>
                                <td>{sub.task_title}</td>
                                <td>{sub.payable_amount}</td>
                                <td>{sub.buyer_name}</td>
                                <td>
                                    <span className="badge badge-success">{sub.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {approvedSubmissions.length === 0 && (
                    <p className="text-center p-4 text-gray-500">No approved submissions yet.</p>
                )}
            </div>
        </div>
    );
};

export default WorkerHome;
