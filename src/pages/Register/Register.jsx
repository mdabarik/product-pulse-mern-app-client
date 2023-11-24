import { Helmet } from "react-helmet-async";
import Input from '@mui/joy/Input';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import Typography from '@mui/joy/Typography';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Person2Icon from '@mui/icons-material/Person2';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinkIcon from '@mui/icons-material/Link';
import { Link } from "react-router-dom";
import GoogleSignIn from "../../components/Shared/GoogleSignIn/GoogleSignIn";



const Register = () => {

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
                        sx={{ padding: '10px' }}
                        startDecorator={<Person2Icon />}
                        placeholder="Enter your name"
                        type="text"
                    ></Input>
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
                    <Input
                        sx={{ padding: '10px' }}
                        startDecorator={<CloudUploadIcon />}
                        placeholder="Enter password"
                        type="file"
                    ></Input>
                    <Input
                        sx={{ padding: '10px' }}
                        startDecorator={<LinkIcon />}
                        placeholder="Enter photoURL"
                        type="text"
                    ></Input>
                    <Button variant="contained" size="large" sx={{width: '100%'}}>
                        <AppRegistrationIcon></AppRegistrationIcon>
                        <span className="ml-1 font-bold">Register Now</span>
                    </Button>
                    <div className="text-center text-blue-600 underline">
                        <Link to="/login">{"Already have an account? Login"}</Link>
                    </div>
                    <div className="flex items-center justify-center text-center">
                        <GoogleSignIn></GoogleSignIn>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;