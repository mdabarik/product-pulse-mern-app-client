import { Link } from "react-router-dom";
import Logo from "./../../../assets/brand-logo-filled.png";
import { FaTwitter } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import useAuth from "../../../hooks/useAuth";
import AOS from 'aos';
import { useEffect } from "react";
import QRCode from "react-qr-code";


const Footer = () => {
    const { user } = useAuth();

    useEffect(() => {
        AOS.init()
    }, [])

    const footerLinks = (
        <>
            <Link to="/" className="text-sm lg:text-base">Home</Link>
            <Link to="/all-products" className="text-sm lg:text-base">All Products</Link>
            <Link to="/about-us" className="text-sm lg:text-base">About Us</Link>
            {!user && (
                <>
                    <Link to="/login" className="text-sm lg:text-base">Login</Link>
                    <Link to="/register" className="text-sm lg:text-base">Registration</Link>
                </>
            )}
        </>
    );

    const socialLinks = (
        <>
            <Link to="#" className="text-[#1DA1F2] hover:text-[#1DA1F2] focus:text-[#1DA1F2]">
                <FaTwitter className="text-2xl lg:text-3xl" />
            </Link>
            <Link to="#" className="text-[#FF0000] hover:text-[#FF0000] focus:text-[#FF0000]">
                <BsYoutube className="text-2xl lg:text-3xl" />
            </Link>
            <Link to="#" className="text-[#1877F2] hover:text-[#1877F2] focus:text-[#1877F2]">
                <BsFacebook className="text-2xl lg:text-3xl" />
            </Link>
        </>
    );

    return (
        <footer className="p-6 drop-shadow bg-base-100" data-aos="zoom-in">
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-y-6 lg:gap-y-0">
                <div className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left">
                    <div className="flex items-center justify-center mx-auto">
                        <img src={Logo} alt="image" className="h-10 lg:h-12" />
                    </div>
                    <p className="font-bold text-lg md:text-xl lg:text-2xl mt-2 lg:mt-0">
                        Product <span className="text-[#3498db]">Pulse</span>
                    </p>
                </div>
                <div className="mb-4 md:mb-0 text-center lg:mb-0">
                    <h3 className="text-xl font-bold lg:text-xl mb-2">Explore Content</h3>
                    <div className="flex flex-wrap text-center justify-center items-center gap-4 link text-[12px] md:text-sm lg:text-lg">{footerLinks}</div>
                </div>
                <div className="text-center">
                    <h3 className="text-lg lg:text-xl mb-2 font-bold">Connect with Us</h3>
                    <div className="flex justify-center items-center flex-wrap gap-4 link">{socialLinks}</div>
                </div>

                {/* <div className="flex flex-col md:flex-row items-center lg:flex-row lg:justify-between gap-4 mt-3 link relative z-50">
                    
                </div> */}
            </div>
            <div className="text-center text-xs lg:text-sm mt-4">
                <p>Call us: +8801750837498 (10AM-10PM)</p>
                <p>Email: mdabarik19@gmail.com</p>
            </div>
            <div className="text-center text-xs lg:text-sm mt-4">
                <p>Location: 123 Main Street, Cityville, State 12345</p>
                <p>USA, United States of America</p>
            </div>

            <div className="mt-4">
                <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={"https://product-pulse-web-app.web.app"}
                        viewBox={`0 0 256 256`}
                    />
                </div>
            </div>

            <div className="text-center border-t-2 mt-6">
                <p className="mt-6 text-xs lg:text-sm">All Rights Reserved &copy; 2023-2029</p>
            </div>


        </footer>
    );
};

export default Footer;
