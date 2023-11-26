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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const PaymentModal = ({ open, setOpen, handleClickOpen, handleClose }) => {

    const [coupon, setCoupon] = useState('')
    const [price, setPrice] = useState(500);


    const handleCoupon = (coupon) => {

        console.log(coupon, 'coupon');

        


        if (coupon == 'SAVE50NEW') {
            setPrice(price - 50)
            toast.success('Coupon applied successfully');
        }
    }




    return (
        <React.Fragment>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Open dialog
            </Button> */}
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    <div className='flex'>
                    <h2 className='text-xl font-bold mr-4'>Total Amount You Will Pay:</h2>
                    {
                        price == 500 ? '$500' : <>
                            <div className='flex gap-4'>
                            <strike>${'500'}</strike>
                            <span>{price}</span>
                            </div>
                        </>

                    }
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

                    {/* stripe payment start */}
                    <Payment price={price}></Payment>
                    {/* stripe payment start */}

                    <Typography gutterBottom>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                        consectetur ac, vestibulum at eros.
                    </Typography>



                    {/* apply coupon */}
                    <div>
                        <p className="font-normal my-2">Enter your valid coupon code</p>
                        <Box
                            sx={{
                                width: 500,
                                maxWidth: '100%',
                                display: 'flex'
                            }}
                        >
                            <TextField
                                fullWidth
                                placeholder="Enter your cuopon code"
                                onChange={(e) => setCoupon(e.target.value.trim())}
                                id="fullWidth" />

                            <Button
                                onClick={() => handleCoupon(coupon)}
                                sx={{ borderRadius: '0px', padding: '8px', paddingX: '20px', width: '40px', marginLeft: '-60px' }}
                                // startIcon={<SearchIcon />} 
                                variant="contained">Apply Coupon</Button>
                        </Box>
                    </div>


                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}

export default PaymentModal;