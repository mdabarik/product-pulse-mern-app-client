import * as React from 'react';
import Button from '@mui/material/Button';
import useAuth from '../../../hooks/useAuth';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentModal from '../../../components/Dashboard/PaymentModal/PaymentModal';
import useRole from '../../../hooks/useRole';
import useSingleUser from '../../../hooks/useSingleUser';

const Profile = () => {
    const { user } = useAuth();
    const [open, setOpen] = React.useState(false);
    const [role] = useRole();

    const [currUser, isLoding, refetch] = useSingleUser();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handlePayment = (email) => {
        console.log(email, 'email email emial');
        setOpen(true)
    }

    console.log(currUser);

    return (
        <div>
            <h2 className='text-xl font-bold mb-6'>My Profile</h2>
            <div className='drop-shadow-lg bg-[#f5f5f5] mx-auto flex gap-6 flex-col lg:flex-row items-center justify-center py-12 gap-x-12'>
                <div className='w-[200px] h-[200px] rounded-full'>
                    <img className='object-cover h-full w-full rounded-full' src={user?.photoURL} />
                </div>
                <div className='flex flex-col items-start justify-start space-y-3'>
                    <h3 className='font-bold text-center text-xl'>Name: {user?.displayName}</h3>
                    <p>Email: {user?.email} </p>
                    <p>Status: {currUser?.status}</p>
                    <p>Your Role: {currUser?.userRole}</p>
                    {
                        role == 'normal' && currUser?.isSubscribed == 'no' ?
                            <Button onClick={() => handlePayment(user?.email)} sx={{ padding: '10px', paddingX: '20px', borderRadius: '50px' }} variant="contained" endIcon={<CreditCardIcon />}>
                                Premium Subscription
                            </Button>
                            : ''
                    }
                </div>
            </div>
            {/* Modal */}
            <PaymentModal open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose}></PaymentModal>
        </div>
    );
}

export default Profile;