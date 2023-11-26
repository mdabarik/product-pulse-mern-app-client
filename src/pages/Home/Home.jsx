import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import TrendingProducts from "../TrendingProducts/TrendingProducts";
import CouponSliders from "./CouponCarousel/CouponSliders";
import Sliders from "./Sliders/Sliders";

const Home = () => {
    return (
        <div>
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