

import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
/*** AOS Animation ***/
import 'aos/dist/aos.css';
import AOS from "aos";
import CouponSlider from './CouponSlider';
import "./CouponSliders";
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import moment from 'moment';

function isDateExpired(inputDate) {
    // Convert the input date string to a Moment.js object
    var inputMoment = moment(inputDate, 'YYYY-MM-DD');
  
    // Get the current date with Moment.js
    var currentMoment = moment();
  
    // Compare the input date with the current date
    return inputMoment.isBefore(currentMoment);
  }
  

const CouponSliders = () => {

    useEffect(() => {
        AOS.init()
    }, [])

    const axiosPublic = useAxiosPublic();

    // get-active-token
    const { data: coupons, isLoading, refetch } = useQuery({
        queryKey: ['coupons-active'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/get-active-token`);
            console.log(res, 'inside usequery prod details');
            console.log(moment(new Date() ,'YYYY-MM-DD'), 'now');
            // console.log(moment(res?.data[8].expireDate, 'YYYY-MM-DD'), 'expie');
            const activeCoupon = res?.data?.filter(coupon => {
                // console.log(isDateExpired(coupon?.expireDate), moment(coupon?.expireDate).format('ll'), 'inside filter');
                return !isDateExpired(coupon?.expireDate)
            })
            // console.log(activeCoupon);
            return activeCoupon;
        }
    })

    // const [testimonials, setTestimonials] = useState([]);
    // useEffect(() => {
    //     fetch("https://crud-jwt-server.vercel.app/api/v1/reviews", { credentials: 'include' })
    //         .then(res => res.json())
    //         .then(data => {
    //             setTestimonials(data);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }, []);

    return (
        <div className="my-10 mx-auto" data-aos="zoom-in">
            {/* Rooms */}
            <div className="my-8">
                <div className="flex flex-col items-center justify-center my-4 space-x-4">
                    <h2 className="text-2xl font-bold text-center">Available Coupons</h2>
                    <p className="text-center mt-2">Check the coupon code and use it before expired</p>
                </div>
                <div className="pb-8">
                    <Swiper
                        slidesPerView={3}
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
                        {
                            coupons?.map(coupon => {
                                return <SwiperSlide key={coupon._id}>
                                    <CouponSlider coupon={coupon}></CouponSlider>
                                </SwiperSlide>
                            })
                        }
                    </Swiper>
                </div>
                <div className="swiper-button-next active-color swiper-button-next-custom"></div>
                <div className="swiper-button-prev active-color swiper-button-prev-custom"></div>
            </div>
        </div>
    );
};

export default CouponSliders;