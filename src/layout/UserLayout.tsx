import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MdLogout } from 'react-icons/md';
import { HiChevronLeft } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { addToken, removeToken } from '../store/slices/authSlice';
import { RootState } from '../store/store';
import APIService from '../services/APIService';

const UserLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isShowBackButton, setIsShowBackButton] = useState(false);
  const location = useLocation();

  const { refreshToken, accessToken } = useSelector(
    (state: RootState) => state.auth
  );

  const [renewTokenTimeout, setRenewTokenTimeout] = useState<any>();

  const onLogout = () => {
    dispatch(removeToken({}));
    navigate('/token-login', { replace: true });
  };

  const onGoBack = () => {
    navigate('/wallet', { replace: true });
  };

  useEffect(() => {
    debugger;
    if (accessToken && refreshToken) {
      renewToken();
    } else {
      dispatch(removeToken({}));
      navigate('/token-login', { replace: true });
    }
  }, []);

  useEffect(() => {
    if (location.pathname.startsWith('/digital-twin-detail')) {
      setIsShowBackButton(true);
    } else {
      setIsShowBackButton(false);
    }
  }, [location]);

  useEffect(() => {
    clearTimeout(renewTokenTimeout);
    setRenewTokenTimeout(
      setTimeout(() => {
        renewToken();
      }, 900000)
    );
  }, [accessToken]);

  const renewToken = () => {
    APIService.renewAccessToken((success: any, json: any) => {
      if (success && json.access_token) {
        dispatch(
          addToken({
            accessToken: json.access_token,
            refreshToken: json.refresh_token,
            expiredAt: new Date().getTime() + (json.expires_in ?? 1000) * 1000,
          })
        );
      } else {
        dispatch(removeToken({}));
        navigate('/token-login', { replace: true });
      }
    });
  };

  const Header = () => {
    return (
      <div className='flex items-center justify-center'>
        <div className=' flex flex-row w-full max-w-4xl self-center justify-between bg-black h-16 items-center'>
          <IconButton
            className='ml-2'
            disabled={!isShowBackButton}
            onClick={onGoBack}
          >
            <HiChevronLeft
              className={`${
                isShowBackButton ? 'text-white' : 'text-black'
              } font-bold text-4xl`}
            />
          </IconButton>
          <img src='/logo.png' className=' w-14 h-14' alt='logo_header' />
          <IconButton className='mr-2' onClick={onLogout}>
            <MdLogout className='text-white font-bold text-4xl' />
          </IconButton>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default UserLayout;
