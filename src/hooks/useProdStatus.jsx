import useAuth from "./useAuth";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "./useAxiosSecure";


const useProdStatus = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/rejected-prod/${user?.email}`);
            // console.log(data, 'inside use all product');
            return data;
        }
    })
    return [products, isLoading, refetch];
};

export default useProdStatus;