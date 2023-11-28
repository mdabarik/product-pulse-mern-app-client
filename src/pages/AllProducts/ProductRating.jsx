
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Skeleton from '@mui/material/Skeleton';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';


const ProductRating = ({ _id }) => {
    const axiosPublic = useAxiosPublic();
    const { loading, observeAddReview } = useAuth();


    const { data: rating, isLoading } = useQuery({
        queryKey: ['reviewsallsingle', loading, _id, observeAddReview],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all-reviews/${_id}`);
            // console.log(res.data, 'all reviews');
            return res.data;
        }
    })

    return (
        <div>
            {
                isLoading
                    ?
                    <>
                        <div className="flex gap-1 mt-2 mb-2">
                            <Skeleton variant="circular" width={21} height={24} />
                            <Skeleton variant="circular" width={21} height={24} />
                            <Skeleton variant="circular" width={21} height={24} />
                            <Skeleton variant="circular" width={21} height={24} />
                            <Skeleton variant="circular" width={21} height={24} />
                            <Skeleton variant="rectangle" width={80} height={24} />
                        </div>
                    </>
                    :
                    <div className="flex items-center mt-2 mb-2">
                        {/* rating */}
                        <Stack spacing={1}>
                            <Rating name="read-only" precision={0.5} value={Math.round((rating?.averageRating * 2)) / 2} readOnly />
                        </Stack>
                        ({rating?.numRating} <span className="ml-2">reviews</span>)
                    </div>
            }
        </div>
    );
};

export default ProductRating;