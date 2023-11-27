import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
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
    // const [cart, refetch] = useCart();
    const navigate = useNavigate();
    const [currUser, isLoding, refetch] = useSingleUser();

    console.log('price to pay', price);

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price: price })
                .then(res => {
                    console.log(res.data.clientSecret);
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
            setClicked(false);
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            setClicked(false);
            console.log('payment method', paymentMethod)
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
            console.log('confirm error')
        }
        else {
            setClicked(true)
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                setOpen(false);
                setClicked(false)
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                toast.success("Payment successfull. All featured unlocked.")

                // now save the payment in the database
                const payment = {
                    email: user?.email,
                    price: price,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert. use moment js to 
                    // cartIds: cart.map(item => item._id),
                    // menuItemIds: cart.map(item => item.menuId),
                    status: 'pending'
                }

                // update isSubscribed: 'yes' and status: 'verified'

                axiosSecure.patch(`/user-subscription/${user?.email}`, { isSubscribed: 'yes', status: 'Verified' })
                    .then(res => {
                        console.log('user subscribed status updated', res);
                        if (res.data.modifiedCount > 0) {
                            refetch();
                        }
                    })
                    .catch(err => {
                        console.log('user subscribed status updated', err);
                    })

                const res = await axiosSecure.post('/payments', payment);
                console.log('payment saved', res.data);
                // refetch();
                if (res.data?.paymentResult?.insertedId) {
                    // Swal.fire({
                    //     position: "top-end",
                    //     icon: "success",
                    //     title: "Thank you for the taka paisa",
                    //     showConfirmButton: false,
                    //     timer: 1500
                    // });
                    // toast.success("Payment successfull");
                    // navigate('/dashboard/paymentHistory')
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
                            <button className="bg-[orangered] hover:bg-[#b34720] text-white px-4 py-2 flex gap-2" type="submit" disabled={!stripe || !clientSecret}>
                                <MdOutlinePayment className="text-xl text-white" />
                                <span>Confrim Payment</span>
                            </button>
                    }


                    <div className="mt-2">
                        <p className="text-red-600">{error}</p>
                        {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
                    </div>
                </div>
            </form>

        </div>

        // <form onSubmit={handleSubmit}>
        //     <CardElement
        //         options={{
        //             style: {
        //                 base: {
        //                     fontSize: '16px',
        //                     color: '#424770',
        //                     '::placeholder': {
        //                         color: '#aab7c4',
        //                     },
        //                 },
        //                 invalid: {
        //                     color: '#9e2146',
        //                 },
        //             },
        //         }}
        //     />
        //     <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
        //         Pay
        //     </button> 
        //     <p className="text-red-600">{error}</p>
        //     {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        // </form>
    );
};

export default CheckoutForm;