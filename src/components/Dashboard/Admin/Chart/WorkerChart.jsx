import React from 'react';
import useAxios from '../../../../hooks/useAxios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/UseAxiosSecure';
import Loading from '../../../Loading/Loading';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

// const data01 = [
//     { name: 'Group A', value: 400 },
//     { name: 'Group B', value: 300 },
//     { name: 'Group C', value: 300 },
//     { name: 'Group D', value: 200 },
//     { name: 'Group E', value: 278 },
//     { name: 'Group F', value: 189 },
// ];



const WorkerChart = ({ stats }) => {
    const axiosInstance = useAxios();
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();
    console.log(stats.totalWorkers)

    // const data = [
    //     { name: stats.totalWorkers, totalBuyers: stats.totalBuyers, totalCoins: stats.totalCoins, totalPayments: stats.totalPayments }
    // ];

    const data01 = [
        { name: 'Buyers', value: stats.totalBuyers },
        { name: 'Total Coin', value: stats.totalCoins },
        { name: 'Workers', value: stats.totalWorkers },
        { name: 'Total Payments', value: stats.totalPayments },
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // customize colors


    // const { data: stats = {}, isLoading: statsLoading } = useQuery({
    //     queryKey: ['adminStats'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get('/admin/stats');
    //         return res.data;
    //     },
    // });

    // if (statsLoading) return <div className="text-center text-gray-400 dark:text-gray-300"><Loading></Loading></div>;
    return (
        <div>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart >
                    <Pie
                        dataKey="value"
                        isAnimationActive={true}
                        data={data01}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    >
                        {data01.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WorkerChart;