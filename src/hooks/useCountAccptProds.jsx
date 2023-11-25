// const count = await productsCollection.countDocuments(query)

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "./useAxiosSecure";


const useCountAccptProds = () => {
    const axiosSecure = useAxiosSecure();
    const { data: count, isLoading, refetch } = useQuery({
        queryKey: ['countaccepted'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/count-accepted-prods`);
            // console.log(data, 'inside use count acceptedprods');
            return data;
        }
    })
    return [count, isLoading, refetch];
};

export default useCountAccptProds;