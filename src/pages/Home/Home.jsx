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
                Featured products
            </div>
            <div>
                {/* trending products */}
                Trending products
            </div>
            <div>
                {/* coupon codes sliders/carousel */}
                <CouponSliders></CouponSliders>
            </div>
        </div>
    );
};

export default Home;