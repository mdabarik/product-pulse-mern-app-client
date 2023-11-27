import { Helmet } from "react-helmet-async";
import Users from "./Users";

const ManageUsers = () => {
    return (
        <div>
            <Helmet>
                <title>Manage Users | Dashbaord</title>
            </Helmet>
            <Users></Users>
        </div>
    );
};

export default ManageUsers;