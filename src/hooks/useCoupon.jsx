import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCoupon = ({ coupon}) => {
    console.log(coupon, 'colakdfjladkfj');

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data, isLoading } = useQuery({
        queryKey: ['coupon', user, loading],
        queryFn: async () => {
            const res = await axiosSecure.get()
        }
    })
};

export default useCoupon;