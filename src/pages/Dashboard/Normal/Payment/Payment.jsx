import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = ({price, setOpen}) => {
    return (
        <div>
            <div className="bg-[#f3f3f3]">
                <Elements stripe={stripePromise}>
                    <CheckoutForm setOpen={setOpen} price={price}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;