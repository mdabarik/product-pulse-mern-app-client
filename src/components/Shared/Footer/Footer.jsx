import { Link } from "react-router-dom";
import Logo from "./../../../assets/brand-logo-filled.png";
import { FaTwitter } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";

const Footer = () => {

    const footerLinks = <>
        <Link to="/">Home</Link>
        <Link to="/rooms">All Products</Link>
        <Link to="/about-us">About Us</Link>
        <Link to="/my-booking">Login</Link>
        <Link to="/faq">Registration</Link>
    </>

    const socialLinks = <>
        <Link to="#">
            <FaTwitter className="text-3xl"></FaTwitter>
        </Link>
        <Link to="#">
            <BsYoutube className="text-3xl"></BsYoutube>
        </Link>
        <Link to="#">
            <BsFacebook className="text-3xl"></BsFacebook>
        </Link>
    </>


    return (
        <footer className="p-6 drop-shadow bg-base-100 relative -z-10">
            <div className="flex flex-col items-center justify-between  mx-auto gap-y-2">
                <div className="flex flex-col items-center justify-center gap-y-2">
                    <div>
                        <img src={Logo} alt="image" />
                    </div>
                    <p className="font-bold text-2xl">Product <span className="text-[blue]">Pulse</span></p>
                    <div>
                        <div className="text-center text-sm">
                            <p>Location: 123 Main Street, Cityville, State 12345</p>
                            <p>USA, United State of America</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-4 mt-3 link">
                    {footerLinks}
                </div>
                <div className="flex items-center justify-center gap-4 mt-3 link">
                    {socialLinks}
                </div>

            </div>
            <div className="text-center border-t-2 w-1/2 mx-auto mt-6">
                <p className="mt-6">All Right Reversed &copy; 2023-2029</p>
            </div>
        </footer>
    );
};

export default Footer;