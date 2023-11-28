import { useState } from "react";
import Input from '@mui/joy/Input';
import Button from '@mui/material/Button';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LinkIcon from '@mui/icons-material/Link';
import { toast } from 'react-hot-toast';
import useAuth from "../../../hooks/useAuth";
import MailIcon from '@mui/icons-material/Mail';
import Person2Icon from '@mui/icons-material/Person2';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { TagsInput } from "react-tag-input-component";
import { imageUpload } from "../../../api/utils";
import Textarea from '@mui/joy/Textarea';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Navigate, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useProdsOfCurUser from "../../../hooks/useProdsOfCurUser";
import Loader from "../../../components/Shared/Loader/Loader";
import useSingleUser from "../../../hooks/useSingleUser";
import InvalidFormMsg from "../../../components/Shared/InvalidFormMsg/InvalidFormMsg";



const AddNewProduct = () => {
    const { user } = useAuth();
    const [productName, setProductName] = useState('');
    const [imageFile, setImageFile] = useState('');
    const [externalLink, setExternalLink] = useState('');
    const [prodDesc, setProdDesc] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [submitting, setSubmitting] = useState(false);


    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [selected, setSelected] = useState([]);
    // console.log(selected, imageFile);

    const [prods, isLoading] = useProdsOfCurUser();
    const [currUser] = useSingleUser();

    // console.log(currUser?.status, 'status');
    // console.log(prods, 'prods');
    if (isLoading) return <Loader></Loader>
    if (prods?.counts > 0 && currUser?.status == 'Unverified') {
        toast.error("To add more than 1 product, please subscribe (To Subscribe Goto Profile).")
        return <Navigate to="/dashboard/manage-products" replace />
    }

    const handleAddProduct = async () => {


        console.log(errorMsg, 'message');
        setErrorMsg(null)
        if (!/^[a-zA-Z0-9_\-\. ]{10,50}$/.test(productName)) {
            setErrorMsg("Product name can contain only a-zA-Z0-9_.- and space, and must be between 10 and 50 characters.");
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

        if (!/^.{250,}$/.test(prodDesc)) {
            setErrorMsg("Product description must contains 250 chars.");
            return;
        }

        if (selected.length < 3) {
            setErrorMsg("Select minimum 3 tags to create a product.");
            return;
        }

        const urlRegex = /^(?:(?:https?|ftp):\/\/)?(?:www\.)?(?:[a-zA-Z0-9-]+\.){1,}(?:[a-zA-Z]{2,})+(?:\/[^\/]*)*$/;
        if (!urlRegex.test(externalLink)) {
            setErrorMsg("Invalid external link/url, provide valid url please.");
            return;
        }


        setSubmitting(true)
        // console.log('handle add prod clicked');
        let photoURL = ''
        // console.log(photoURL);
        try {
            const imageData = await imageUpload(imageFile);
            photoURL = imageData?.data?.display_url;
        } catch(e) {
            setErrorMsg("Photo can't be uploaded, try later and check internet.");
            setSubmitting(false)
            return;
        }
        // console.log(imageData);
        // productName, externalLink, imageURL, tags, ownerInfo
        // upvotes, downvotes, status, productDesc
        const newProduct = {
            prodName: productName,
            prodDesc: prodDesc,
            prodImg: photoURL,
            prodExtLink: externalLink,
            prodTags: selected,
            prodOwnerInfo: {
                name: user?.displayName,
                img: user?.photoURL,
                email: user?.email
            },
            prodStatus: 'pending',
            prodUpvotes: 0,
            prodDownvotes: 0,
            prodIsFeatured: 'no',
            prodAddedAt: new Date()
        }
        console.log(newProduct);
        axiosSecure.post('/products', newProduct)
            .then(res => {
                console.log(res, 'inside add product handler');
                if (res.data.insertedId) {
                    toast.success("Product added succesfully");
                    navigate('/dashboard/manage-products');
                    setSubmitting(false)
                }
            })
            .catch(err => {
                console.log(err, 'inside add product handler');
                toast.error(err.message);
                setSubmitting(false)
            })
    }

    return (
        <div className="my-5">
            <Helmet>
                <title>Add New Product | Dashboard</title>
            </Helmet>
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>

            <div className="flex flex-col gap-y-6">
                <Input
                    onChange={e => setProductName(e.target.value.trim())}
                    sx={{ padding: '10px' }}
                    startDecorator={<DriveFileRenameOutlineIcon />}
                    placeholder="Product name (min 10 chars upto 50)"
                    type="text"
                ></Input>
                <div className="border-2 rounded-md p-2">
                    <CloudUploadIcon />
                    <input
                        onChange={e => setImageFile(e.target.files[0])}
                        className="ml-3"
                        type="file"
                        accept='image/*'
                    />
                </div>
                {/* owner image */}
                <div className="flex items-center w-[50px] h-[50px]">
                    <img className="w-[50px] h-[50px] rounded-full object-cover" src={user?.photoURL} alt="iamge" />
                </div>
                <Input
                    sx={{ padding: '10px' }}
                    startDecorator={<Person2Icon />}
                    value={user?.displayName}
                    readOnly
                    disabled
                    type="text"
                ></Input>
                
                <Input
                    sx={{ padding: '10px' }}
                    startDecorator={<MailIcon />}
                    value={user?.email}
                    readOnly
                    disabled
                    type="email"
                ></Input>
                <Textarea
                    onChange={e => setProdDesc(e.target.value.trim())}
                    sx={{ padding: '10px', marginY: '14px' }}
                    placeholder="Product description (min 250 chars)" minRows={4} />

                {/* tags */}

                <TagsInput
                    value={selected}
                    onChange={setSelected}
                    name="fruits"
                    placeHolder="Tags (write tag name and hit enter, min 3 tags)"
                />

                <Input
                    onChange={e => setExternalLink(e.target.value)}
                    sx={{ padding: '10px' }}
                    startDecorator={<LinkIcon />}
                    placeholder="External Link"
                    type="text"
                ></Input>


                {
                    submitting
                        ?
                        <Button disabled variant="contained" size="large" sx={{ width: '100%' }}>
                            <span className="loading loading-bars loading-md text-acent"></span>
                            <span className="ml-1 font-bold">Creating</span>
                        </Button>
                        :
                        <Button onClick={handleAddProduct} variant="contained" size="large" sx={{ width: '100%' }}>
                            <AppRegistrationIcon></AppRegistrationIcon>
                            <span className="ml-1 font-bold">Submit Now</span>
                        </Button>
                }

                {/* {
                        submitting
                            ?
                            <Button disabled variant="contained" size="large" sx={{ width: '100%' }}>
                                <span className="loading loading-bars loading-md text-acent"></span>
                                <span className="ml-1 font-bold">Creating</span>
                            </Button>
                            :
                            <Button onClick={handleRegister} variant="contained" size="large" sx={{ width: '100%' }}>
                                <AppRegistrationIcon></AppRegistrationIcon>
                                <span className="ml-1 font-bold">Register Now</span>
                            </Button>
                    } */}




                {/* error message */}
                <>
                    {
                        errorMsg ?
                            <div className="text-center">
                                <InvalidFormMsg>
                                    {errorMsg}
                                </InvalidFormMsg>
                            </div>
                            :
                            ""
                    }
                </>
            </div>
        </div>
    );
};

export default AddNewProduct;