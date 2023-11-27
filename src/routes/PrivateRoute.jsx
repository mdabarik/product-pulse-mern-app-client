import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from '../components/Shared/Loader/Loader';
import { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    // location.pathname = "/"

    useEffect(() => {
        // Check if the current path contains '/dashboard'
        if (location.pathname.includes('/dashboard')) {
            // Update the pathname to '/'
            // history.replace('/');
            location.pathname = "/"
        }
    }, [location]);

    if (loading) return <Loader></Loader>
    if (user) return children;

    return <Navigate to="/login" state={{ from: location }} replace="true" />
};

export default PrivateRoute;