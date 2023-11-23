import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h3 className="text-3xl font-bold">404 Not Found!</h3>
            <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );
};

export default ErrorPage;