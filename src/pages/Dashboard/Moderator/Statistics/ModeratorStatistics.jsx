import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { FaArrowsSpin } from "react-icons/fa6";
import { MdReportOff } from "react-icons/md";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loader from "../../../../components/Shared/Loader/Loader";
import ModeratorCharts from "./ModeratorCharts";
import { Helmet } from "react-helmet-async";
import { FaUsers } from "react-icons/fa";
import { MdRemoveModerator } from "react-icons/md";




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


    const { data: products } = useQuery({
        queryKey: ['report-reported-contente-statist', loading, user],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reported-products`)
            console.log('is reported', res.data);
            return res.data;
        }
    })


    if (isLoading) {
        return <Loader></Loader>
    }


    // totalProducts, acceptedProds, pendingProds, rejectedProds
    return (
        <div>
            <Helmet>
                <title>Moderator Statistics | Dashboard</title>
            </Helmet>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 drop-shadow-xl text-center">
                <div className="w-full rounded-lg h-[180px] bg-[#1e88e5] flex flex-col gap-1 items-center justify-center">
                    <FaUsers className="text-white text-5xl"></FaUsers>
                    <p className="text-[white]">Total Products</p>
                    <h2 className="text-[white] text-2xl font-bold">{stats?.totalProducts}</h2>
                </div>
                {/* <div className="w-full rounded-lg h-[180px] bg-[#5e35b1] flex flex-col gap-1 items-center justify-center">
                    <MdOutlinePublishedWithChanges className="text-white text-5xl"></MdOutlinePublishedWithChanges>
                    <p className="text-[white]">Accepted Products</p>
                    <h2 className="text-[white] text-2xl font-bold">{stats?.acceptedProds}</h2>
                </div> */}
                <div className="w-full rounded-lg h-[180px] bg-[#fa952e] flex flex-col gap-1 items-center justify-center">
                    <FaArrowsSpin className="text-white text-5xl"></FaArrowsSpin>
                    <p className="text-[white]">Pending Products</p>
                    <h2 className="text-[white] text-2xl font-bold">{stats?.pendingProds}</h2>
                </div>
                <div className="w-full rounded-lg h-[180px] bg-[#e63f3e] flex flex-col gap-1 items-center justify-center">
                    <MdRemoveModerator className="text-white text-5xl"></MdRemoveModerator>
                    <p className="text-[white]">Rejected Products</p>
                    <h2 className="text-[white] text-2xl font-bold">{stats?.rejectedProds}</h2>
                </div>
                <div className="w-full rounded-lg h-[180px] bg-[#b71e1e] flex flex-col gap-1 items-center justify-center">
                    <MdReportOff className="text-white text-5xl"></MdReportOff>
                    <p className="text-[white]">Reported Products</p>
                    <h2 className="text-[white] text-2xl font-bold">{products?.length || 0}</h2>
                </div>
            </div>

            {/* pie chart with {numProds, totalReviews, totalUser} */}
            <div>
                <ModeratorCharts reported={products?.length || 0} products={stats?.totalProducts} pending={stats?.pendingProds} accepted={stats?.acceptedProds} rejected={stats?.rejectedProds} ></ModeratorCharts>
            </div>

        </div>
    );
};

export default ModeratorStatistics;