import useAuth from "./useAuth";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "./useAxiosSecure";


const useAllUsers = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: users, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async() => {
            const {data} = await axiosSecure.get(`/all-users/${user?.email}`);
            // console.log(res);
            return data;
        }
    })
    return [users, isLoading, refetch];
};

export default useAllUsers;