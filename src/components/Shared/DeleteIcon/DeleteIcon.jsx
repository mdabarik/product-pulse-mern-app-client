
import { MdDelete } from "react-icons/md";

const DeleteIcon = () => {
    return (
        <span className=" bg-[#ffcccc] rounded-full p-1 block">
            <MdDelete className="text-lg text-[#ff0000]">Delete</MdDelete>
        </span>
    );
};

export default DeleteIcon;