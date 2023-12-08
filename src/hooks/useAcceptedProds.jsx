import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';

const useAcceptedProds = () => {
    const {user, loading} = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ['productsall', loading, user],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/get-all-accpeted-products`);
            return data;
        }
    })
    return [products, isLoading, refetch];
};

export default useAcceptedProds;