import { FaUsers } from "react-icons/fa";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { FaArrowsSpin } from "react-icons/fa6";
import { MdReportOff } from "react-icons/md";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loader from "../../../../components/Shared/Loader/Loader";
import NormalCharts from "./NormalCharts";
import { Helmet } from "react-helmet-async";


const NormalStatistics = () => {
    const axiosSecure = useAxiosSecure();

    const { user, loading } = useAuth();
    const { data: stats, isLoading, refetch } = useQuery({
        queryKey: ['user-stats', loading, user],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-stats?email=${user?.email}`);
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
            <Helmet>
                <title>My Statistics | Dashboard</title>
            </Helmet>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="w-full rounded-lg h-[180px] bg-[#1e88e5] flex flex-col gap-1 items-center justify-center">
                    <FaUsers className="text-white text-5xl"></FaUsers>
                    <p className="text-[white]">Total Products</p>
                    <h2 className="text-[white] text-2xl font-bold">{stats?.products}</h2>
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
                <NormalCharts reported={stats?.reportedProd} rejected={stats?.rejectedProd} pending={stats?.pendingProd} products={stats?.products} reviews={stats?.reviews} ></NormalCharts>
            </div>


        </div>
    );
};

export default NormalStatistics;