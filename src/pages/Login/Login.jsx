import { Helmet } from "react-helmet-async";
import Input from '@mui/joy/Input';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import Typography from '@mui/joy/Typography';
import { Link } from "react-router-dom";
import GoogleSignIn from "../../components/Shared/GoogleSignIn/GoogleSignIn";


const Login = () => {

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
                        sx={{ padding: '10px' }}
                        startDecorator={<MailIcon />}
                        placeholder="Enter email address"
                        type="email"
                    ></Input>
                    <Input
                        sx={{ padding: '10px' }}
                        startDecorator={<LockIcon />}
                        placeholder="Enter password"
                        type="password"
                    ></Input>
                    <Button variant="contained" size="large" sx={{width: '100%'}}>
                        <LoginIcon></LoginIcon>
                        <span className="ml-1 font-bold">Login</span>
                    </Button>
                    <div className="text-center text-blue-600 underline">
                        <Link to="/register">{"Don't have an account? Register"}</Link>
                    </div>
                    <div className="flex items-center justify-center text-center">
                        <GoogleSignIn></GoogleSignIn>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;