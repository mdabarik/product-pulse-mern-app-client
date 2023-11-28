import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';
import DraftModeBtn from '../../../components/Button/DraftModeBtn';
import ViewBtn from '../../../components/Shared/ViewBtn/ViewBtn';
import EditBtn from '../../../components/Button/EditBtn';
import DeleteIcon from '../../../components/Shared/DeleteIcon/DeleteIcon';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';



const ManagePrdRow = ({product, index, handleOpen}) => {

    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleViewClick = (id) => {
        const url = `/all-products/${id}`;
        window.open(url, '_blank');
    };

    const handleDraftView = (id) => {
        // navigate()
        const url = `/draft/${id}`;
        window.open(url, '_blank');
    }


    const {data: votes, isLoading, refetch} = useQuery({
        queryKey: ['voting-up-down', product?._id],
        queryFn: async() => {
            const {data} = await axiosPublic.get(`/get-votes/?id=${product?._id}`);
            console.log(data, 'hello');
            return data;
        }
    })



    return (
        <TableRow key={product?._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">#{index + 1}</TableCell>
            <TableCell align="left">{product?.prodName}</TableCell>
            <TableCell align="left">{votes?.upvotes || 0}</TableCell>
            <TableCell align="left">{votes?.downvotes || 0}</TableCell>
            <TableCell component="th" scope="row">{product?.prodStatus}</TableCell>
            <TableCell
                align="left">

                {
                    product?.prodStatus == 'pending' || product?.prodStatus == 'Rejected' ?
                        <button onClick={() => {
                            toast.error(`${product?.prodStatus} product, view on draft mode.`)
                            // navigate(`/dashboard/edit-product/${product?._id}`)
                            handleDraftView(product?._id)
                        }} >
                            {/* <ViewBtn></ViewBtn> */}
                            <DraftModeBtn></DraftModeBtn>
                        </button>
                        :
                        <button onClick={() => handleViewClick(product?._id)} >
                            <ViewBtn></ViewBtn>
                        </button>
                }


            </TableCell>
            <TableCell align="left">
                <button onClick={() => navigate(`/dashboard/edit-product/${product?._id}`)} >
                    <EditBtn></EditBtn>
                </button>
            </TableCell>
            <TableCell align="left">
                <button onClick={() => handleOpen(product?._id)} >
                    <DeleteIcon></DeleteIcon>
                </button>
            </TableCell>

        </TableRow>
    );
};

export default ManagePrdRow;
// /get-votes