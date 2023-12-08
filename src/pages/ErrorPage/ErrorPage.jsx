import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import ErrorBanner from "./../../assets/404.png";
import AOS from 'aos';
import { useEffect } from "react";

const ErrorPage = () => {
    useEffect(() => {
        AOS.init()
    }, [])
    const navigate = useNavigate();

    return (
        <div data-aos="zoom-in" className="flex items-center justify-center w-[100vw] h-[100vh] flex-col space-y-8">
            <Helmet>
                <title>Opps! 404 Page Not Found || Product Pulse</title>
            </Helmet>
            <div className="w-[280px] py-6">
                <img className="w-full h-[200px] object-cover" src={ErrorBanner} alt="error png" />
            </div>
            <h3 className="text-3xl font-bold">404 Not Found!</h3>
            <button className="btn text-white btn-info" onClick={() => {
                navigate('/')
            }}>Go To Home</button>
        </div>
    );
};

export default ErrorPage;