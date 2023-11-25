import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "./useAxiosSecure";


const useProducts = () => {
    const axiosSecure = useAxiosSecure();
    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/get-all-products`);
            console.log(data, 'inside useproduct');
            return data;
        }
    })
    return [products, isLoading, refetch];
};

export default useProducts;