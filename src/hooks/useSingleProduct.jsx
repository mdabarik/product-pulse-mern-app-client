// import useAuth from "./useAuth";
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from "./useAxiosSecure";


// const useSingleProduct = () => {
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();
//     const { data: products, isLoading, refetch } = useQuery({
//         queryKey: ['products'],
//         queryFn: async () => {
//             const { data } = await axiosSecure.get(`/all-products/${user?.email}`);
//             return data;
//         }
//     })
//     return [products, isLoading, refetch];
// };

// export default useSingleProduct;