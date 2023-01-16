import "./index.css";
import Content from "./components/Content";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { TokenDataType } from "../ViewToken/ViewToken";
import APIService from "../../services/APIService";
import { addProfile } from "../../store/slices/profileSlice";

const Wallet = () => {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const [tokenList, setTokenList] = useState<TokenDataType[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getTokenList();
  }, []);

  useEffect(() => {
    getWalletProfile();
  }, [accessToken]);

  const getWalletProfile = () => {
    APIService.getWalletInfoByKeyCloak((success: any, json: any) => {
      if (success && json.result) {
        const publicInfo = {
          base64Avatar: json.result.publicInfo.base64Avatar,
          description: json.result.publicInfo.description,
        };
        const privateInfo = {
          phoneNumber: json.result.privateInfo.phoneNumber,
          dialCode: json.result.privateInfo.dialCode,
          email: json.result.privateInfo.email,
          username: json.result.privateInfo.username,
        };
        dispatch(
          addProfile({
            address: json.result.address,
            name: json.result.name,
            publicInfo,
            privateInfo,
          })
        );
      }
    });
  };

  const getTokenList = () => {
    APIService.getTokenList((success: any, json: any) => {
      setTokenList(json.result);
    });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-4xl self-center">
        <div
          className="w-full flex flex-1 flex-col bg-gray-300  bg-[url('/public/background-image-top.png')] bg-cover"
          style={{ height: "100vh" }}
        >
          <Header />
          <Content tokenList={tokenList} />
        </div>
      </div>
    </div>
  );
};

export default Wallet;
