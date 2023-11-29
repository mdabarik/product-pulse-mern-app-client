/*-------Using TanStack Query--------*/
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useSingleUser = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    // if (loading) return "loading..."

    const { data: currUser, isLoading:isLoading3, refetch: refetch3 } = useQuery({
        queryKey: ['currUser', loading],
        // enabled: !loading || !!user?.email,
        // enabled: !loading && !!user?.email,
        queryFn: async () => {
            // console.log(user?.email);
            const { data } = await axiosSecure.get(`/users/${user?.email}`)
            // console.log(data, 'data inside usse single user');
            return data;
        },
    })
    // console.log(role, 'inside userole jsx');
    return [currUser, isLoading3, refetch3]
}

export default useSingleUser;
