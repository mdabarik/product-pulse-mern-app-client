import { LuDelete } from "react-icons/lu";

const RejectBtn = () => {
    return (
        <span className=" bg-[#ffcccc] rounded-full p-1 block">
            <LuDelete className="text-lg text-[#ff0000]">Delete</LuDelete>
        </span>
    );
};

export default RejectBtn;