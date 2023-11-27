import Button from '@mui/material/Button';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import {toast} from 'react-hot-toast';


const Report = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const { data: report, isLoading, refetch } = useQuery({
        queryKey: ['report-data', id, loading, user],
        queryFn: async () => {
            const res = await axiosSecure.get(`/is-reported?email=${user?.email}&id=${id}`)
            console.log('is reported', res.data);
            return res.data;
        }
    })

    const handleReport = () => {
        const reportDoc = {
            userEmail: user?.email,
            prodId: id,
            reportedAt: new Date()
        }
        axiosSecure.post('/report-prod', reportDoc)
        .then(res => {
            console.log(res);
            if (res.data.insertedId) {
                refetch();
                toast.success('Reported successfully');
                setOpen(false)
            }
        })
        .catch(err => {
            console.log(err);
            toast.error("Something went wrong, try again later")
        })
    }

    return (
        <div>
            {
                isLoading
                    ?
                    <>
                        <span className="loading loading-infinity loading-lg text-accent"></span>
                    </>

                    :
                    <>
                        {report?.isReported ?
                            <Button disabled onClick={() => setOpen(true)} size="small" sx={{ textTransform: 'lowercase' }} variant="contained" endIcon={<FlagCircleIcon />}>
                                Reported
                            </Button>
                            :
                            <Button onClick={() => setOpen(true)} size="small" sx={{ textTransform: 'lowercase' }} variant="contained" endIcon={<FlagCircleIcon />}>
                                Report
                            </Button>
                        }
                    </>
            }

            {/* modal start */}
            <React.Fragment>
                <Dialog
                    sx={{ textAlign: 'center' }}
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
                            Do you want to report this product?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={() => setOpen(false)} size="small" sx={{}} variant="outlined">
                            Cancel
                        </Button>
                        <Button onClick={() => {
                            handleReport()
                        }} size="small" sx={{}} variant="contained">
                            Yes, Report
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
            {/* modal end */}

        </div>
    );
};

export default Report;