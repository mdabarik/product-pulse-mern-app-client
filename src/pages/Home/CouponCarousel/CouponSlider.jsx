
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
        <div className="text-white h-[400px] md:h-[450px] flex flex-col items-center justify-center rounded-lg relative">
            <img className='object-cover w-full h-[400px] md:h-[450px]' src={couponBannerImg} alt="banner bg" />
            <div className="absolute top-0 left-0 bg-[#00000099] w-full h-full rounded-lg"></div>
            <div className="absolute top-0 left-0 h-full flex flex-col items-center justify-center px-8 w-full space-y-6">
                <h1 className="coupon-discount">
                    {`$${discAmount} OFF`}
                </h1>
                <h3 className="expired-date">
                    Expired on: { moment(expireDate).format('ll')} 
                    {/* format('lll') will give times */}
                </h3>
                <h2 className="coupon-code">
                    {couponCode}
                </h2>
                <div className='w-5/6 h-[60px] flex items-center justify-center text-center overflow-hidden'>
                    <p className="coupon-description">{couponDesc.substring(0, 50)}</p>
                </div>
                <div>
                    <CopyToClipboard text={couponCode}
                        onCopy={() => toast.success(`Coupon ${couponCode} copied in your chipboard`)}>
                        <button className="copy-button"> <ContentPasteIcon /> Copy Code</button>
                    </CopyToClipboard>

                </div>
            </div>
        </div>
    );
};

export default CouponSlider;