import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Loader from "../../components/Shared/Loader/Loader";
import Reviews from "./Reviews";

const ProductDetails = () => {
    const { id } = useParams();
    const { user, loading } = useAuth()
    const axiosPublic = useAxiosPublic();

    const { data: product, isLoading, refetch } = useQuery({
        queryKey: ['singleproddetails', loading],
        queryFn: async () => {
            const res = await axiosPublic.get(`/single-prod/${id}`);
            console.log(res, 'inside usequery prod details');
            return res.data;
        }
    })

    if (isLoading) return <Loader></Loader>

    // console.log(id);

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
                    <button className="btn btn-secondary">Report Product</button>
                </div>
            </div>
            <div className="py-14">
                <Reviews />
            </div>
        </div>
    );
};

export default ProductDetails;