import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';
import { AuthContext } from '../../../provider/AuthProvider';
import Loading from '../../../components/Loading/Loading';

const MySubmission = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    const { data, isLoading } = useQuery({
        queryKey: ['submissions', user?.email, page, limit],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/submissions/worker/${user.email}?page=${page}&limit=${limit}`);
            return res.data;
        }
    });

    if (isLoading) return <div className="text-center py-10"><Loading /></div>;

    const { submissions, total } = data;

    const totalPages = Math.ceil(total / limit);

    return (
        <div className="overflow-x-auto mt-6 px-4">
            <h2 className="text-xl font-semibold mb-4 text-center dark:text-white">My Submissions</h2>

            <div className="flex justify-between items-center mb-4">
                <div>
                    <label className="mr-2 dark:text-white">Show:</label>
                    <select
                        value={limit}
                        onChange={(e) => {
                            setLimit(parseInt(e.target.value));
                            setPage(1); // Reset to page 1
                        }}
                        className="select select-bordered"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={30}>30</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="btn btn-sm"
                    >
                        Prev
                    </button>
                    <span className="dark:text-white">Page {page} of {totalPages}</span>
                    <button
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                        className="btn btn-sm"
                    >
                        Next
                    </button>
                </div>
            </div>

            <table className="table w-full border dark:text-white">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700 dark:text-white">
                        <th>No</th>
                        <th>Task Title</th>
                        <th>Buyer</th>
                        <th>Payable</th>
                        <th>Submission</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {submissions.map((sub, i) => (
                        <tr key={i} className="hover:bg-gray-700 cursor-pointer">
                            <td>{(page - 1) * limit + i + 1}</td>
                            <td>{sub.task_title}</td>
                            <td>{sub.buyer_name}</td>
                            <td>{sub.payable_amount} coin</td>
                            <td className="max-w-xs truncate">{sub.submission_details}</td>
                            <td>
                                <span
                                    className={`badge px-4 py-2 rounded-full text-white ${sub.status === 'approved'
                                        ? 'bg-green-500'
                                        : sub.status === 'pending'
                                            ? 'bg-yellow-500'
                                            : 'bg-red-500'
                                        }`}
                                >
                                    {sub.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MySubmission;
