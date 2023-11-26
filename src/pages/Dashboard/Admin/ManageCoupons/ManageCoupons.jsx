import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import useAllCoupons from '../../../../hooks/useAllCoupons';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import useAuth from '../../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

import moment from 'moment';
function isDateExpired(inputDate) {
    // Convert the input date string to a Moment.js object
    var inputMoment = moment(inputDate, 'YYYY-MM-DD');
    // Get the current date with Moment.js
    var currentMoment = moment().subtract(1, 'days');
    // Compare the input date with the current date
    return inputMoment.isBefore(currentMoment);
}

const ManageCoupons = () => {
    const [coupons, isLoading, refetch] = useAllCoupons()
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    /*-- states for coupon edit and modal --*/
    const [couponId, setCouponId] = useState(null);
    const [couponCode, setCouponCode] = useState(null);
    const [expireDate, setExpireDate] = useState(null);
    const [discAmount, setDiscAmount] = useState(null);
    const [couponDesc, setCouponDesc] = useState(null);
    const navigate = useNavigate();

    /*----- first modal for creating new coupon--------*/
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = () => {
        const coupon = {
            couponCode, expireDate, discAmount, couponDesc
        }
        axiosSecure.post('/coupons', coupon)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Coupn created successfully');
                    refetch();
                    console.log(res, 'handle create copn');
                }
            })
            .catch(err => {
                console.log(res, 'handle create copn');
                toast.success(err.message);

            })
    }
    /*----- first modal for creating new coupon--------*/


    /*----- second modal for deletion coupon--------*/
    const [open1, setOpen1] = useState(false);
    const handleClickOpen1 = (id) => {
        setCouponId(id)
        setOpen1(true);
    };
    const handleClose1 = () => {
        setOpen1(false);
    };
    const handleDelete = (id) => {
        axiosSecure.delete(`/coupons/${id}`, { userEmail: user?.email })
            .then(res => {
                console.log(res);
                toast.success("Coupon Deleted");
                refetch();
            })
            .catch(err => {
                toast.error(err.message);
                console.log(err);
            })
    }
    /*----- second modal for deletion coupon--------*/

    return (
        <div>
            <div className='flex items-center justify-between'>
                <h2 className='text-xl my-3'>All Coupons: {coupons?.length || 0}</h2>
                <Button variant='contained' onClick={() => {
                    setOpen(true)
                }} autoFocus>
                    Create new coupon
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 750 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: '#ecf4f9' }}>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell align='left' sx={{ minWidth: '120px' }}>Coupon Code</TableCell>
                            <TableCell align="left">Expiry Date</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Discount</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">View</TableCell>
                            <TableCell align="left">Edit</TableCell>
                            <TableCell align="left">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {/* table row */}
                        {
                            isLoading ? <div className='flex items-center justify-center w-full text-center'>
                                <span className="loading loading-spinner text-info loading-lg"></span>
                            </div>
                                :
                                coupons?.map((coupon, index) => <TableRow key={coupon?._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">#{index + 1}</TableCell>
                                    <TableCell align="left">{coupon?.couponCode}</TableCell>
                                    <TableCell component="th" scope="row">{moment(coupon?.expireDate).format('ll')}</TableCell>
                                    <TableCell align="left">{coupon?.couponDesc?.substring(0, 40)}</TableCell>
                                    <TableCell align="left">{coupon?.discAmount}</TableCell>
                                    <TableCell align="left">{isDateExpired(coupon?.expireDate) ? 'expired' : 'active'}</TableCell>
                                    <TableCell
                                        align="left">
                                        <Button onClick={() => navigate(`/dashboard/manage-coupons/view/${coupon._id}`)} variant="outlined" size="small">
                                            View
                                        </Button>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Button onClick={() => navigate(`/dashboard/manage-coupons/edit/${coupon._id}`)} variant="outlined" size="small">
                                            Edit
                                        </Button>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Button onClick={() => {
                                            handleClickOpen1(coupon._id)
                                        }} variant="outlined" size="small">
                                            Delete
                                        </Button>
                                    </TableCell>

                                </TableRow>)
                        }
                    </TableBody>
                </Table>
            </TableContainer>


            {/*---------- Modal Start ------------ */}
            <React.Fragment>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle sx={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>Create New Coupon</DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{ textAlign: 'center', marginY: '5px' }}>
                            {"To generate your unique coupon, kindly provide the requested information in the form below. We will create coupon for you."}
                        </DialogContentText>
                        <Input
                            onChange={e => setCouponCode(e.target.value)}
                            sx={{ padding: '10px', marginY: '14px' }}
                            placeholder="Enter Coupon Code (6-15 chars)"
                            type="text"
                        ></Input>
                        <Input
                            onChange={e => setExpireDate(e.target.value)}
                            sx={{ padding: '10px', marginY: '14px' }}
                            type="date"
                        ></Input>
                        <Input
                            onChange={e => setDiscAmount(e.target.value)}
                            sx={{ padding: '10px', marginY: '14px' }}
                            type="number"
                            placeholder="Discount amount $"
                        ></Input>

                        <Textarea onChange={e => setCouponDesc(e.target.value)} sx={{ padding: '10px', marginY: '14px' }} placeholder="Coupon description" minRows={4} />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant='contained' onClick={() => {
                            handleClose()
                            handleCreate()
                        }}>Create Coupon</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
            {/*---------- Modal End ---------------*/}


            {/*---------- Delete Modal ---------------*/}
            <React.Fragment>
                <Dialog
                    open={open1}
                    onClose={handleClose1}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Are you sure?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Do you want to delete the selected coupon?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose1}>Cancel</Button>
                        <Button variant='contained' onClick={() => {
                            handleDelete(couponId)
                            handleClose1()
                        }} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
            {/*---------- Delete Modal ---------------*/}




        </div>
    );
}

export default ManageCoupons;