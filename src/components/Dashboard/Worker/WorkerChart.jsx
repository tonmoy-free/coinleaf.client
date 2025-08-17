import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';



const WorkerChart = ({ totalSubmissions, totalPending, totalEarnings }) => {

    // const data = [
    //     { name: stats.totalWorkers, totalBuyers: stats.totalBuyers, totalCoins: stats.totalCoins, totalPayments: stats.totalPayments }
    // ];

    const data01 = [
        { name: 'Total Submissions', value: totalSubmissions },
        { name: 'Total Pending', value: totalPending },
        { name: 'Total Earnings', value: totalEarnings },
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // customize colors

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
                    // label={({ name, percent, x, y }) => (
                    //     <text
                    //         x={x}
                    //         y={y}
                    //         textAnchor="middle"
                    //         dominantBaseline="central"
                    //         fontWeight="bold"
                    //         fontSize={14}
                    //         fill="#333"
                    //     >
                    //         {name} {(percent * 100).toFixed(0)}%
                    //     </text>
                    // )}
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