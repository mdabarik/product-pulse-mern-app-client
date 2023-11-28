// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../hooks/useAuth";
// import Loader from "../../components/Shared/Loader/Loader";
// import Reviews from "./Reviews";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { toast } from 'react-hot-toast';
// import ProductRating from "../AllProducts/ProductRating";
// import Voting from "../AllProducts/Voting";
// import Report from "./Report";
// import { Helmet } from "react-helmet-async";


// const ProductDetails = () => {
//     const { id } = useParams();
//     const { user, loading, observeAddReview, setObserveAddReview } = useAuth()
//     const axiosSecure = useAxiosSecure();


//     const { data: product, isLoading, refetch } = useQuery({
//         queryKey: ['singleproddetails', loading, observeAddReview],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/single-prod/${id}`);
//             console.log(res, 'inside usequery prod details');
//             return res.data;
//         }
//     })

//     if (isLoading) return <Loader></Loader>

//     const handleReport = () => {
//         axiosSecure.patch(`/report-prod/${id}`)
//             .then(res => {
//                 console.log(res, 'patch report');
//                 if (res.data.upsertedId || res.data.upsertedCount) {
//                     toast.success("Reported successfully.");
//                 }
//                 if (res.data.matchedCount > 0) { // matchedCount, modifiedCount, upsertedCount, upsertedId
//                     toast.success("Reported Successfully");
//                 }
//             })
//             .catch(err => {
//                 console.log(err, 'patch err');
//             })
//     }

//     return (
//         <div>
//             <Helmet>
//                 <title>{product?.prodName} | Product Pulse</title>
//             </Helmet>
//             <div>
//                 <h2 className="text-xl font-bold py-4">Product Details Page</h2>
//             </div>
//             <div className="flex flex-col md:flex-row gap-6">
//                 <div>
//                     <img className="h-[550px]" src={product?.prodImg} alt="image" />
//                 </div>
//                 <div className="space-y-6">
//                     <h2 className="font-bold text-xl">Product Name: {product?.prodName}</h2>
//                     <p>Description: {product?.prodDesc}</p>
//                     <div className="flex gap-2">
//                         <p>Tags: </p>
//                         <div className="flex gap-1 items-center flex-wrap overflow-hidden">
//                             {
//                                 product?.prodTags?.map((tag, index) => <p className="bg-[#e5f6fd] text-[12px] text-[#014361] px-2 py-1" key={index}>{tag}</p>)
//                             }
//                         </div>
//                     </div>
//                     <div>
//                         <ProductRating _id={id} />
//                     </div>
//                     <div className="border-2 flex">
//                         <Voting product={product} />
//                     </div>
//                 </div>
//                 {/* <button onClick={handleReport} className="btn btn-secondary">Report Product</button> */}

//                 {/* report */}
//                 <div>
//                     <Report></Report>
//                 </div>

//             </div>
//             <div className="py-14">
//                 <Reviews />
//             </div>
//         </div>
//     );
// };

// export default ProductDetails;

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Loader from "../../components/Shared/Loader/Loader";
import Reviews from "./Reviews";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from 'react-hot-toast';
import ProductRating from "../AllProducts/ProductRating";
import Voting from "../AllProducts/Voting";
import Report from "./Report";
import { Helmet } from "react-helmet-async";

const ProductDetails = () => {
    const { id } = useParams();
    const { user, loading, observeAddReview, setObserveAddReview } = useAuth()

    const axiosSecure = useAxiosSecure();

    const { data: product, isLoading, refetch } = useQuery({
        queryKey: ['singleproddetails', loading, observeAddReview],
        queryFn: async () => {
            const res = await axiosSecure.get(`/single-prod/${id}`);
            console.log(res, 'inside usequery prod details');
            return res.data;
        }
    })

    if (isLoading) return <Loader></Loader>

    const handleReport = () => {
        axiosSecure.patch(`/report-prod/${id}`)
            .then(res => {
                console.log(res, 'patch report');
                if (res.data.upsertedId || res.data.upsertedCount) {
                    toast.success("Reported successfully.");
                }
                if (res.data.matchedCount > 0) {
                    toast.success("Reported Successfully");
                }
            })
            .catch(err => {
                console.log(err, 'patch err');
            })
    }

    return (
        <div className="container w-[90%] lg:w-[95%] mx-auto">
            <Helmet>
                <title>{product?.prodName} | Product Pulse</title>
            </Helmet>
            <div>
                <h2 className=" py-4"></h2>
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
                    <button style={{ marginTop: "-3px" }} className="absolute top-0 right-0 rounded">
                        <Report></Report>
                    </button>
                </div>
            </div>
            <div className="py-14">
                <Reviews />
            </div>
        </div>
    );
};

export default ProductDetails;
