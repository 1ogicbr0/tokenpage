import { TokenDataType } from "../../ViewToken/ViewToken";
import "../index.css";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { documentPathTypes } from "../../../constants/constants";
import { useNavigate } from "react-router-dom";

export type ContentProps = {
  tokenList: TokenDataType[];
};

const Content = ({ tokenList }: ContentProps) => {
  const navigate = useNavigate();
  const onViewToken = (tokenId: string) => {
    navigate(`/digital-twin-detail/${tokenId}`);
  };

  return (
    <div className="flex flex-1 flex-col bg-white w-full pt-16 pb-8 px-8 rounded-t-large mt-4 items-center shadow-3xl">
      <div className="w-full border-b-2 border-b-gray-300 pb-4 flex flex-row">
        <div className=" font-bold text-2xl flex flex-1">My Digital Twins</div>
        <div className="d-flex text-gray-400 cursor-pointer flex flex-row items-center">
          <div className="mr-4">View More</div>
          <div className=" shadow-3xl bg-white rounded-lg w-7 h-7 items-center justify-center flex">
            <NavigateNextIcon className="text-black" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col w-full">
        {tokenList.map((token) => {
          const coverImage = token.documents.find(
            (document) => document.path === documentPathTypes.COVER_IMAGE
          );
          return (
            <button
              key={token.token.uuid}
              className="flex flex-row w-full my-4 shadow-xl-large rounded-3xl p-4 overflow-hidden cursor-pointer hover:bg-slate-200"
              onClick={() => {
                onViewToken(token.token.uuid);
              }}
            >
              <div className="w-48 h-48 rounded-2xl overflow-hidden bg-gray-300">
                <img
                  className="w-full h-full object-contain"
                  src={coverImage?.fileUrl}
                  alt="test"
                  width={200}
                  height={200}
                />
              </div>
              <div className="flex flex-col flex-1 ml-8 justify-center">
                <div className="font-bold text-lg">{token.token.name}</div>
                <div className=" text-gray-400 text-base">
                  {token.token.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Content;
