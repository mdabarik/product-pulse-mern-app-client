import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const CheckBtn = () => {
    return (
            <span className="block bg-[#caeafa] p-1 rounded-full border-[1px]">
            <IoMdCheckmarkCircleOutline className="text-lg text-[#0066ccc0]"></IoMdCheckmarkCircleOutline>
        </span>
    );
};

export default CheckBtn;