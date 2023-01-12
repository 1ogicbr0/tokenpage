import "./index.css";
import Content from "./components/Content";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { TokenDataType } from "../ViewToken/ViewToken";
import APIService from "../../services/APIService";
import { useNavigate } from "react-router-dom";
import { addToken } from "../../store/slices/authSlice";

const Wallet = () => {
  const { accessToken, refreshToken } = useSelector(
    (state: RootState) => state.auth
  );
  const [tokenList, setTokenList] = useState<TokenDataType[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken && refreshToken) {
      APIService.renewAccessToken((success: any, json: any) => {
        if (success && json.access_token) {
          dispatch(
            addToken({
              accessToken: json.access_token,
              refreshToken: json.refresh_token,
              expiredAt:
                new Date().getTime() + (json.expires_in ?? 1000) * 1000,
            })
          );
          navigate("/wallet", { replace: true });
        }
      });
    } else {
      navigate("/login", { replace: true });
    }
  }, [accessToken]);

  const getTokenList = () => {
    APIService.getTokenList((success: any, json: any) => {
      setTokenList(json.result);
    });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-4xl self-center">
        <div className="w-full bg-gray-300" style={{ height: "100vh" }}>
          <Header />
          <Content tokenList={tokenList} />
        </div>
      </div>
    </div>
  );
};

export default Wallet;
