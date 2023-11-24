/*-------Using TanStack Query--------*/
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const { user, refetch } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: role, isLoading } = useQuery({
        queryKey: ['role'],
        // enabled: !loading && !!user?.email,
        // enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/${user?.email}`)
            // console.log(data);
            return data?.userRole;
        },
    })
    // console.log(role, 'inside userole jsx');
    return [role, isLoading, refetch]
}

export default useRole;