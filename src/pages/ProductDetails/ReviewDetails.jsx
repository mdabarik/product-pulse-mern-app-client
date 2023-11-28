import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Swiper, SwiperSlide } from "swiper/react";
import CouponSlider from '../Home/CouponCarousel/CouponSlider';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import ReviewSlide from './ReviewSlide';
import "./ProductDetails";
import Skeleton from '@mui/material/Skeleton';
import useAuth from '../../hooks/useAuth';


const ReviewDetails = () => {
    const axiosPublic = useAxiosPublic();
    const { id } = useParams();
    const {user, observeAddReview} = useAuth();

    const { data: reviews, isLoading } = useQuery({
        queryKey: ['review-details-slider', id, observeAddReview],
        queryFn: async () => {
            const res = await axiosPublic.get(`/get-all-reviews/${id}`);
            return res.data;
        }
    })

    console.log(reviews, 'review ...');
    return (
        <div>
            <div>
                <h2 className='text-xl uppercase font-bold mt-6 mb-6'>Total Reviews: {reviews?.length} </h2>
            </div>
            <div>
                {
                    isLoading ?
                        <div className='pb-8'>

                            <div className='text-white h-[400px] grid grid-cols-3 gap-6 md:h-[450px] items-center justify-center rounded-lg relative'>
                                <Skeleton variant="rectangular" sx={{ height: '400px', width: '100%' }} />
                                <Skeleton variant="rectangular" sx={{ height: '400px', width: '100%' }} />
                                <Skeleton variant="rectangular" sx={{ height: '400px', width: '100%' }} />
                            </div>

                        </div>
                        :
                        <div className="pb-8">
                            <Swiper
                                slidesPerView={1}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 2,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                    },
                                }}
                                loop={true}
                                spaceBetween={16}
                                centeredSlides={true}
                                autoplay={{
                                    delay: 1500,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }}

                                pagination={{
                                    clickable: true,
                                }}
                                navigation={true}
                                modules={[Autoplay, Pagination, Navigation]}
                                className="mySwiper"
                            // navigation={{
                            //     nextEl: '.swiper-button-next',
                            //     prevEl: '.swiper-button-prev',
                            // }}
                            >
                                {
                                    reviews?.map(review => {
                                        return <SwiperSlide key={review?._id}>
                                            <ReviewSlide review={review} isLoading={isLoading} />
                                        </SwiperSlide>
                                    })
                                }
                            </Swiper>
                        </div>
                }
                {/* <div className="swiper-button-next active-color swiper-button-next-custom"></div> */}
                {/* <div className="swiper-button-prev active-color swiper-button-prev-custom"></div> */}
            </div>
        </div>
    );
};

export default ReviewDetails;