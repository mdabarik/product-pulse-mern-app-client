import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Payment from '../../../pages/Dashboard/Normal/Payment/Payment';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import toast from 'react-hot-toast';
import DiscountIcon from '@mui/icons-material/Discount';
import { IoMdCloseCircle } from "react-icons/io";
import useCoupon from '../../../hooks/useCoupon';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const PaymentModal = ({ open, setOpen, handleClickOpen, handleClose }) => {
    const axiosSecure = useAxiosSecure();
    const [coupon, setCoupon] = useState('')
    const [price, setPrice] = useState(500);
    const { user, loading } = useAuth();

    const { data, isLoading } = useQuery({
        queryKey: ['coupon', coupon, loading, user],
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-coupon?code=${coupon}`);
            // console.log(res.data);
            return res.data;
        }
    })

    const handleCoupon = (discount) => {
        if (discount) {
            setPrice(price - 50)
            toast.success('Coupon applied successfully');
        }
    }

    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    <div className='flex items-center justify-center'>
                        <h2 className='text-sm lg:text-2xl font-bold mr-4 text-center'>Subscribe to Unlock Limit</h2>
                    </div>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>

                    <div>
                        <div className='flex gap-x-1 md:gap-x-2 lg:gap-x-3 text-center items-center font-extrabold justify-center text-[12px] md:text-lg  lg:text-xl'>
                            <h2>Total Amount:</h2>
                            <strike>${500}</strike>
                            <h2>${price}</h2>
                            <h2 className='text-bold'>({`$${500 - price} discount`})</h2>
                        </div>
                    </div>

                    <Typography gutterBottom sx={{ textAlign: 'center', padding: '10px' }}>
                        <p className='text-[12px]'>
                            Unlock a lifetime of benefits with our exclusive subscription for just
                            ${price} - a one-time payment that guarantees you access to add product indefinitely!
                            Enjoy the freedom to share your thoughts, updates, and experiences with our community.
                        </p>
                    </Typography>

                    {/* stripe payment start */}
                    <div className=''>
                        <Payment setOpen={setOpen} price={price}></Payment>
                    </div>
                    {/* stripe payment start */}

                    {/* apply coupon */}
                    <div>
                        <div className='flex flex-col justify-center items-center gap-2 mt-4'>
                            <p className="font-normal text-center">Enter your valid coupon code</p>


                            {
                                price == 500
                                    ?
                                    <input onChange={(e) => setCoupon(e.target.value.trim())} className='px-2 py-[4px] outline-none text-center rounded-lg border-2 border-grey-400 w-1/2' type="text" placeholder='Enter coupon' />
                                    :
                                    <input disabled value={coupon} className='px-2 py-[4px] text-center rounded-lg border-2 outline-none border-grey-400 w-1/2' type="text" placeholder='Enter coupon' />
                            }


                            {
                                data?.discount > 0
                                    ?

                                    <>

                                        {
                                            price == 500 ?
                                                <Button size="sm" onClick={() => handleCoupon(data?.discount)} sx={{ borderRadius: 'px' }} variant="contained" startIcon={<DiscountIcon />}>
                                                    Apply Coupon
                                                </Button>
                                                :
                                                <Button size="sm" disabled sx={{ borderRadius: 'px' }} variant="contained" startIcon={<DiscountIcon />}>
                                                    Already Applied
                                                </Button>
                                        }

                                    </>

                                    :
                                    <Button disabled size="sm" sx={{ borderRadius: 'px' }} variant="contained" startIcon={<DiscountIcon />}>
                                        Apply Coupon
                                    </Button>
                            }

                        </div>
                    </div>


                </DialogContent>
                <div className='flex border-2 justify-center items-center'>

                    <DialogActions>
                        <button onClick={handleClose} className="bg-[#9e1e1e] hover:bg-red-600 text-white px-4 py-2 flex gap-2" type="submit">
                            <IoMdCloseCircle className="text-xl text-white" />
                            <span>Close Modal</span>
                        </button>
                    </DialogActions>
                </div>

            </BootstrapDialog>
        </React.Fragment>
    );
}

export default PaymentModal;