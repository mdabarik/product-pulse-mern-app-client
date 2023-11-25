import Loader from "../../../components/Shared/Loader/Loader";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { toast } from 'react-hot-toast';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useProducts from "../../../hooks/useProducts";

const ReviewProducts = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [products, isLoading, refetch] = useProducts();

    /* ------- Delete product using modal confirmation----- */
    const [delProdId, setDelProdId] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = (id) => {
        setDelProdId(id);
        setOpen(true);
    }
    const handleDelete = () => {
        const prodId = delProdId;
        // console.log(prodId);
        axiosSecure.delete(`/products/${prodId}`)
            .then(res => {
                // console.log(res, 'handle delete');
                if (res.data.deletedCount > 0) {
                    toast.success('Product deleted successfully.');
                    refetch();
                }
            })
            .catch(err => {
                toast.error(err.message);
            })
    }

    if (isLoading) return <Loader></Loader>

    const handleStatus = (status, id) => {
        // /products/update-status/:id
        axiosSecure.patch(`/products/update-status/${id}`, { prodStatus: status })
            .then(res => {
                console.log(res);
                if (res?.data?.modifiedCount > 0) {
                    toast.success('Status updated');
                    refetch();
                } else {
                    toast.error('Already has this status');
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    // /products/update-feature/:id
    const handleFeature = (feature, id) => {
        axiosSecure.patch(`/products/update-feature/${id}`, { prodIsFeatured: feature })
            .then(res => {
                console.log(res);
                if (res?.data?.modifiedCount > 0) {
                    toast.success('Feature updated');
                    refetch();
                } else {
                    toast.error('Already has this feature');
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <div className='flex items-center justify-between'>
                <h2 className='text-xl my-3'>Review Products: {products?.length || 0}</h2>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 750 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: '#ecf4f9' }}>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell align='left' sx={{ minWidth: '120px' }}>Product Name</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">Is Featured?</TableCell>
                            <TableCell align="left">View</TableCell>
                            <TableCell align="left">Make Featured</TableCell>
                            <TableCell align="left">Accept</TableCell>
                            <TableCell align="left">Reject</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {/* table row */}
                        {/* id, name, status, view, feat, acc, rejc */}

                        {
                            isLoading ? <div className='flex items-center justify-center w-full text-center'>
                                <span className="loading loading-spinner text-info loading-lg"></span>
                            </div>
                                :
                                products?.map((product, index) => <TableRow key={product?._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">#{index + 1}</TableCell>
                                    <TableCell align="left">{product?.prodName}</TableCell>
                                    <TableCell align="left">{product?.prodStatus || 'pending'}</TableCell>
                                    <TableCell align="left">{product?.prodIsFeatured || 'no'}</TableCell>
                                    <TableCell
                                        align="left">
                                        <Button onClick={() => navigate(`/dashboard`)} variant="outlined" size="small">
                                            View
                                        </Button>
                                    </TableCell>
                                    <TableCell align="left">
                                        {
                                            product?.prodIsFeatured == 'no' ?
                                                <Button onClick={() => handleFeature('yes', product?._id)} variant="outlined" size="small">
                                                    Make Featured
                                                </Button>
                                                :
                                                <Button onClick={() => handleFeature('no', product?._id)} variant="outlined" size="small">
                                                    Make Unfeatured
                                                </Button>
                                        }

                                    </TableCell>
                                    <TableCell align="left">
                                        <Button onClick={() => handleStatus('accepted', product?._id)} variant="outlined" size="small">
                                            Accept
                                        </Button>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Button onClick={() => handleStatus('rejected', product?._id)} variant="outlined" size="small">
                                            Reject
                                        </Button>
                                    </TableCell>

                                </TableRow>)
                        }
                    </TableBody>
                </Table>
            </TableContainer>





            {/*---------- Delete Modal ---------------*/}
            <React.Fragment>
                <Dialog
                    open={open}
                    onClose={handleClose}
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
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant='contained' onClick={() => {
                            handleDelete()
                            handleClose()
                        }} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
            {/*---------- Delete Modal ---------------*/}




        </div>
    );
};

export default ReviewProducts;