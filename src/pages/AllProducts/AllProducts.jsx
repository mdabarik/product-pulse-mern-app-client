import ProductCard from "./ProductCard";
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Skeleton from '@mui/material/Skeleton';
import useVerifiedProds from "../../hooks/useVerifiedProds";
import { Helmet } from "react-helmet-async";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const AllProducts = () => {
    const [products] = useVerifiedProds();
    console.log(products, 'allprod');


    const axiosPublic = useAxiosPublic();
    const [search, setSearch] = useState(null);
    // console.log(search);

    const {data: count } = useQuery({
        queryKey: ['count search', search],
        queryFn: async () => {
            const {data} = await axiosPublic.get(`/count-accepted-prods?search=${search}`);
    console.log(data, 'inside use count acceptedprods');
    return data;
        }
    })

    /*-----pagination-----*/
    const [perPage, setPerPage] = useState(4);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };
    // console.log(page);

    // /all-products-public?page=${page}&limit=${perPage}
    const {data: prods, isLoading, refetch } = useQuery({
        queryKey: ['all-prods-public', page, search],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all-products-public?page=${page}&limit=${perPage}&search=${search}`);
    // console.log(res.data);
    return res.data;
        }
    })
    useEffect(() => {
        setTotalPage(Math.ceil(count?.count / perPage))
    }, [count])

    // if isloading show loader
    // if (isLoading) return <Loader></Loader>

    return (
    <div className="w-[90%] mx-auto lg:w-[95%]">
        <Helmet>
            <title>All Products | Product Pulse</title>
        </Helmet>
        {/* page title */}
        <div>
            <h3 className="text-xl font-bold py-4">
                All Products: {products?.length}
            </h3>
        </div>
        {/* Search Functionality */}
        <div>
            <p className="font-normal my-2">Search products by tag name</p>
            <Box
                sx={{
                    width: 500,
                    maxWidth: '100%',
                    display: 'flex'
                }}
            >
                <TextField
                    fullWidth
                    placeholder="Search by tags"
                    onChange={(e) => setSearch(e.target.value.trim())}
                    id="fullWidth" />

                <Button
                    sx={{ borderRadius: '0px', padding: '8px', paddingX: '20px', width: '40px', marginLeft: '-60px' }}
                    startIcon={<SearchIcon />} variant="contained"></Button>
            </Box>
        </div>
        {/* all products card */}
        {

            isLoading ? <div className="mt-[28px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 ">
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
            count?.count == 0 ?
                <h2>No products Found</h2>
                :
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
                    {
                        prods?.map(product => <ProductCard
                            product={product}
                            key={product?._id}></ProductCard>)
                    }
                </div>
        }

        {/* pagination */}
        {
            count?.count != 0
                ?
                <div className="flex items-center justify-center pb-10 ">
                    <Stack spacing={2}>
                        {/* <Typography>Page: {page}</Typography> */}
                        <Pagination color="primary" count={totalPage || 1} page={page} onChange={handleChange} />
                    </Stack>
                </div>
                :
                ''
        }

    </div>
    );
};

    export default AllProducts;