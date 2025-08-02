// Payment.jsx
import { useNavigate } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxios from '../../../hooks/useAxios';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';




const packages = [
    { coins: 10, price: 1 },
    { coins: 150, price: 10 },
    { coins: 500, price: 20 },
    { coins: 1000, price: 35 },
];

const Payment = () => {
    const navigate = useNavigate();
    const axiosInstance = useAxios();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const handleCheckout = async ({ coins, price }) => {
        const res = await axiosSecure.post('/create-payment-intent', {
            email: user.email,
            coinAmount: coins,
            price
        });

        const clientSecret = res.data.clientSecret;
        navigate('/dashboard/checkout', { state: { clientSecret, coins, price } });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {packages.map((pkg, idx) => (
                <div key={idx} className="card bg-base-100 shadow-md p-4 dark:bg-gray-700">
                    <h2 className="text-xl dark:text-white font-bold">{pkg.coins} Coins</h2>
                    <p className="text-gray-500 dark:text-white">= ${pkg.price}</p>
                    <button onClick={() => handleCheckout(pkg)} className="btn btn-primary mt-4 transition-colors duration-400 hover:border-None ease-in-out hover:bg-secondary hover:border-none">
                        Buy Now
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Payment;
