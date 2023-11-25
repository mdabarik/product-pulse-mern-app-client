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
import { useNavigate } from "react-router-dom";



const AddNewProduct = () => {
    const { user } = useAuth();
    const [productName, setProductName] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [externalLink, setExternalLink] = useState(null);
    const [prodDesc, setProdDesc] = useState(null);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [selected, setSelected] = useState([]);
    console.log(selected, imageFile);



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
            prodDownvotes: 0,
            prodIsFeatured: 'no'
        }
        console.log(newProduct);
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
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            {/* input: product name
            input: image
            input: Description
            
            product owner info: (readonly)
            owername, owner image, owner email

            tags
            external links
            submit button

            on click submit save data on mongodb, show toast,
            redirect to my prods page */}
            <div className="flex flex-col gap-y-6">
                <Input
                    onChange={e => setProductName(e.target.value)}
                    sx={{ padding: '10px' }}
                    startDecorator={<DriveFileRenameOutlineIcon />}
                    placeholder="Product name"
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
                {/* <Input
                        sx={{ padding: '10px' }}
                        startDecorator={<CloudUploadIcon />}
                        type="file"
                        accept='image/*'
                    /> */}
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
                    sx={{ padding: '10px', marginY: '14px' }} 
                    placeholder="Product description" minRows={4} />

                {/* tags */}
                
                <TagsInput
                    value={selected}
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
                ></Input>
                <Button onClick={handleAddProduct} variant="contained" size="large" sx={{ width: '100%' }}>
                    <AppRegistrationIcon></AppRegistrationIcon>
                    <span className="ml-1 font-bold">Submit Now</span>
                </Button>
            </div>
        </div>
    );
};

export default AddNewProduct;