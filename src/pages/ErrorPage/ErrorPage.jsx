import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center w-[100vw] h-[100vh] flex-col space-y-8">
            <Helmet>
                <title>404 Page Not Found | Product Pulse</title>
            </Helmet>
            <h3 className="text-3xl font-bold">404 Not Found!</h3>
            <button className="btn text-white btn-info" onClick={() => {
                navigate('/')
            }}>Go To Home</button>
        </div>
    );
};

export default ErrorPage;