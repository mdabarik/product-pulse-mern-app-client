import { useParams } from "react-router-dom";

const ProductDetails = () => {
    const { id } = useParams();
    console.log(id);
    return (
        <div>
            Product Details Page
        </div>
    );
};

export default ProductDetails;