import { Navigate } from "react-router-dom";
import Loader from "../components/Shared/Loader/Loader";
import useRole from "../hooks/useRole";

const AdminRoute = ({children}) => {
    const [role, isLoading] = useRole();

    if (isLoading) return <Loader></Loader>
    if (role == 'admin') return children;

    return <Navigate to="/dashboard/admin-statistics" replace={true}/>
};

export default AdminRoute;