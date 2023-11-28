import { Helmet } from "react-helmet-async";
import Input from '@mui/joy/Input';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import Typography from '@mui/joy/Typography';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Person2Icon from '@mui/icons-material/Person2';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import GoogleSignIn from "../../components/Shared/GoogleSignIn/GoogleSignIn";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from 'react-hot-toast';
import { updateProfile } from "firebase/auth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InvalidFormMsg from "../../components/Shared/InvalidFormMsg/InvalidFormMsg";
import { imageUpload } from "../../api/utils";
import AOS from 'aos';



const Register = () => {
    useEffect(() => {
        AOS.init()
    }, [])
    const { registerUser, user, setLoading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    const from = location?.state?.from?.pathname || '/';
    const axiosPublic = useAxiosPublic();

    if (user) {
        return <Navigate to={from} />;
    }

    const handleRegister = async () => {
        // ^[a-zA-Z ]{3,50}$
        /*-------- input validation -----------*/
        setErrorMsg(null)
        if (!/^[a-zA-Z ]{3,50}$/.test(userName)) {
            setErrorMsg("Name: only a-zA-Z and space allowed and contains 3-50 chars");
            return;
        }
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail)) {
            setErrorMsg("Please enter a valid email address");
            return;
        }
        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,64}$/.test(userPassword)) {
            setErrorMsg("Password must contains 1 lowercase, 1 uppercase, 1 special chars, range 6-64");
            return;
        }
        if (!imageFile) {
            setErrorMsg("Please select an image file");
            return;
        }
        if (imageFile) {
            const allowedExtensions = ['jpg', 'jpeg', 'png'];
            const fileNameParts = imageFile.name.split('.');
            const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
                setErrorMsg("Please select an PNG or JPG/JPEG image.");
                return;
            }
        }


        setSubmitting(true);
        let photoURL = ''
        try {
            const imageData = await imageUpload(imageFile);
            photoURL = imageData?.data?.display_url;
        } catch (err) {
            setSubmitting(false)
        }
        console.log(photoURL);

        const userData = {
            userName, userEmail, userPassword, photoURL, userRole: 'normal',
            status: 'Unverified', isSubscribed: 'no'
        };
        registerUser(userEmail, userPassword)
            .then(res => {
                console.log('inside register.jsx inside handeRegister', res);
                toast.success("Registration successful");
                updateProfile(res.user, {
                    displayName: userName,
                    photoURL: photoURL,
                    reloadUserInfo: {
                        photoUrl: photoURL
                    }
                })
                axiosPublic.post('/users', userData)
                    .then(() => {
                        // console.log(res, 'inside handle register, /users put req');
                        setSubmitting(false);
                    })
                    .catch(() => {
                        // console.log(err, 'inside handle register, /users put req');
                        setSubmitting(false);
                    })
                navigate(from, { replace: true });
                setSubmitting(false);

            })
            .catch(err => {
                // console.log('inside register.jsx inside handeRegister', err.message);
                toast.error(err.message);
                setLoading(false)
                setSubmitting(false)
            })
    }

    return (
        <div className="w-[90%] md:w-full mx-auto" data-aos="zoom-in">
            <Helmet>
                <title>Register | Product Pulse</title>
            </Helmet>
            <div className="py-10 md:py-20 space-y-5">
                <Typography sx={{ textAlign: 'center' }} level="h2">Register Now</Typography>

                <div className="w-full md:w-1/2 mx-auto space-y-4 text-center">
                    <Input
                        onChange={e => setUserName(e.target.value.trim())}
                        sx={{ padding: '10px' }}
                        startDecorator={<Person2Icon />}
                        placeholder="Enter your name"
                        type="text"
                    ></Input>
                    <Input
                        onChange={e => setUserEmail(e.target.value.toLowerCase().trim())}
                        sx={{ padding: '10px' }}
                        startDecorator={<MailIcon />}
                        placeholder="Enter email address"
                        type="email"
                    ></Input>
                    <Input
                        onChange={e => setUserPassword(e.target.value.trim())}
                        sx={{ padding: '10px' }}
                        startDecorator={<LockIcon />}
                        placeholder="Enter password"
                        type="password"
                    ></Input>
                    <div className="border-2 rounded-md p-2 flex justify-start">
                        <CloudUploadIcon />
                        <input
                            onChange={e => setImageFile(e.target.files[0])}
                            className="ml-3"
                            type="file"
                            accept='image/*'
                        />
                    </div>

                    {submitting
                        ? <Button disabled variant="contained" size="large" sx={{ width: '100%' }}>
                            <span className="loading loading-bars loading-md text-acent"></span>
                            <span className="ml-1 font-bold">Creating</span>
                        </Button>
                        : <Button onClick={handleRegister} variant="contained" size="large" sx={{ width: '100%' }}>
                            <AppRegistrationIcon />
                            <span className="ml-1 font-bold">Register Now</span>
                        </Button>
                    }

                    {errorMsg && <InvalidFormMsg>{errorMsg}</InvalidFormMsg>}

                    <div className="text-center text-blue-600 underline">
                        <Link to="/login">{"Already have an account? Login"}</Link>
                    </div>

                    <div className="flex items-center justify-center text-center">
                        <GoogleSignIn />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
