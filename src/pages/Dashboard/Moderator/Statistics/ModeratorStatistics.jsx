import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { FaArrowsSpin } from "react-icons/fa6";
import { MdReportOff } from "react-icons/md";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loader from "../../../../components/Shared/Loader/Loader";
import ModeratorCharts from "./ModeratorCharts";
import { Helmet } from "react-helmet-async";



const ModeratorStatistics = () => {
    const axiosSecure = useAxiosSecure();

    const { user, loading } = useAuth();
    const { data: stats, isLoading, refetch } = useQuery({
        queryKey: ['moderator-stats', loading, user],
        queryFn: async () => {
            const res = await axiosSecure.get(`/moderator-stats`);
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
                <title>Moderator Statistics | Dashboard</title>
            </Helmet>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <ModeratorCharts pending={stats?.pendingProd} accepted={stats?.acceptedProd} rejected={stats?.reportedProd} ></ModeratorCharts>
            </div>

        </div>
    );
};

export default ModeratorStatistics;