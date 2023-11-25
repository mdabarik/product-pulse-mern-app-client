import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "./useAxiosSecure";


const useReportedProducts = () => {
    const axiosSecure = useAxiosSecure();
    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/get-all-reported-products`);
            // console.log(data, 'inside use all product');
            return data;
        }
    })
    return [products, isLoading, refetch];
};

export default useReportedProducts;