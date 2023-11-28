import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loader from "../../../../components/Shared/Loader/Loader";
import moment from 'moment';
import couponBannerImg from "../../../../assets/coupon-banner.jpg";
import { FaEdit } from "react-icons/fa";



const CouponDetails = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { id } = useParams();
    const { data, isLoading } = useQuery({
        queryKey: ['coupons', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/coupons/${id}`);
            return res.data;
        }
    })

    function isDateExpired(inputDate) {
        // Convert the input date string to a Moment.js object
        var inputMoment = moment(inputDate, 'YYYY-MM-DD');
        // Get the current date with Moment.js
        var currentMoment = moment().subtract(1, 'days');
        // Compare the input date with the current date
        return inputMoment.isBefore(currentMoment);
    }


    if (isLoading) return <Loader></Loader>

    const { _id, couponCode, expireDate, couponDesc, discAmount } = data;

    return (
        <div className="text-white h-[320px] md:h-[400px] lg:h-[450px] xl:h-[500px] flex flex-col items-center justify-center rounded-lg relative bg-blue-600">
            <img className="object-cover w-full h-[320px] md:h-[400px] lg:h-[450px] xl:h-[500px] rounded-lg" src={couponBannerImg} alt="banner bg" />
            <div className="absolute top-0 left-0 bg-black bg-opacity-50 w-full h-full rounded-lg"></div>
            <div className="absolute top-0 left-0 h-full flex flex-col items-center justify-center px-4 md:px-8 w-full space-y-4 md:space-y-6">
                <h1 className="coupon-discount text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
                    {`$${discAmount} OFF`}
                </h1>
                <h3 className="expired-date text-sm md:text-base lg:text-lg xl:text-xl">
                    Expired on: {
                        <>
                            {
                                isDateExpired(expireDate) ? 'Expired' : moment(expireDate).format('ll')
                            }
                        </>

                    }
                </h3>
                <h2 className="coupon-code text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
                    {couponCode}
                </h2>
                <div className="w-full md:w-5/6 xl:w-4/5 h-[40px] md:h-[60px] flex items-center justify-center text-center overflow-hidden">
                    <p className=" text-xs md:text-sm lg:text-base xl:text-lg">
                        {couponDesc}
                    </p>
                </div>
                <div>
                    <button onClick={() => navigate(`/dashboard/manage-coupons/edit/${_id}`)} className="copy-button bg-blue-700 text-white py-2 px-4 rounded-full flex items-center space-x-2 text-xs md:text-sm lg:text-base xl:text-lg">
                        <FaEdit className="text-xl text-white mr-2"></FaEdit> Edit Coupon
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CouponDetails;