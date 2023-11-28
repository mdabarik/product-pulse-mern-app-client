
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import ReviewBannerImg from './../../assets/review-banner-bg.jpg'
import StarIcon from '@mui/icons-material/Star';


const ReviewSlide = ({ review }) => {
    const { userName, userPhoto, userRating, userComment } = review;

    return (
        <div>
            <div className="text-white h-[350px] md:h-[350px] flex flex-col items-center justify-center rounded-lg relative">
                <img className='object-cover w-full h-[350px] md:h-[350px]' src={ReviewBannerImg} alt="banner bg" />
                <div className="absolute top-0 left-0 bg-[#00000099] w-full h-full rounded-lg"></div>
                <div className="absolute top-0 left-0 h-full flex flex-col items-center justify-center px-8 w-full">
                    <img className='w-[75px] md:w-[100px] h-[75px] mb-2 md:h-[100px] object-cover rounded-full z-50' src={userPhoto} alt={name} />
                    <h1 className="font-bold text-[16px] md:text-2xl mb-1 text-center">
                        {userName}
                    </h1>
                    <div className=' w-4/6'>
                        <p className="text-center text-[10px] md:text-sm">{userComment?.substring(0,80)}</p>
                    </div>
                    <div className="mt-4">
                        <Stack spacing={1}>
                            <Rating
                                emptyIcon={<StarIcon style={{ opacity: 1, color: "white" }} fontSize="inherit" />}
                                name="read-only" precision={0.5} value={userRating} readOnly />
                        </Stack>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ReviewSlide;