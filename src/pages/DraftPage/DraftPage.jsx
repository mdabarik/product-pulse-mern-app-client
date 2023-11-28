import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import DisableBtn from "../../components/Shared/DisableBtn/DisableBtn";
import Loader from "../../components/Shared/Loader/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ProductRating from "../AllProducts/ProductRating";
import Reviews from "../ProductDetails/Reviews";
import Voting from "./Voting";

const DraftPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const axiosSecure = useAxiosSecure();
    const { data: product, isLoading, refetch } = useQuery({
        queryKey: ['product-rejected'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/get-rejected-prod/${id}`);
            if (!data?.prodStatus) navigate('/');
            console.log(data, 'Inside Draft page');
            return data;
        }
    })

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className="container w-[90%] lg:w-[95%] mx-auto">
            <Helmet>
                <title>Draft Page | Product Pulse</title>
            </Helmet>
            <div>
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold uppercase text-center py-8">This Product is on Draft Mode</h2>
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/2 relative">
                    {/* Image */}
                    <img className="w-full lg:h-[550px] object-cover" src={product?.prodImg} alt="image" />
                </div>
                <div className="lg:w-1/2 space-y-6 relative">
                    {/* Product information */}
                    <h2 className="font-bold text-xl">Product Name: {product?.prodName}</h2>
                    <p>Description: {product?.prodDesc}</p>
                    <div className="flex gap-2">
                        <p>Tags: </p>
                        <div className="flex gap-1 items-center flex-wrap overflow-hidden">
                            {
                                product?.prodTags?.map((tag, index) => <p className="bg-[#e5f6fd] text-[12px] text-[#014361] px-2 py-1" key={index}>{tag}</p>)
                            }
                        </div>
                    </div>
                    <div>
                        <ProductRating _id={id} />
                    </div>
                    <div className="border-2 flex">
                        <Voting product={product} />
                    </div>

                    {/* Report button */}
                    <button disabled style={{ marginTop: "-3px" }} className="absolute flex text-white bg-blue-500 px-3 py-1 gap-2 top-0 right-0 rounded">
                        <span>report</span> <DisableBtn></DisableBtn>
                    </button>
                </div>
            </div>
            <div className="py-14">
                <Reviews />
            </div>
        </div>
    )
};

export default DraftPage;