import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { FcGoogle } from "react-icons/fc";
import useAuth from '../../../hooks/useAuth';
import auth from '../../../config/firebase.config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const GoogleSignIn = () => {

    const { googleSignIn } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn(auth)
        .then(res => {
            console.log('inside handleGoogleSignin', res);
            navigate('/')
            toast.success("Google Sign In Successful")
            // save user data on database if data does not exist
        })
        .catch(err => {
            console.log('inside handleGoogleSignin', err);
            toast.success(err.message)
        })
    }

    return (
        <Stack direction="row" spacing={10}>
            <Button onClick={handleGoogleSignIn} sx={{borderRadius: '50px', minWidth: '300px', padding: '8px'}} variant="outlined" startIcon={<FcGoogle className="text-5xl"></FcGoogle>}>
                Sign In with Google
            </Button>
        </Stack>
    );
};

export default GoogleSignIn;

