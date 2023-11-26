import { FaUsers } from "react-icons/fa";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { FaArrowsSpin } from "react-icons/fa6";
import { MdReportOff } from "react-icons/md";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loader from "../../../../components/Shared/Loader/Loader";
import AdminCharts from "./AdminCharts";



const AdminStatistics = () => {
    const axiosSecure = useAxiosSecure();

    const { user, loading } = useAuth();
    const { data: stats, isLoading, refetch } = useQuery({
        queryKey: ['admin-stats', loading, user],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            console.log(res.data, 'admin-stats');
            return res.data;
        }
    })

    if (isLoading) {
        return <Loader></Loader>
    }

    // {
    //     "users": 9,
    //     "products": 15,
    //     "reviews": 5,
    //     "pendingProd": 1,
    //     "rejectedProd": 1,
    //     "acceptedProd": 13,
    //     "reportedProd": 4
    // }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="w-full rounded-lg h-[180px] bg-[#1e88e5] flex flex-col gap-1 items-center justify-center">
                    <FaUsers className="text-white text-5xl"></FaUsers>
                    <p className="text-[white]">Total Users</p>
                    <h2 className="text-[white] text-2xl font-bold">{stats?.users}</h2>
                </div>
                <div className="w-full rounded-lg h-[180px] bg-[#5e35b1] flex flex-col gap-1 items-center justify-center">
                    <MdOutlinePublishedWithChanges className="text-white text-5xl"></MdOutlinePublishedWithChanges>
                    <p className="text-[white]">Accepted Products</p>
                    <h2 className="text-[white] text-2xl font-bold">{stats?.acceptedProd}</h2>
                </div>
                <div className="w-full rounded-lg h-[180px] bg-[#fa952e] flex flex-col gap-1 items-center justify-center">
                    <FaArrowsSpin className="text-white text-5xl"></FaArrowsSpin>
                    <p className="text-[white]">Pending Products</p>
                    <h2 className="text-[white] text-2xl font-bold">{stats?.pendingProd}</h2>
                </div>
                <div className="w-full rounded-lg h-[180px] bg-[#e63f3e] flex flex-col gap-1 items-center justify-center">
                    <MdReportOff className="text-white text-5xl"></MdReportOff>
                    <p className="text-[white]">Reported Products</p>
                    <h2 className="text-[white] text-2xl font-bold">{stats?.reportedProd}</h2>
                </div>
            </div>

            {/* pie chart with {numProds, totalReviews, totalUser} */}
            <div>
                <AdminCharts users={stats?.users} products={stats?.products} reviews={stats?.reviews} ></AdminCharts>
            </div>


        </div>
    );
};

export default AdminStatistics;