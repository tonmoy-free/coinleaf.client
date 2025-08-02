import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

const fetchTopWorkers = async (axiosSecure) => {
    const res = await axiosSecure.get("/top-workers");
    return res.data;
};

const BestWorkers = () => {
    const axiosInstance = useAxios()

    const { data: topWorkers = [], isLoading, isError, error } = useQuery({
        queryKey: ["top-workers"],
        queryFn: () => fetchTopWorkers(axiosInstance)
    });

    if (isLoading) return <div className="text-center py-10 text-gray-600 dark:text-gray-300">Loading top workers...</div>;
    if (isError) return <div className="text-red-500">Error: {error.message}</div>;

    return (
        <section className="py-10 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800 bg-gradient-to-r from-blue-100 to-red-100">
            <div className="max-w-6xl mx-auto px-4">
                <div className='text-center mb-8'>
                    <h1 className='text-3xl md:text-5xl font-bold text-primary dark:text-secondary'>Best Workers</h1>
                    <p className='text-sm md:text-base text-gray-600 dark:text-gray-300 mt-2'>
                        Based on their performance, here are the top 6 workers with the most coins.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {topWorkers.map((worker, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 flex items-center gap-4">
                            <img
                                src={worker.photoUrl || 'https://i.ibb.co/Tg0B9x2/default-avatar.png'}
                                alt={worker.name}
                                className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
                            />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                    {worker.name}
                                </h3>
                                <p className="text-yellow-500 font-medium">
                                    🪙 {worker.coins} Coins
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BestWorkers;
