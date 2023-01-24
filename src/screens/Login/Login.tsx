import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Formik } from 'formik';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import * as Yup from 'yup';
import APIService from '../../services/APIService';
import { addToken, removeToken } from '../../store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../common/colors';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { toast } from 'react-toastify';

// import logo from './../../assets/unikbase-logo.svg';
import logo from '../../assets/unikbase-logo-crop-white.png';

const CustomTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: colors.inputFocus,
  },
  '& label.Mui-error': {
    color: colors.inputError,
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    '&.Mui-focused fieldset': {
      borderColor: colors.inputFocus,
    },
    '&.Mui-error fieldset': {
      borderColor: colors.inputError,
    },
  },
});

const currentYear = new Date().getFullYear();

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    if (auth.refreshToken) {
      APIService.renewAccessToken(
        (
          success: any,
          json: {
            error?: string;
            expires_in?: number;
            access_token?: string;
            refresh_token?: string;
          }
        ) => {
          if (success && json.access_token && json.refresh_token) {
            const data = {
              accessToken: json.access_token,
              refreshToken: json.refresh_token,
              expiredAt:
                new Date().getTime() + (json.expires_in ?? 1800) * 1000,
            };
            dispatch(addToken(data));
            navigate('/wallet', { replace: true });
          } else if (json.error && json.error === 'invalid_grant') {
            dispatch(removeToken({}));
          }
        }
      );
    }
  }, []);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();
  return (
    <div className='flex items-center justify-center'>
      <div className='w-full h-screen max-w-4xl self-center items-center flex flex-col py-10 bg-darkBlue'>
        <img src={logo} className=' w-auto h-40' alt='logo' />
        <p className='mt-8 font-semibold text-xl text-white'>
          Welcome to UnikBase
        </p>
        <p className='mt-2 font-normal text-xs text-white'>
          Copyright {currentYear} | UnikBase.com
        </p>
        <p className='mt-8 font-normal text-sm text-white'>Login with</p>
        <div className='flex flex-row mt-4'>
          <button className='justify-center items-center flex mx-2'>
            <img
              src='/assets/google-circle.png'
              className='w-16 h-16'
              alt='googleIcon'
            />
          </button>
          <button className='justify-center items-center flex mx-2'>
            <img
              src='/assets/facebook-circle.png'
              className='w-16 h-16'
              alt='facebookIcon'
            />
          </button>
          <button className='justify-center items-center flex mx-2'>
            <img
              src='/assets/apple-circle.png'
              className='w-16 h-16'
              alt='appleIcon'
            />
          </button>
        </div>
        <p className='mt-8 font-normal text-sm text-white'>
          or login with username
        </p>
        <div className='bg-white w-full p-16 rounded-t-large mt-4 items-center flex flex-col shadow-2xl'>
          <div className='flex flex-row items-center pr-4 rounded-full w-fit bg-box-account mb-8'>
            <div className='w-10 h-10 flex items-center justify-center bg-box-user rounded-full'>
              <img
                src='/tick-user.png'
                className='w-5 h-5'
                alt='tickUserIcon'
              />
            </div>
            <p className='ml-4'>Account Login</p>
          </div>
          <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={({ username, password }, { setSubmitting }) => {
              APIService.loginKeyCloak(
                username,
                password,
                (success: any, json: any) => {
                  setSubmitting(false);
                  if (success && json.access_token) {
                    dispatch(
                      addToken({
                        accessToken: json.access_token,
                        refreshToken: json.refresh_token,
                        expiredAt:
                          new Date().getTime() +
                          (json.expires_in ?? 1000) * 1000,
                      })
                    );
                    navigate('/wallet', { replace: true });
                  } else {
                    toast.error(
                      'Incorrect username of password. Please try again!'
                    );
                  }
                }
              );
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string()
                .max(255)
                .required('Please enter username.'),
              password: Yup.string()
                .max(255)
                .required('Please enter password.'),
            })}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,

              /* and other goodies */
            }) => {
              return (
                <form
                  onSubmit={handleSubmit}
                  className='flex flex-col w-full md:w-3/5'
                >
                  <CustomTextField
                    name='username'
                    label='Username'
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className='w-full'
                    error={!!errors.username && !!touched.username}
                    focused
                    color={'warning'}
                  />
                  <p className='mt-2 text-error text-sm'>
                    {errors.username && touched.username && errors.username}
                  </p>
                  <CustomTextField
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    label='Password'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className='w-full mt-6'
                    error={!!errors.password && !!touched.password}
                    focused
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge='end'
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <p className='mt-2 text-error text-sm'>
                    {errors.password && touched.password && errors.password}
                  </p>
                  <p className='mt-8 font-bold cursor-pointer hover:bg-slate-300 px-2 py-1 self-center'>
                    {' '}
                    Forgot password?
                  </p>
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className={`bg-black hover:bg-slate-800 flex flex-row rounded-full px-4 h-16 items-center mt-2 justify-center w-full ${
                      isSubmitting && 'bg-gray-700 hover:bg-gray-700'
                    }`}
                  >
                    {isSubmitting ? (
                      <ClipLoader color={colors.white} />
                    ) : (
                      <p className=' text-white text-lg font-semibold'>Login</p>
                    )}
                  </button>
                  <p className='self-center text-slate-400 mt-12'>
                    Don't have an account?
                  </p>
                  <p className='self-center text-lg mt-2 text-blue-500 font-bold cursor-pointer px-4 py-2 hover:bg-blue-200 rounded-2xl'>
                    Sign up!
                  </p>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
