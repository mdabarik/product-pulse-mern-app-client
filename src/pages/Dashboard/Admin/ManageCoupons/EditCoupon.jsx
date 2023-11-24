import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../components/Shared/Loader/Loader";
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';

const EditCoupon = () => {
    const axiosSecure = useAxiosSecure();
    const [code, setCode] = useState(null);
    const [date, setDate] = useState(null);
    const [disc, setDisc] = useState(null);
    const [desc, setDesc] = useState(null);

    const { id } = useParams();
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/coupons/${id}`);
            return res.data;
        }
    })

    if (isLoading) return <Loader></Loader>

    const { couponCode, expireDate, couponDesc, discAmount } = data;


    const handleEditCoupon = () => {
        console.log('clicked hndledtcoupon');
        const updatedCoupon = {
            couponCode: code || couponCode, expireDate: date?.format('YYYY-MM-DD') || expireDate, couponDesc: desc || couponDesc, discAmount: disc || discAmount
        }
        console.log(updatedCoupon);
        axiosSecure.patch(`/coupons/${id}`, updatedCoupon)
        .then(res => {
            console.log(res);
            if (res?.data?.modifiedCount > 0) {
                toast.success("Coupon updated successfully");
            } else {
                toast.error("Please edit then submit.")
            }
            refetch();
        })
        .catch(err => {
            console.log(err);
            toast.error(err.message);
        })
    }

    return (
        <div>
            <h2>Coupon Code: {couponCode}</h2>
            <p>Expired date: {expireDate}</p>
            <p>Coupon Description: {couponDesc}</p>
            <p>Discount: {discAmount}</p>
            <p>Status: active</p>
            <Input
                onChange={e => setCode(e.target.value)}
                sx={{ padding: '10px', marginY: '14px' }}
                placeholder="Enter Coupon Code (6-15 chars)"
                type="text"
                defaultValue={couponCode}
            ></Input>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker
                        sx={{ width: '100%' }}
                        defaultValue={dayjs(expireDate)}
                        onChange={(newValue) => setDate(newValue)}
                    />
                </DemoContainer>
            </LocalizationProvider>


            <Input
                onChange={e => setDisc(e.target.value)}
                sx={{ padding: '10px', marginY: '14px' }}
                type="number"
                placeholder="Discount amount $"
                defaultValue={discAmount}
            ></Input>

            <Textarea defaultValue={couponDesc} onChange={e => setDesc(e.target.value)} sx={{ padding: '10px', marginY: '14px' }} placeholder="Coupon description" minRows={4} />
            <Button onClick={handleEditCoupon} variant='contained' autoFocus>
                Update coupon
            </Button>
        </div>
    );
};

export default EditCoupon;