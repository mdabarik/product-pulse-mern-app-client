import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = ({price}) => {
    return (
        <div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm price={price}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;