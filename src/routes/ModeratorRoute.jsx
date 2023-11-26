import { Navigate } from "react-router-dom";
import Loader from "../components/Shared/Loader/Loader";
import useRole from "../hooks/useRole";

const ModeratorRoute = ({children}) => {

    const [role, isLoading] = useRole();

    if (isLoading) return <Loader></Loader>
    if (role == 'moderator') return children;

    return <Navigate to="/dashboard/moderator-statistics" replace={true}/>
};

export default ModeratorRoute;