import { useNavigate } from "react-router-dom";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';


import { useState } from "react";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const { _id, prodName, prodDesc, prodImg, prodExtLink, prodTags, prodStatus, prodUpvotes, prodDownvotes } = product;


    return (
        <div className="hover:cursor-pointer">
            <div>
                <img className="w-full rounded-t-lg h-[200px] object-cover" src={prodImg} alt="room image" />
            </div>
            <div className="w-full min-h-[200px] bg-white rounded-b-lg p-4 drop-shadow-md flex flex-col justify-between gap-x-4 space-y-2" >
                <h2 className="font-bold">Product: {prodName}</h2>
                <div className="flex gap-2">
                    <p>Tags:</p>
                    <div className="flex gap-2">
                        {
                            prodTags?.slice(0,5).map((tag, index) => <p key={index}>{tag}</p>)
                        }
                    </div>
                </div>
                <div className="flex items-center">
                    {/* rating */}
                    <p>******</p>
                    ({0} <span className="ml-2">reviews</span>)
                </div>
                <div className="flex justify-evenly mt-4">
                    <div className="flex">
                        <ArrowUpwardIcon />
                        <p>(12)</p>
                    </div>
                    <div className="flex">
                        <ArrowDownwardIcon />
                        <p>(12)</p>
                    </div>
                </div>
                <div className="flex items-center justify-center mt-4">
                    <Button onClick={() => navigate(`/all-products/${_id}`)} sx={{borderRadius: '0px',  padding: '8px', paddingX: '20px', width: '100%'}} startIcon={<VisibilityIcon />} variant="contained">View Details</Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;