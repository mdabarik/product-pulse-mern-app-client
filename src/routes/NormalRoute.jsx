import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Shared/Loader/Loader";
import useRole from "../hooks/useRole";

const NormalRoute = ({children}) => {

    const [role, isLoading] = useRole();
    // const location = useLocation();
    // location.pathname = "/"

    if (isLoading) return <Loader></Loader>
    if (role == 'normal') return children;

    return <Navigate to="/dashboard/normal-statistics" replace={true}/>
};

export default NormalRoute;