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
import InvalidFormMsg from "../../components/Shared/InvalidFormMsg/InvalidFormMsg";


const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { loginUser, user, setLoading } = useAuth();
    const [userEmail, setUserEmail] = useState(null);
    const [userPassword, setUserPassword] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const from = location?.state?.from?.pathname || '/';
    console.log(location, 'location', from);

    if (user) {
        if (from == '/dashboard') {
            return <Navigate to="/" />
        }
        return <Navigate to={from} />
    }

    const handleLogin = () => {

        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail)) {
            setErrorMsg("Please enter a valid email address");
            return;
        }
        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,64}$/.test(userPassword)) {
            setErrorMsg("Password must contains 1 lowercase, 1 uppercase, 1 special chars, range 6-64");
            return;
        }


        setSubmitting(true)
        loginUser(userEmail, userPassword)
            .then(res => {
                setSubmitting(false)
                console.log('inside handle login', res);
                toast.success('Login successful')
                if (from == '/dashboard') {
                    return navigate('/')
                }
                navigate(from);
            })
            .catch(err => {
                console.log('inside handle login', err);
                toast.error('Wrong email/password')
                setLoading(false);
                setSubmitting(false)
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

                    {
                        submitting ?
                            <Button disabled variant="contained" size="large" sx={{ width: '100%' }}>
                                <span className="loading loading-bars loading-md text-acent"></span>
                                <span className="ml-1 font-bold">Validating</span>
                            </Button>
                            :
                            <Button onClick={handleLogin} variant="contained" size="large" sx={{ width: '100%' }}>
                                <LoginIcon></LoginIcon>
                                <span className="ml-1 font-bold">Login</span>
                            </Button>
                    }


                    {/* error message */}
                    <>
                        {
                            errorMsg ?
                                <InvalidFormMsg>
                                    {errorMsg}
                                </InvalidFormMsg>
                                :
                                ""
                        }
                    </>

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