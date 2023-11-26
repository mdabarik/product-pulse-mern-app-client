import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Voting from "./Voting";
import ProductRating from "./ProductRating";



const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { _id, prodName, prodImg, prodExtLink, prodTags } = product;


    const axiosPublic = useAxiosPublic();
    const { user, loading } = useAuth();
    const { data: rating, isLoading } = useQuery({
        queryKey: ['reviewsallsingle', loading, product],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all-reviews/${_id}`);
            // console.log(res.data, 'all reviews');
            return res.data;
        }
    })

    return (
        <div>
            <div>
                <img className="w-full rounded-t-lg h-[200px] object-cover" src={prodImg} alt="room image" />
            </div>
            <div className="w-full min-h-[230px] bg-white rounded-b-lg p-4 drop-shadow-md flex flex-col justify-between gap-x-4 space-y-2" >
                <h2 className="font-bold h-[38px]">Product: {prodName}</h2>
                <div className="flex gap-2">
                    <p>Tags:</p>
                    <div className="flex gap-1 items-center flex-wrap overflow-hidden">
                        {
                            prodTags?.slice(0, 5).map((tag, index) => <p className="bg-[#e5f6fd] text-[11px] text-[#014361] px-2 py-1" key={index}>{tag}</p>)
                        }
                    </div>
                </div>

                {/* dyanamic rating dynamic */}
                <ProductRating key={`${_id}+'abcd`} _id={_id}></ProductRating>

                {/* dynamic voting system */}
                <div>
                    <Voting key={`${product?._id}+'abcd'`} product={product}></Voting>
                </div>

                <div className="flex items-center justify-center mt-4">
                    <Button
                        onClick={() => navigate(`/all-products/${_id}`)}
                        sx={{ borderRadius: '0px', padding: '8px', paddingX: '20px', width: '100%' }} startIcon={<VisibilityIcon />} variant="contained">View Details</Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;