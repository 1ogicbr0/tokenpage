import {
  TextField,
  FormHelperText,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { alpha, styled } from "@mui/material/styles";

const CustomTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#35a7d1",
  },
  "& label.Mui-error": {
    color: "#E4416B",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    "&.Mui-focused fieldset": {
      borderColor: "#35a7d1",
    },
    "&.Mui-error fieldset": {
      borderColor: "#E4416B",
    },
  },
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <div className="flex items-center justify-center">
      <div className="w-full h-screen max-w-4xl self-center items-center flex flex-col py-10 bg-slate-200 bg-[url('/public/background-image-top.png')] bg-cover">
        <img src="logo.png" className=" w-48 h-48" alt="logo" />
        <p className="mt-8 font-semibold text-xl">Welcome to UnikBase</p>
        <p className="mt-2 font-normal text-xs">
          Copyright 2022 | UnikBase.com
        </p>
        <p className="mt-8 font-normal text-sm">Login with</p>
        <div className="flex flex-row mt-4">
          <button className="w-16 h-16 bg-black rounded-full justify-center items-center flex mx-2">
            <img src="google-icon.png" className="w-10 h-10" alt="googleIcon" />
          </button>
          <button className="w-16 h-16 bg-black rounded-full justify-center items-center flex mx-2">
            <img
              src="facebook-icon.png"
              className="w-10 h-10"
              alt="facebookIcon"
            />
          </button>
          <button className="w-16 h-16 bg-black rounded-full justify-center items-center flex mx-2">
            <img src="apple-icon.png" className="w-10 h-10" alt="appleIcon" />
          </button>
        </div>
        <p className="mt-8 font-normal text-sm">or login with username</p>
        <div className="bg-white w-full p-16 rounded-t-large mt-4 items-center  flex flex-col shadow-2xl">
          <div className="flex flex-row items-center pr-4 rounded-full w-fit bg-box-account mb-8">
            <div className="w-10 h-10 flex items-center justify-center bg-box-user rounded-full">
              <img src="tick-user.png" className="w-5 h-5" alt="tickUserIcon" />
            </div>
            <p className="ml-4">Account Login</p>
          </div>
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={function (
              values: { username: string; password: string },
              formikHelpers: FormikHelpers<{
                username: string;
                password: string;
              }>
            ): void | Promise<any> {
              throw new Error("Function not implemented.");
            }}
            validate={(values) => {
              const errors = { username: "", password: "" };
              if (!values.username) {
                errors.username = "Please enter username.";
              }
              if (!values.password) {
                errors.password = "Please enter password.";
              }
              return errors;
            }}
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
              console.log({
                values,
                errors,
                touched,
              });

              return (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col w-full md:w-3/5"
                >
                  <CustomTextField
                    name="username"
                    label="Username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full"
                    error={!!errors.username && !!touched.username}
                    focused
                    color={"warning"}
                  />
                  <p className="mt-2 text-error text-sm">
                    {errors.username && touched.username && errors.username}
                  </p>
                  <CustomTextField
                    type={showPassword ? "text" : "password"}
                    name="password"
                    label="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full mt-6"
                    error={!!errors.password && !!touched.password}
                    focused
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <p className="mt-2 text-error text-sm">
                    {errors.password && touched.password && errors.password}
                  </p>
                  <p className="mt-8 font-bold cursor-pointer hover:bg-slate-300 px-2 py-1 self-center">
                    {" "}
                    Forgot password?
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black hover:bg-slate-700 flex flex-row rounded-full p-4 mt-2 justify-center w-full"
                  >
                    <p className=" text-white text-lg font-semibold">Login</p>
                  </button>
                  <p className="self-center text-slate-400 mt-12">
                    Don't have an account?
                  </p>
                  <p className="self-center text-lg mt-2 text-blue-500 font-bold cursor-pointer px-4 py-2 hover:bg-blue-200 rounded-2xl">
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
