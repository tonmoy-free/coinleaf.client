import React, { useContext, useEffect, useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import Swal from 'sweetalert2';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';

const Withdrawal = () => {
    const { user } = useContext(AuthContext);
    // console.log(user?.email)
    const axiosInstance = useAxios();
    const queryClient = useQueryClient();
    const [withdrawCoin, setWithdrawCoin] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [paymentSystem, setPaymentSystem] = useState('Bkash');
    const [accountNumber, setAccountNumber] = useState('');
    const axiosSecure = useAxiosSecure();

    // Fetch user coin with TanStack Query
    const { data: userData = {}, isLoading, refetch } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    // useEffect(() => {
    //     console.log("User data from React Query:", userData[0]?.coins); 
    // }, [userData]);



    useEffect(() => {
        if (user?.email) {
            refetch(); // যখনই user.email আসে তখন fetch করবে
        }
    }, [user?.email, refetch]);

    useEffect(() => {
        if (userData[0]?.coins) {
            refetch(); // যখনই userData[0]?.coins আসে তখন fetch করবে
        }
    }, [userData?.coins, refetch]);

    const coin = userData[0]?.coins || 0;

    useEffect(() => {
        setWithdrawAmount((withdrawCoin / 20).toFixed(2));
    }, [withdrawCoin]);

    const mutation = useMutation({
        mutationFn: async (withdrawalData) => {
            const res = await axiosSecure.post('/withdrawals', withdrawalData);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['user', user?.email]);
            Swal.fire('Withdrawal Request Submitted', '', 'success');
            setWithdrawCoin(0);
            setWithdrawAmount(0);
            setAccountNumber('');
        }
    });

    const handleWithdraw = (e) => {
        e.preventDefault();
        if (withdrawCoin > coin || coin < 200 || withdrawCoin <= 0) return;

        const withdrawalData = {
            worker_email: user.email,
            worker_name: user.displayName,
            withdrawal_coin: withdrawCoin,
            withdrawal_amount: parseFloat(withdrawAmount),
            payment_system: paymentSystem,
            account_number: accountNumber,
            withdraw_date: new Date(),
            status: 'pending'
        };

        mutation.mutate(withdrawalData);
    };

    if (isLoading) {
        return <div className="text-center text-gray-700 dark:text-gray-300">Loading coins...</div>;
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 shadow rounded">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Withdraw Coins</h2>
            <p className="mb-2 text-gray-700 dark:text-gray-300">Current Coins: {coin}</p>


            <p className="mb-4 text-gray-700 dark:text-gray-300">Withdrawable Amount: ${(coin / 20).toFixed(2)} USD</p>

            {coin < 200 ? (
                <p className="text-red-600">Insufficient coin (Minimum 200 required)</p>
            ) : (
                <form onSubmit={handleWithdraw} className="space-y-4">
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        placeholder="Coins to withdraw"
                        value={withdrawCoin}
                        onChange={(e) => setWithdrawCoin(Number(e.target.value))}
                        max={coin}
                        min={0}
                    />

                    <input
                        type="number"
                        className="input input-bordered w-full"
                        placeholder="Amount in $"
                        value={withdrawAmount}
                        readOnly
                    />

                    <select
                        className="select select-bordered w-full"
                        value={paymentSystem}
                        onChange={(e) => setPaymentSystem(e.target.value)}
                    >
                        <option>Bkash</option>
                        <option>Rocket</option>
                        <option>Nagad</option>
                        <option>Upay</option>
                    </select>

                    <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Account Number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="btn btn-primary w-full transition-colors duration-400 hover:border-None ease-in-out hover:bg-secondary hover:border-none"
                        disabled={withdrawCoin <= 0 || withdrawCoin > coin || coin < 200}
                    >
                        Withdraw
                    </button>
                </form>
            )}
        </div>
    );
};

export default Withdrawal;