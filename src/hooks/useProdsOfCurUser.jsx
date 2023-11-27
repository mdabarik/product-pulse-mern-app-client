import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';


const useProdsOfCurUser = () => {
    const {user, loading} = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: prods, isLoading, refetch } = useQuery({
        queryKey: ['my-prods', loading, user],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/get-prods-me/?email=${user?.email}`);
            console.log(data, ' useproduct');
            return data;
        }
    })
    return [prods, isLoading, refetch];
};

export default useProdsOfCurUser;