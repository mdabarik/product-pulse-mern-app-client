import { Navigate } from "react-router-dom";
import Loader from "../components/Shared/Loader/Loader";
import useRole from "../hooks/useRole";

const NormalRoute = ({children}) => {

    const [role, isLoading] = useRole();

    if (isLoading) return <Loader></Loader>
    if (role == 'normal') return children;

    return <Navigate to="/dashboard/user-statistics" replace={true}/>
};

export default NormalRoute;