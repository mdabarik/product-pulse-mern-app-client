import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Loader from "../../components/Shared/Loader/Loader";
import Reviews from "./Reviews";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from 'react-hot-toast';


const ProductDetails = () => {
    const { id } = useParams();
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure();

    const { data: product, isLoading, refetch } = useQuery({
        queryKey: ['singleproddetails', loading],
        queryFn: async () => {
            const res = await axiosSecure.get(`/single-prod/${id}`);
            console.log(res, 'inside usequery prod details');
            return res.data;
        }
    })

    if (isLoading) return <Loader></Loader>

    // console.log(id);

    const handleReport = () => {
        axiosSecure.patch(`/report-prod/${id}`)
            .then(res => {
                console.log(res, 'patch report');
                if (res.data.modifiedCount > 0) {
                    toast.success("Reported successfully.");
                } else {
                    toast.error("You already reported this product");
                }
            })
            .catch(err => {
                console.log(err, 'patch err');
            })
    }

    return (
        <div>
            <div>
                <h2 className="text-lg font-bold py-4">Product Details Page</h2>
            </div>
            <div className="flex flex-col md:flex-row">
                <div>
                    <img src={product?.prodImg} alt="image" />
                </div>
                <div>
                    <h2 className="fontbold">Product Name: {product?.prodName}</h2>
                    <p>Description: {product?.prodDesc}</p>
                    <button onClick={handleReport} className="btn btn-secondary">Report Product</button>
                </div>
            </div>
            <div className="py-14">
                <Reviews />
            </div>
        </div>
    );
};

export default ProductDetails;