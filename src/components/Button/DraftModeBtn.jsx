import { IoMdEyeOff } from "react-icons/io";


const DraftModeBtn = () => {
    return (
        <span className="block bg-[#f2f2f2] p-1 border-[1px] rounded-full">
            <IoMdEyeOff className="text-lg text-[#3498db]"></IoMdEyeOff>
        </span>
    );
};

export default DraftModeBtn;