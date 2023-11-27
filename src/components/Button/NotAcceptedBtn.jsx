import { FaRegCheckCircle } from "react-icons/fa";

const NotAcceptedBtn = () => {
    return (
        <span className="block bg-[#caeafa] p-1 rounded-full border-[1px]">
            <FaRegCheckCircle className="text-lg text-[#0066ccc0]"></FaRegCheckCircle>
        </span>
    );
};

export default NotAcceptedBtn;
