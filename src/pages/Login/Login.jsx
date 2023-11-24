import { Helmet } from "react-helmet-async";
import Input from '@mui/joy/Input';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import Typography from '@mui/joy/Typography';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import GoogleSignIn from "../../components/Shared/GoogleSignIn/GoogleSignIn";
import useAuth from "../../hooks/useAuth";
import { toast } from 'react-hot-toast';
import { useState } from "react";


const Login = () => {
    const navigate = useNavigate();
    const { loginUser, user } = useAuth();
    const location = useLocation();
    const [userEmail, setUserEmail] = useState(null);
    const [userPassword, setUserPassword] = useState(null);
    const from = location?.state?.from?.pathname || '/';

    if (user) {
        return <Navigate to={from} />
    }

    const handleLogin = () => {
        loginUser(userEmail, userPassword)
            .then(res => {
                console.log('inside handle login', res);
                toast.success('Login successful')
                navigate(from);
            })
            .catch(err => {
                console.log('inside handle login', err);
                toast.error('Wrong email/password')
            })
    }

    return (
        <div>
            <Helmet>
                <title>Login | Product Pulse</title>
            </Helmet>
            <div className="py-20 space-y-5">
                {/* <h2>Login Now</h2> */}
                <Typography sx={{ textAlign: 'center' }} level="h2">Login Now</Typography>

                <div className="w-1/2 mx-auto space-y-4 text-center">
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
                    <Button onClick={handleLogin} variant="contained" size="large" sx={{ width: '100%' }}>
                        <LoginIcon></LoginIcon>
                        <span className="ml-1 font-bold">Login</span>
                    </Button>
                    <div className="text-center text-blue-600 underline">
                        <Link to="/register">{"Don't have an account? Register"}</Link>
                    </div>

                    {/* google signin */}
                    <div className="flex items-center justify-center text-center">
                        <GoogleSignIn></GoogleSignIn>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;