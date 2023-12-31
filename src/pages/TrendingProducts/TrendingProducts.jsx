import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ProductCard from "../AllProducts/ProductCard";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import AOS from 'aos';
import { useEffect } from "react";
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


const TrendingProducts = () => {
    useEffect(() => {
        AOS.init()
    }, [])

    const axiosPublic = useAxiosPublic();
    const { user, loading, resolver } = useAuth();
    const navigate = useNavigate();

    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ['trending-products', resolver],
        queryFn: async () => {
            const res = await axiosPublic.get(`/get-trending-products`);
            // console.log(res, 'aggregated challenge');
            return res.data;
        }
    })

    return (
        <div className="mt-8" data-aos="zoom-in">
            <div className="flex flex-col items-center justify-center mt-4 space-x-4">
                <h2 className="text-2xl font-bold text-center">Trending Products</h2>
                <p className="text-center mt-2">Stay Ahead of the Curve: Explore Our Trending Products</p>
            </div>

            {
                isLoading ? <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
                    <Stack spacing={3}>
                        {/* For other variants, adjust the size with `width` and `height` */}
                        <Skeleton variant="reactangle" width={300} height={200} />
                        <Skeleton variant="rectangular" width={300} height={40} />
                        <Skeleton variant="rounded" width={300} height={25} />
                        <Skeleton variant="rounded" width={300} height={25} />
                        <Skeleton variant="rounded" width={300} height={40} />
                    </Stack>
                    <Stack spacing={3}>
                        {/* For other variants, adjust the size with `width` and `height` */}
                        <Skeleton variant="reactangle" width={300} height={200} />
                        <Skeleton variant="rectangular" width={300} height={40} />
                        <Skeleton variant="rounded" width={300} height={25} />
                        <Skeleton variant="rounded" width={300} height={25} />
                        <Skeleton variant="rounded" width={300} height={40} />
                    </Stack>
                    <Stack spacing={3}>
                        {/* For other variants, adjust the size with `width` and `height` */}
                        <Skeleton variant="reactangle" width={300} height={200} />
                        <Skeleton variant="rectangular" width={300} height={40} />
                        <Skeleton variant="rounded" width={300} height={25} />
                        <Skeleton variant="rounded" width={300} height={25} />
                        <Skeleton variant="rounded" width={300} height={40} />
                    </Stack>
                    <Stack spacing={3}>
                        {/* For other variants, adjust the size with `width` and `height` */}
                        <Skeleton variant="reactangle" width={300} height={200} />
                        <Skeleton variant="rectangular" width={300} height={40} />
                        <Skeleton variant="rounded" width={300} height={25} />
                        <Skeleton variant="rounded" width={300} height={25} />
                        <Skeleton variant="rounded" width={300} height={40} />
                    </Stack>
                </div> : ''
            }

            {
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
                    {
                        products?.map(product => <ProductCard
                            refetch={refetch}
                            product={product}
                            key={product?._id}></ProductCard>)
                    }
                </div>
            }

            <div className="my-4 flex items-center justify-center text-[14px] w-[70%] md:w-[60%] lg:w-1/3 mx-auto">
                <Button onClick={() => navigate('/all-products')} variant="contained" size="sm" startIcon={<ViewCompactIcon />} sx={{ width: '100%', borderRadius: '20px' }}> 
                    View All Products
                </Button>
            </div>
        </div>
    );
};

export default TrendingProducts;