import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import TrendingProducts from "../TrendingProducts/TrendingProducts";
import CouponSliders from "./CouponCarousel/CouponSliders";
import Sliders from "./Sliders/Sliders";
import { Helmet } from "react-helmet-async";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Product Pulse</title>
            </Helmet>
            <div>
                {/* banner/sliders section */}
                <Sliders></Sliders>
            </div>
            <div>
                {/* featured products */}
                <FeaturedProducts></FeaturedProducts>
            </div>
            <div>
                {/* trending products */}
                <TrendingProducts></TrendingProducts>
            </div>
            <div>
                {/* coupon codes sliders/carousel */}
                <CouponSliders></CouponSliders>
            </div>
        </div>
    );
};

export default Home;