import useAuth from "../hooks/useAuth";



const saveUserData = async () => {
    const { user, loading } = useAuth();
    const userData = {
        userEmail: user?.email,
        userName: user?.displayName,
        userPhoto: user?.photoURL,
        userRole: 'normal',
        status: 'Unverified'
    }
    const { data } = await axiosSecure.put('/users')
};

export default saveUserData;