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
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Shared/Loader/Loader";
import { Helmet } from "react-helmet-async";
import InvalidFormMsg from "../../../components/Shared/InvalidFormMsg/InvalidFormMsg";

const EditProduct = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const [productName, setProductName] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [externalLink, setExternalLink] = useState(null);
    const [prodDesc, setProdDesc] = useState(null);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);
    // console.log(selected, imageFile);
    const [errorMsg, setErrorMsg] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // console.log(id);

    const { data: product, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/single-product/${id}`);
            return data;
        }
    })

    if (isLoading) return <Loader></Loader>

    const handleUpdateProduct = async () => {
        setErrorMsg(null)
        if (productName && !/^[a-zA-Z0-9_\-\. ]{10,50}$/.test(productName)) {
            setErrorMsg("Product name can contain only a-zA-Z0-9_.- and space, and must be between 10 and 50 characters.");
            return;
        }

        // if (!imageFile) {
        //     setErrorMsg("Please select an image file");
        //     return;
        // }

        if (imageFile) {
            const allowedExtensions = ['jpg', 'jpeg', 'png'];
            const fileNameParts = imageFile.name.split('.');
            const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
                setErrorMsg("Please select an PNG or JPG/JPEG image.");
                return;
            }
        }

        if (prodDesc && !/^.{250,}$/.test(prodDesc)) {
            setErrorMsg("Product description must contains 250 chars.");
            return;
        }

        if (selected && selected?.length < 3) {
            setErrorMsg("Select minimum 3 tags to create a product.");
            return;
        }

        const urlRegex = /^(?:(?:https?|ftp):\/\/)?(?:www\.)?(?:[a-zA-Z0-9-]+\.){1,}(?:[a-zA-Z]{2,})+(?:\/[^\/]*)*$/;
        if (externalLink && !urlRegex.test(externalLink)) {
            setErrorMsg("Invalid external link/url, provide valid url please.");
            return;
        }


        setSubmitting(true)
        // console.log('handle add prod clicked');
        let photoURL = null;
        if (imageFile) {
            try {
                const imageData = await imageUpload(imageFile);
                photoURL = imageData?.data?.display_url;
            } catch (e) {
                setErrorMsg("Photo can't be uploaded, try later and check internet.");
                setSubmitting(false)
                return;
            }
        }

        // let photoURL = null;
        // if (imageFile) {
        //     const imageData = await imageUpload(imageFile);
        //     photoURL = imageData?.data?.display_url;
        // }

        const updatedProduct = {
            prodName: productName || product?.prodName,
            prodDesc: prodDesc || product?.prodDesc,
            prodImg: photoURL || product?.prodImg,
            prodExtLink: externalLink || product?.prodExtLink,
            prodTags: selected || product?.prodTags,
        }
        // console.log(updatedProduct, 'udpated or not check it');
        // console.log(newProduct);
        axiosSecure.patch(`/products/${id}`, updatedProduct)
            .then(res => {
                // console.log(res, 'inside add product handler');
                refetch();
                if (res.data.modifiedCount) {
                    toast.success("Product added succesfully");
                    // navigate('/dashboard/manage-products');
                    setSubmitting(false)
                } else {
                    toast.error("Please edit product then submit");
                    setSubmitting(false)
                }
            })
            .catch(err => {
                // console.log(err, 'inside add product handler');
                toast.error(err.message);
                setSubmitting(false)
            })
    }

    return (
        <div>
            <Helmet>
                <title>Edit {product?.prodName} | Dashboard</title>
            </Helmet>
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <div className="flex flex-col gap-y-6">
                <Input
                    onChange={e => setProductName(e.target.value.trim())}
                    sx={{ padding: '10px' }}
                    startDecorator={<DriveFileRenameOutlineIcon />}
                    placeholder="Product name"
                    type="text"
                    defaultValue={product?.prodName}
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
                <div className="flex items-center">
                    <img className="w-[300px] object-cover" src={product?.prodImg} alt="iamge" />
                </div>
                {/* <Input
                    sx={{ padding: '10px' }}
                    startDecorator={<Person2Icon />}
                    value={user?.displayName}
                    readOnly
                    disabled
                    type="text"
                ></Input> */}
                {/* owner image */}
                {/* <div className="flex items-center">
                    <img className="w-[300px] object-cover" src={user?.photoURL} alt="iamge" />
                </div> */}
                {/* <Input
                    sx={{ padding: '10px' }}
                    startDecorator={<MailIcon />}
                    value={user?.email}
                    readOnly
                    disabled
                    type="email"
                ></Input> */}
                <Textarea
                    onChange={e => setProdDesc(e.target.value.trim())}
                    defaultValue={product?.prodDesc}
                    sx={{ padding: '10px', marginY: '14px' }}
                    placeholder="Product description" minRows={4} />

                {/* tags */}
                <TagsInput
                    value={product?.prodTags}
                    // defaultValue={product?.prodTags}
                    onChange={setSelected}
                    name="fruits"
                    placeHolder="Tags (write tag name and hit enter)"
                />
                <Input
                    onChange={e => setExternalLink(e.target.value.trim())}
                    sx={{ padding: '10px' }}
                    startDecorator={<LinkIcon />}
                    placeholder="External Link"
                    type="text"
                    defaultValue={product?.prodExtLink}
                ></Input>



                {/* <Button onClick={handleUpdateProduct} variant="contained" size="large" sx={{ width: '100%' }}>
                    <AppRegistrationIcon></AppRegistrationIcon>
                    <span className="ml-1 font-bold">Submit Now</span>
                </Button> */}


                {
                    submitting
                        ?
                        <Button disabled variant="contained" size="large" sx={{ width: '100%' }}>
                            <span className="loading loading-bars loading-md text-acent"></span>
                            <span className="ml-1 font-bold">Updating</span>
                        </Button>
                        :
                        <Button onClick={handleUpdateProduct} variant="contained" size="large" sx={{ width: '100%' }}>
                            <AppRegistrationIcon></AppRegistrationIcon>
                            <span className="ml-1 font-bold">Submit Now</span>
                        </Button>
                }


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

export default EditProduct;