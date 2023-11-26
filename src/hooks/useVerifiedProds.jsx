import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';

const useVerifiedProds = () => {
    const {user, loading} = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ['verfied-prods-v1', loading, user],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/verified-prods`);
            // console.log(data, 'inside useproduct');
            return data;
        }
    })
    return [products, isLoading, refetch];
};

export default useVerifiedProds;