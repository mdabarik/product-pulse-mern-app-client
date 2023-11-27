import { Navigate } from "react-router-dom";
import Loader from "../../../components/Shared/Loader/Loader";
import useRole from "../../../hooks/useRole";

const DashboardHome = () => {
    const [role, isLoading] = useRole();
    console.log(role, 'dashboardhome');

    if (isLoading) return <Loader />; // Return the Loader component

    if (role == 'admin') {
        return <Navigate to="/dashboard/admin-statistics" replace />;
    }
    if (role == 'moderator') {
        return <Navigate to="/dashboard/moderator-statistics" replace />;
    }
    if (role == 'normal') {
        return <Navigate to="/dashboard/normal-statistics" replace />;
    }

    return <Navigate to="/" replace />;
};

export default DashboardHome;