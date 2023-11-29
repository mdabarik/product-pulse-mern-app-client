import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import useSingleUser from "../../../../hooks/useSingleUser";
import { toast } from 'react-hot-toast';
import { MdOutlinePayment } from "react-icons/md";



const CheckoutForm = ({ price, setOpen }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const [clicked, setClicked] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [currUser, isLoding, refetch] = useSingleUser();

    // console.log('price to pay', price);

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price: price })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, price])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setClicked(true)

        if (!stripe || !elements) {
            setClicked(false);
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            setClicked(false);
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            // console.log('payment error', error);
            setError(error.message);
        }
        else {
            // console.log('payment method', paymentMethod)
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            setClicked(false);
            // console.log('confirm error')
        }
        else {
            // console.log('payment intent', paymentIntent)
            setOpen(false);
            if (paymentIntent.status === 'succeeded') {
                setOpen(false);
                setClicked(false)
                // console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                toast.success("Payment successfull, all featured unlocked.")

                const payment = {
                    email: user?.email,
                    price: price,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    status: 'pending'
                }

                axiosSecure.patch(`/user-subscription/${user?.email}`, { isSubscribed: 'yes', status: 'Verified' })
                    .then(res => {
                        // console.log('user subscribed status updated', res);
                        if (res.data.modifiedCount > 0) {
                            refetch();
                        }
                    })
                    .catch(err => {
                        console.log('user subscribed status updated', err);
                    })

                const res = await axiosSecure.post('/payments', payment);
                // console.log('payment saved', res.data);
                // refetch();
                if (res.data?.paymentResult?.insertedId) {
                    //
                }

            }

        }

    }

    return (
        <div className="">

            <form onSubmit={handleSubmit} className="stripe-form border-2 p-8">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                                backgroundColor: '#fff',
                            },
                            invalid: {
                                color: '#9e2146',
                                border: '1px solid #9e2146',  // Adjust border color for invalid state
                            },
                            height: '500px'
                        },
                    }}
                />

                <div className="flex flex-col items-center justify-center my-3 mb-3 mt-8">

                    {
                        clicked ?
                            <span className="loading loading-bars loading-lg"></span>
                            :
                            <button className="bg-[orangered] hover:bg-[#b34720] text-white text-sm px-2 md:px-4 py-1 md:py-2 flex gap-2" type="submit" disabled={!stripe || !clientSecret}>
                                <MdOutlinePayment className="text-xl text-white" />
                                <span>Confrim Payment ${price}</span>
                            </button>
                    }

                    <div className="mt-2">
                        <p className="text-red-600">{error}</p>
                        {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
                    </div>
                </div>
            </form>

        </div>
    );
};

export default CheckoutForm;