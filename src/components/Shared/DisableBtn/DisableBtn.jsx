import { MdSyncDisabled } from "react-icons/md";

const DisableBtn = () => {
    return (
        <span className="block bg-[#f2f2f2] p-1 rounded-full">
            <MdSyncDisabled className="text-lg text-[#999999]"></MdSyncDisabled>
        </span>
    );
};

export default DisableBtn;