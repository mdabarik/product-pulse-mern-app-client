
import couponBannerImg from "../../../assets/coupon-banner.jpg";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import "./CouponSlider.css";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-hot-toast';
import moment from 'moment';

const CouponSlider = ({ coupon }) => {
    // const { userName, photoURL, rating, date, review, profession } = testitmonial || {};
    const { couponCode, expireDate, discAmount, couponDesc } = coupon;

    return (
        // <div className="text-white h-[400px] md:h-[450px] flex flex-col items-center justify-center rounded-lg relative">
        //     <img className='object-cover w-full h-[400px] md:h-[450px]' src={couponBannerImg} alt="banner bg" />
        //     <div className="absolute top-0 left-0 bg-[#00000099] w-full h-full rounded-lg"></div>
        //     <div className="absolute top-0 left-0 h-full flex flex-col items-center justify-center px-8 w-full space-y-6">
        //         <h1 className="coupon-discount">
        //             {`$${discAmount} OFF`}
        //         </h1>
        //         <h3 className="expired-date">
        //             Expired on: { moment(expireDate).format('ll')} 
        //             {/* format('lll') will give times */}
        //         </h3>
        //         <h2 className="coupon-code">
        //             {couponCode}
        //         </h2>
        //         <div className='w-5/6 h-[60px] flex items-center justify-center text-center overflow-hidden'>
        //             <p className="coupon-description">{couponDesc?.substring(0, 50)}</p>
        //         </div>
        //         <div>
        //             <CopyToClipboard text={couponCode}
        //                 onCopy={() => toast.success(`Coupon ${couponCode} copied in your chipboard`)}>
        //                 <button className="copy-button"> <ContentPasteIcon /> Copy Code</button>
        //             </CopyToClipboard>

        //         </div>
        //     </div>
        // </div>
        <div className="text-white h-[300px] md:h-[400px] lg:h-[450px] xl:h-[500px] flex flex-col items-center justify-center rounded-lg relative bg-blue-600">
            <img className="object-cover w-full h-[300px] md:h-[400px] lg:h-[450px] xl:h-[500px] rounded-lg" src={couponBannerImg} alt="banner bg" />
            <div className="absolute top-0 left-0 bg-black bg-opacity-50 w-full h-full rounded-lg"></div>
            <div className="absolute top-0 left-0 h-full flex flex-col items-center justify-center px-4 md:px-8 w-full space-y-4 md:space-y-6">
                <h1 className="coupon-discount text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
                    {`$${discAmount} OFF`}
                </h1>
                <h3 className="expired-date text-sm md:text-base lg:text-lg xl:text-xl">
                    Expired on: {moment(expireDate).format('ll')}
                </h3>
                <h2 className="coupon-code text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
                    {couponCode}
                </h2>
                <div className="w-full md:w-5/6 xl:w-4/5 h-[40px] md:h-[60px] flex items-center justify-center text-center overflow-hidden">
                    <p className=" text-xs md:text-sm lg:text-base xl:text-lg">
                        {couponDesc?.substring(0, 50)}
                    </p>
                </div>
                <div>
                    <CopyToClipboard text={couponCode} onCopy={() => toast.success(`Coupon ${couponCode} copied to your clipboard`)}>
                        <button className="copy-button bg-blue-700 text-white py-2 px-4 rounded-full flex items-center space-x-2 text-xs md:text-sm lg:text-base xl:text-lg">
                            <ContentPasteIcon className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7" /> Copy Code
                        </button>
                    </CopyToClipboard>
                </div>
            </div>
        </div>
    );
};

export default CouponSlider;