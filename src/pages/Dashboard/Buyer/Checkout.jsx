import { useLocation, useNavigate } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext } from 'react';
import useAxios from '../../../hooks/useAxios';
import { AuthContext } from '../../../provider/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';

const Checkout = () => {
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { clientSecret, coins, price } = location.state || {};

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card, billing_details: { email: user.email } }
        });

        if (result.error) {
            alert(result.error.message);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                await axiosSecure.post('/payments', {
                    email: user.email,
                    coinAmount: coins,
                    price,
                    transactionId: result.paymentIntent.id,
                });
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Payment Successfully Done!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/dashboard/purchase-coin", { replace: true });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
            <CardElement />
            <button className="btn btn-primary" type="submit" disabled={!stripe}>
                Pay ${price}
            </button>
        </form>
    );
};

export default Checkout;
