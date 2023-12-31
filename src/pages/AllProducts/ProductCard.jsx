import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Voting from "./Voting";
import ProductRating from "./ProductRating";
import { IoMdLink } from "react-icons/io";

const ProductCard = ({ product, refetch }) => {
    const navigate = useNavigate();
    const { _id, prodName, prodImg, prodExtLink, prodTags } = product;

    const axiosPublic = useAxiosPublic();
    const { user, loading } = useAuth();
    const { data: rating, isLoading } = useQuery({
        queryKey: ['reviewsallsingle', loading, product],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all-reviews/${_id}`);
            return res.data;
        }
    })

    return (
        <div className="flex flex-col h-full">
            <div>
                <img className="w-full rounded-t-lg h-[200px] object-cover" src={prodImg} alt="room image" />
            </div>
            <div className="flex flex-col justify-between bg-white rounded-b-lg p-4 drop-shadow-md">
                <div>
                    <h2 className="font-bold h-[38px] mb-2">Product: {prodName}</h2>
                    <div className="flex gap-2">
                        <p>Tags:</p>
                        <div className="flex max-h-[24px] gap-1 items-start flex-wrap overflow-hidden">
                            {
                                prodTags?.slice(0, 5)?.map((tag, index) => (
                                    <p className="bg-[#e5f6fd] text-[11px] text-[#014361] px-2 py-[1px]" key={index}>{tag}</p>
                                ))
                            }
                        </div>
                    </div>
                </div>

                <div className="flex-grow">
                    {/* dyanamic rating dynamic */}
                    <ProductRating key={`${_id}+'abcd`} _id={_id}></ProductRating>
                </div>

                <div className="flex items-center justify-center mt-2">
                    {/* dynamic voting system */}
                    <Voting refetch={refetch} key={`${product?._id}+'abcd'`} product={product}></Voting>
                </div>

                <div className="flex items-center justify-center mt-2">
                    <Link to={prodExtLink}><IoMdLink className="text-xl" /></Link>
                </div>

                <div className="flex items-center justify-center mt-4">
                    <Button
                        onClick={() => navigate(`/all-products/${_id}`)}
                        sx={{ borderRadius: '0px', padding: '8px', paddingX: '20px', width: '100%' }} 
                        startIcon={<VisibilityIcon />} 
                        variant="contained"
                    >
                        View Details
                    </Button>
                </div>
            </div>
        </div>
    );
    
};

export default ProductCard;
