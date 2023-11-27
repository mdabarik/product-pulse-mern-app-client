import Loader from "../../../components/Shared/Loader/Loader";
import useAllProducts from "../../../hooks/useAllProducts";
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
import { Navigate, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import useProdsOfCurUser from "../../../hooks/useProdsOfCurUser";
import useSingleUser from "../../../hooks/useSingleUser";

const ManageProducts = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [products, isLoading, refetch] = useAllProducts();

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

    const handleViewClick = (id) => {
        const url = `/all-products/${id}`;
        window.open(url, '_blank');
    };


    const [prods] = useProdsOfCurUser();
    const [currUser] = useSingleUser();
    // console.log(currUser?.status, 'status');
    // console.log(prods, 'prods');
    // if (prods?.counts > 0 && currUser?.status == 'Unverified') {
    //     return <Navigate to="/dashboard/manage-products"  replace />
    // }

    const cantAddMoreThanOne = () => {
        toast.error("To add more than 1 product, please subscribe (To Subscribe Goto Profile).")
    }



    if (isLoading) return <Loader></Loader>

    return (
        <div>
            <Helmet>
                <title>Manage Products | Dashboard</title>
            </Helmet>
            <div className='flex items-center justify-between'>
                <h2 className='text-xl my-3'>My Products: {products?.length || 0}</h2>
                {
                    prods?.counts > 0 && currUser?.status == 'Unverified'
                        ?
                        <Button variant='contained' onClick={() => {
                            cantAddMoreThanOne()
                        }} autoFocus>
                            Add Product
                        </Button>
                        :
                        <Button variant='contained' onClick={() => {
                            navigate('/dashboard/add-product')
                        }} autoFocus>
                            Add Product
                        </Button>
                }

            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 750 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: '#ecf4f9' }}>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell align='left' sx={{ minWidth: '120px' }}>Product Name</TableCell>
                            <TableCell align="left">Upvotes</TableCell>
                            <TableCell align="left">Downvotes</TableCell>
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
                                products?.map((product, index) => <TableRow key={product?._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">#{index + 1}</TableCell>
                                    <TableCell align="left">{product?.prodName}</TableCell>
                                    <TableCell align="left">{product?.prodUpvotes || 0}</TableCell>
                                    <TableCell align="left">{product?.prodDownvotes || 0}</TableCell>
                                    <TableCell component="th" scope="row">{product?.prodStatus}</TableCell>
                                    <TableCell
                                        align="left">
                                        <Button onClick={() => handleViewClick(product?._id)} variant="outlined" size="small">
                                            View
                                        </Button>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Button onClick={() => navigate(`/dashboard/edit-product/${product?._id}`)} variant="outlined" size="small">
                                            Edit
                                        </Button>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Button onClick={() => handleOpen(product?._id)} variant="outlined" size="small">
                                            Delete
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

export default ManageProducts;