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

const EditProduct = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const [productName, setProductName] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [externalLink, setExternalLink] = useState(null);
    const [prodDesc, setProdDesc] = useState(null);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);
    console.log(selected, imageFile);
    console.log(id);

    const { data: product, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/single-product/${id}`);
            return data;
        }
    })

    if (isLoading) return <Loader></Loader>

    const handleUpdateProduct = async () => {
        let photoURL = null;
        if (imageFile) {
            const imageData = await imageUpload(imageFile);
            photoURL = imageData?.data?.display_url;
        }
        const updatedProduct = {
            prodName: productName || product?.prodName,
            prodDesc: prodDesc || product?.prodDesc,
            prodImg: photoURL || product?.prodImg,
            prodExtLink: externalLink || product?.prodExtLink,
            prodTags: selected || product?.prodTags,
        }
        console.log(updatedProduct, 'udpated or not check it');
        // console.log(newProduct);
        axiosSecure.patch(`/products/${id}`, updatedProduct)
            .then(res => {
                console.log(res, 'inside add product handler');
                refetch();
                if (res.data.modifiedCount) {
                    toast.success("Product added succesfully");
                    // navigate('/dashboard/manage-products');
                } else {
                    toast.error("Please edit product then submit");
                }
            })
            .catch(err => {
                console.log(err, 'inside add product handler');
                toast.error(err.message);
            })
    }

    const handleAddProduct = async () => {
        console.log('handle add prod clicked');
        const imageData = await imageUpload(imageFile);
        const photoURL = imageData?.data?.display_url;
        console.log(photoURL);
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
            prodDownvotes: 0
        }
        // console.log(newProduct);
        axiosSecure.post('/products', newProduct)
            .then(res => {
                console.log(res, 'inside add product handler');
                if (res.data.insertedId) {
                    toast.success("Product added succesfully");
                    navigate('/dashboard/manage-products');
                }
            })
            .catch(err => {
                console.log(err, 'inside add product handler');
                toast.error(err.message);
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
                    onChange={e => setProductName(e.target.value)}
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
                <Input
                    sx={{ padding: '10px' }}
                    startDecorator={<Person2Icon />}
                    value={user?.displayName}
                    readOnly
                    disabled
                    type="text"
                ></Input>
                {/* owner image */}
                <div className="flex items-center">
                    <img className="w-[300px] object-cover" src={user?.photoURL} alt="iamge" />
                </div>
                <Input
                    sx={{ padding: '10px' }}
                    startDecorator={<MailIcon />}
                    value={user?.email}
                    readOnly
                    disabled
                    type="email"
                ></Input>
                <Textarea
                    onChange={e => setProdDesc(e.target.value)}
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
                    onChange={e => setExternalLink(e.target.value)}
                    sx={{ padding: '10px' }}
                    startDecorator={<LinkIcon />}
                    placeholder="External Link"
                    type="text"
                    defaultValue={product?.prodExtLink}
                ></Input>
                <Button onClick={handleUpdateProduct} variant="contained" size="large" sx={{ width: '100%' }}>
                    <AppRegistrationIcon></AppRegistrationIcon>
                    <span className="ml-1 font-bold">Submit Now</span>
                </Button>
            </div>
        </div>
    );
};

export default EditProduct;