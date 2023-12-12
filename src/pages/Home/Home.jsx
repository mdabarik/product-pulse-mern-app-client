import TrustedBrands from "../../components/TrustedBrands/TrustedBrands";
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
            <div className="w-[90%] mx-auto lg:w-[95%] xl:w-full">
                {/* featured products */}
                <FeaturedProducts></FeaturedProducts>
            </div>
            <div className="w-[90%] mx-auto lg:w-[95%] xl:w-full">
                {/* trending products */}
                <TrendingProducts></TrendingProducts>
            </div>
            <div className="w-[90%] mx-auto lg:w-[95%] xl:w-full">
                {/* trending products */}
                <TrustedBrands></TrustedBrands>
            </div>
            <div className="w-[90%] mx-auto lg:w-[95%] xl:w-full">
                {/* coupon codes sliders/carousel */}
                <CouponSliders></CouponSliders>
            </div>
        </div>
    );
};

export default Home;