import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ProductCard from "../AllProducts/ProductCard";

const FeaturedProducts = () => {
    const axiosPublic = useAxiosPublic();
    const { user, loading } = useAuth();

    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ['trending-products', user, loading],
        queryFn: async () => {
            const res = await axiosPublic.get(`/get-featured-products?limit=4`);
            console.log(res, 'featured products');
            return res.data;
        }
    })


    return (
        <div className="mt-8">
            <div className="flex flex-col items-center justify-center mt-4 space-x-4">
                <h2 className="text-2xl font-bold text-center">Featured Products</h2>
                <p className="text-center mt-2">Discover Smart Living with Our Gadget Collection</p>
            </div>
            <div>
                {
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
                        {
                            products?.map(product => <ProductCard
                                product={product}
                                key={product?._id}></ProductCard>)
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default FeaturedProducts;