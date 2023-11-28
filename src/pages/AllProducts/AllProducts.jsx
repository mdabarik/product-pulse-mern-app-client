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
    // console.log(products, 'allprod');
    /*-----pagination-----*/
    const [perPage, setPerPage] = useState(20);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };
    // console.log(page);


    const axiosPublic = useAxiosPublic();
    const [search, setSearch] = useState('');
    const [tmpSearch, setTmpSearch] = useState();
    // console.log(search);

    const { data: count } = useQuery({
        queryKey: ['count search', search],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/count-accepted-prods?search=${search}`);
            console.log(data, 'isearch result');
            setPage(1);
            return data;
        }
    })

    

    // /all-products-public?page=${page}&limit=${perPage}
    const { data: prods, isLoading, refetch } = useQuery({
        queryKey: ['all-prods-public', page, search],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all-products-public?page=${page}&limit=${perPage}&search=${search}`);
            console.log(res.data, 'inside search limit pageer');
            return res.data;
        }
    })
    useEffect(() => {
        setTotalPage(Math.ceil(count?.count / perPage))
    }, [count])

    // if isloading show loader
    // if (isLoading) return <Loader></Loader>


    const handleSearchText = () => {
        console.log(tmpSearch, 'clicked');
        setSearch(tmpSearch);
    }

    return (
        <div className="w-[90%] mx-auto lg:w-[95%]">
            <Helmet>
                <title>All Products | Product Pulse</title>
            </Helmet>
            {/* page title */}
            <div>
                <h3 className="text-xl font-bold py-2 pt-4">
                    All Products: {products?.length}
                </h3>
            </div>

            {/* Search Functionality */}
            <div>
                <p className="font-normal my-2">Search products by tag name</p>
                <div className="flex items-start justify-start">
                    <div className="flex items-center justify-center h-[50px] w-full lg:w-1/2">
                        <input
                            onChange={(e) => setSearch(e.target.value.trim())}
                            className="py-2 w-full px-4 border-r-0 border-[#bfbfc3] text-lg bg-[#f8f8ff] h-full outline-none border-2 focus:border-blue-500"
                            type="text"
                            placeholder="Search by tags"
                        />
                        <button className="bg-[#1876d2] hover:bg-[rgb(29,98,168)] flex gap-2 items-center justify-center active:bg-[#1876d2] text-white px-4 py-2 h-full">
                            <SearchIcon />
                        </button>
                    </div>
                </div>
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
                    <>
                        <h2>No products Found</h2>
                    </>
                    :
                    <>
                        <>
                            {
                                search ? <h2>{count?.count} products Found</h2> : ''
                            }
                        </>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
                            {
                                prods?.map(product => <ProductCard
                                    product={product}
                                    key={product?._id}></ProductCard>)
                            }
                        </div>
                    </>
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