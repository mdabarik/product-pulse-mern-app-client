/*-------Using TanStack Query--------*/
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    // if (loading) return "loading..."

    // console.log(user?.email);

    const { data: role, isLoading, refetch } = useQuery({
        queryKey: ['role', loading],
        // enabled: !loading || !!user?.email,
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            // console.log(user?.email);
            const { data } = await axiosSecure.get(`/users/${user?.email}`)
            // console.log(data, 'data inside userole');
            return data?.userRole || [];
        },
    })
    // console.log(role, 'inside userole jsx');
    return [role, isLoading, refetch]
}

export default useRole;