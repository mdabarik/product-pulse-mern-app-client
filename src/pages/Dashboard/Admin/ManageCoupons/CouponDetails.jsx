import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../components/Shared/Loader/Loader";

const CouponDetails = () => {
    const axiosSecure = useAxiosSecure();

    const { id } = useParams();
    // useEffect(() => {
    //     axiosSecure.get(`/coupons/${id}`)
    //     .then(res => {
    //         console.log(res);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // }, [id])

    const { data, isLoading } = useQuery({
        queryKey: ['coupons'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/coupons/${id}`);
            return res.data;
        }
    })

    if (isLoading) return <Loader></Loader>
    
    const {couponCode, expireDate, couponDesc, discAmount} = data;

    return (
        <div>
            <h2>Coupon Code: {couponCode}</h2>
            <p>Expired date: {expireDate}</p>
            <p>Coupon Description: {couponDesc}</p>
            <p>Discount: {discAmount}</p>
            <p>Status: active</p>
        </div>
    );
};

export default CouponDetails;