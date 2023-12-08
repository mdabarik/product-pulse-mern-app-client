import useAuth from "./useAuth";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "./useAxiosSecure";

const useAllCoupons = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: coupons, isLoading, refetch } = useQuery({
        queryKey: ['users', user, loading],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-coupons/${user?.email}`);
            const sortedInDescIso = res?.data?.sort((a, b) => new Date(b.expireDate) - new Date(a.expireDate));
            return sortedInDescIso;
        }
    })
    return [coupons, isLoading, refetch];
};

export default useAllCoupons;