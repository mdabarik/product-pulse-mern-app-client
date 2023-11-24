import { Helmet } from "react-helmet-async";
import Input from '@mui/joy/Input';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import Typography from '@mui/joy/Typography';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Person2Icon from '@mui/icons-material/Person2';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinkIcon from '@mui/icons-material/Link';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import GoogleSignIn from "../../components/Shared/GoogleSignIn/GoogleSignIn";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from 'react-hot-toast';
import { updateProfile } from "firebase/auth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
    const { registerUser, user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userPassword, setUserPassword] = useState(null);
    const [userPhoto, setUserPhoto] = useState(null);
    const from = location?.state?.from?.pathname || '/';
    const axiosPublic = useAxiosPublic();

    if (user) {
        return <Navigate to={from} />
    }

    const handleRegister = () => {
        console.log('clicked handleregiter');
        const userData = {
            userName, userEmail, userPassword, userPhoto, userRole: 'normal',
            status: 'Unverified'
        };
        registerUser(userEmail, userPassword)
            .then(res => {
                console.log('inside register.jsx inside handeRegister', res);
                toast.success("Registration successful");
                // update user info in firebase
                updateProfile(res.user, {
                    displayName: userName,
                    photoURL: userPhoto,
                    reloadUserInfo: {
                        photoUrl: userPhoto
                    }
                })
                // saveUserData on database if user created on firebase successfully
                axiosPublic.post('/users', userData)
                    .then(res => {
                        console.log(res, 'inside handle register, /users put req');
                    })
                    .catch(err => {
                        console.log(err, 'inside handle register, /users put req');
                    })
                // on succesfull registration redirect to home
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.log('inside register.jsx inside handeRegister', err.message);
                toast.error("Email already exist");
            })
    }

    return (
        <div>
            <Helmet>
                <title>Register | Product Pulse</title>
            </Helmet>
            <div className="py-20 space-y-5">
                {/* <h2>Register Now</h2> */}
                <Typography sx={{ textAlign: 'center' }} level="h2">Register Now</Typography>

                <div className="w-1/2 mx-auto space-y-4 text-center">
                    <Input
                        onChange={e => setUserName(e.target.value)}
                        sx={{ padding: '10px' }}
                        startDecorator={<Person2Icon />}
                        placeholder="Enter your name"
                        type="text"
                    ></Input>
                    <Input
                        onChange={e => setUserEmail(e.target.value)}
                        sx={{ padding: '10px' }}
                        startDecorator={<MailIcon />}
                        placeholder="Enter email address"
                        type="email"
                    ></Input>
                    <Input
                        onChange={e => setUserPassword(e.target.value)}
                        sx={{ padding: '10px' }}
                        startDecorator={<LockIcon />}
                        placeholder="Enter password"
                        type="password"
                    ></Input>
                    {/* <Input
                        sx={{ padding: '10px' }}
                        startDecorator={<CloudUploadIcon />}
                        placeholder="Enter password"
                        type="file"
                    ></Input> */}
                    <Input
                        onChange={e => setUserPhoto(e.target.value)}
                        sx={{ padding: '10px' }}
                        startDecorator={<LinkIcon />}
                        placeholder="Enter photoURL"
                        type="text"
                    ></Input>
                    <Button onClick={handleRegister} variant="contained" size="large" sx={{ width: '100%' }}>
                        <AppRegistrationIcon></AppRegistrationIcon>
                        <span className="ml-1 font-bold">Register Now</span>
                    </Button>
                    <div className="text-center text-blue-600 underline">
                        <Link to="/login">{"Already have an account? Login"}</Link>
                    </div>
                    {/* google sign in */}
                    <div className="flex items-center justify-center text-center">
                        <GoogleSignIn></GoogleSignIn>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;