
import couponBannerImg from "../../../assets/coupon-banner.jpg";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import "./CouponSlider.css";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-hot-toast';


const CouponSlider = ({ testitmonial }) => {
    const { userName, photoURL, rating, date, review, profession } = testitmonial || {};

    return (
        <div className="text-white h-[400px] md:h-[450px] flex flex-col items-center justify-center rounded-lg relative">
            <img className='object-cover w-full h-[400px] md:h-[450px]' src={couponBannerImg} alt="banner bg" />
            <div className="absolute top-0 left-0 bg-[#00000099] w-full h-full rounded-lg"></div>
            <div className="absolute top-0 left-0 h-full flex flex-col items-center justify-center px-8 w-full space-y-6">
                <h1 className="coupon-discount">
                    {"20$ OFF"}
                </h1>
                <h3 className="expired-date">
                    Expired on: {"12/23/2023"}
                </h3>
                <h2 className="coupon-code">
                    {"HAPPYNEW YEAR"}
                </h2>
                <div className='w-5/6 h-[90px] flex items-center justify-center text-center overflow-hidden'>
                    <p className="coupon-description">{review.substring(0, 100)}</p>
                </div>
                <div>
                    <CopyToClipboard text={"HAPPYNEWYEAR"}
                        onCopy={() => toast.success(`Code Copied to chipboard`)}>
                        <button className="copy-button"> <ContentPasteIcon /> Copy Code</button>
                    </CopyToClipboard>

                </div>
            </div>
        </div>
    );
};

export default CouponSlider;