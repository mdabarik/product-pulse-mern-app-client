import useAuth from "./useAuth";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "./useAxiosSecure";


const useAllCoupons = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: coupons, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/all-coupons/${user?.email}`);
            // console.log(res);
            return data;
        }
    })
    return [coupons, isLoading, refetch];
};

export default useAllCoupons;