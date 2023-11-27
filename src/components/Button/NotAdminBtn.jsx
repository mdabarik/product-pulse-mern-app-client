import { FaUserPlus } from "react-icons/fa";


const NotAdminBtn = () => {
    return (
        <span className="block bg-[#8e44ad] p-1 rounded-full border-[1px]">
            <FaUserPlus className="text-lg text-[#ffffff]"></FaUserPlus>
        </span>
    );
};

export default NotAdminBtn;
