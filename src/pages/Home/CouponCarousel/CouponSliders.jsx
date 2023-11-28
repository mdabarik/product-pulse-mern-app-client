

import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
/*** AOS Animation ***/
import 'aos/dist/aos.css';
import AOS from "aos";
import CouponSlider from './CouponSlider';
import "./CouponSliders";
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import moment from 'moment';
import Skeleton from '@mui/material/Skeleton';


function isDateExpired(inputDate) {
    var inputMoment = moment(inputDate, 'YYYY-MM-DD');
    var currentMoment = moment().subtract(1, 'days');
    return inputMoment.isBefore(currentMoment);
}


const CouponSliders = () => {
    useEffect(() => {
        AOS.init()
    }, [])

    const axiosPublic = useAxiosPublic();

    // get-active-token
    const { data: coupons, isLoading: isLoading3, refetch } = useQuery({
        queryKey: ['coupons-active'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/get-active-token`);
            const activeCoupon = res?.data?.filter(coupon => {
                // console.log(isDateExpired(coupon?.expireDate), moment(coupon?.expireDate).format('ll'), 'inside filter');
                return !isDateExpired(coupon?.expireDate)
            })
            // console.log(activeCoupon);
            return activeCoupon;
        }
    })

    return (
        <div className="my-10 mx-auto" data-aos="zoom-in">
            <div className="my-8">
                <div className="flex flex-col items-center justify-center my-4 space-x-4">
                    <h2 className="text-3xl font-bold text-center">Available Coupons</h2>
                    <p className="text-center mt-2">Check the coupon code and use it before it expires</p>
                </div>

                {isLoading3 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 py-8">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="bg-gray-100 p-4 rounded-md">
                                <Skeleton variant="rectangular" height={200} />
                                <Skeleton variant="rectangular" height={40} className="mt-2" />
                                <Skeleton variant="rectangular" height={25} className="mt-2" />
                                <Skeleton variant="rectangular" height={25} className="mt-2" />
                                <Skeleton variant="rectangular" height={40} className="mt-2" />
                            </div>
                        ))}
                    </div>
                ) : null}

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
                            delay: 2500,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        // navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper"
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                    >
                        {coupons?.map((coupon, index) => (
                            <SwiperSlide key={index}>
                                <CouponSlider coupon={coupon} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="swiper-button-next active:bg-blue-500 swiper-button-next-custom"></div>
                <div className="swiper-button-prev active:bg-blue-500 swiper-button-prev-custom"></div>
            </div>
        </div>
    );
};

export default CouponSliders;