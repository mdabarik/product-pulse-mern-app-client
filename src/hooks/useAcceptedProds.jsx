import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "./useAxiosSecure";


const useAcceptedProds = () => {
    const axiosSecure = useAxiosSecure();
    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ['productsall'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/get-all-accpeted-products`);
            // console.log(data, 'inside useproduct');
            return data;
        }
    })
    return [products, isLoading, refetch];
};

export default useAcceptedProds;