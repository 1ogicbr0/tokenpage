import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { MdContentCopy } from "react-icons/md";
import { toast } from "react-toastify";

const Header = () => {
  const [correctAddress, setCorrectAddress] = useState("");

  const { address, name, publicInfo } = useSelector(
    (state: RootState) => state.profile
  );

  useEffect(() => {
    if (address.startsWith("0x")) {
      setCorrectAddress(address);
    } else {
      setCorrectAddress(`0x${address}`);
    }
  }, [address]);

  const onCopyAddress = () => {
    navigator.clipboard.writeText(correctAddress);
    toast.success("Address copied to Clipboard!");
  };

  return (
    <div className="flex flex-row py-8 ">
      <div className="px-8 border-r-2 border-r-gray-500">
        <img
          src={`data:image/jpeg;base64,${publicInfo.base64Avatar}`}
          alt="avatar"
          className="w-40 h-40 rounded-full border-8 border-black"
        />
      </div>
      <div className="flex flex-col flex-1 px-8">
        <p className="text-2xl font-bold">{name}</p>
        <div className="mt-2 h-48 overflow-y-scroll">
          <p className="text-gray-500">
            {publicInfo.description}
          </p>
        </div>
        <div className="flex flex-row bg-gray-400 p-4 mt-4 rounded-2xl items-center">
          <p className="flex flex-1">{correctAddress}</p>
          <IconButton onClick={onCopyAddress}>
            <MdContentCopy />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
