import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from '../components/Shared/Loader/Loader';
import { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    // location.pathname = "/"

    // useEffect(() => {
    //     // Check if the current path contains '/dashboard'
    //     if (location.pathname.includes('/dashboard')) {
    //         // Update the pathname to '/'
    //         // history.replace('/');
    //         // navigate('/')
    //     }
    // }, [location]);

    if (loading) return <Loader></Loader>
    if (user) return children;
    return <Navigate to="/login" replace="true" />

    // return <Navigate to="/login" state={{ from: location }} replace="true" />
};

export default PrivateRoute;