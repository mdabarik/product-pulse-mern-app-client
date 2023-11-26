import { useNavigate } from "react-router-dom";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Stack from '@mui/material/Stack';
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { toast } from 'react-hot-toast';
import Rating from '@mui/material/Rating';
import Voting from "./Voting";


const ProductCard = ({ product }) => {
    const { user, loading } = useAuth();
    // console.log(user, 'user prod');
    // const [role] = useRole();
    // console.log('role', role);
    const navigate = useNavigate();
    const {
        _id, prodName, prodImg, prodExtLink, prodTags, prodUpvotes, prodDownvotes, prodOwnerInfo
    } = product;
    const axiosPublic = useAxiosPublic();

    const { data: votes, isLoading: loading1, refetch } = useQuery({
        queryKey: ['upvotes', loading],
        queryFn: async () => {
            const res = await axiosPublic.get(`/votes?id=${_id}&email=${user?.email}`);
            // console.log(res, 'inside usequery prodcard');
            return res.data;
        }
    })

    const { data: voteCount, isLoading: loading2 } = useQuery({
        queryKey: ['upvotescount', votes],
        queryFn: async () => {
            const res = await axiosPublic.get(`/count-votes/${_id}`);
            // console.log(res.data, 'vote count usequery prodcard');
            return res.data;
        }
    })

    const { data: rating, isLoading: loading3 } = useQuery({
        queryKey: ['reviewsallsingle'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all-reviews/${_id}`);
            console.log(res.data, 'all reviews');
            return res.data;
        }
    })

    // console.log(voteCount, 'voteCount');


    const handleUpvote = async () => {
        // const prodOwnerEmail = prodOwnerInfo?.email;
        // console.log(user?.id, 'inside handle upvote');
        const prodId = _id;
        const votes = {
            userEmail: user?.email,
            prodId: prodId,
            types: 'upvote'
        }
        // console.log(votes);
        axiosPublic.put('/votes', votes)
            .then(res => {
                // console.log(res);
                if (res.data.insertedId || res.data.modifiedCount > 0) {
                    toast.success("Upvoted succesfully");
                    refetch()
                }
            })
            .catch(err => {
                // console.log(err);
            })
    }


    const handleDownVote = async () => {
        const prodId = _id;
        const votes = {
            userEmail: user?.email,
            prodId: prodId,
            types: 'downvote'
        }
        // console.log(votes);
        axiosPublic.put('/votes', votes)
            .then(res => {
                // console.log(res);
                if (res.data.modifiedCount) {
                    toast.success("Downvoted succesfully");
                }
                refetch()
            })
            .catch(err => {
                // console.log(err);
            })
    }

    return (
        <div className="hover:cursor-pointer">
            <div>
                <img className="w-full rounded-t-lg h-[200px] object-cover" src={prodImg} alt="room image" />
            </div>
            <div className="w-full min-h-[200px] bg-white rounded-b-lg p-4 drop-shadow-md flex flex-col justify-between gap-x-4 space-y-2" >
                <h2 className="font-bold h-[38px]">Product: {prodName}</h2>
                <div className="flex gap-2">
                    <p>Tags:</p>
                    <div className="flex gap-1 items-center flex-wrap overflow-hidden">
                        {
                            prodTags?.slice(0, 5).map((tag, index) => <p className="bg-[#e5f6fd] text-[11px] text-[#014361] px-2 py-1" key={index}>{tag}</p>)
                        }
                    </div>
                </div>
                <div className="flex items-center">
                    {/* rating */}
                    <Stack spacing={1}>
                        <Rating name="read-only" precision={0.5} value={Math.round((rating?.averageRating * 2)) / 2} readOnly />
                    </Stack>
                    ({rating?.numRating} <span className="ml-2">reviews</span>)
                </div>

                {/* new updated voting system */}
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