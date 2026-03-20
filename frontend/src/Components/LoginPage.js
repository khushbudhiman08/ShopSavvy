import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { ScaleLoader } from "react-spinners";
import "./Login.css";
import toast from "react-hot-toast";
import { authAPI } from "../utils/api";

export default function LoginPage({
  setPageShowStatus,
  setLoginStatus,
  setMainUser,
}) {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loaderStatus, setLoaderStatus] = useState(false);


  function changeHandler(event) {
    setFormData((prevdata) => {
      return {
        ...prevdata,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function submitHandler(event) {
    event.preventDefault();
    setLoaderStatus(true);

    try {
      const response = await authAPI.login(formData.username, formData.password);
      setLoginStatus(true);
      setMainUser(response.user.username);
      toast.success("Logged In Successfully");
    } catch (error) {
      toast.error(error.message || "Invalid Username Or Password");
    } finally {
      setLoaderStatus(false);
    }
  }

  return (
    <div>
      {loaderStatus ? (
        <div
          id="loader3"
          className="bg-[#111111] w-[100%] flex items-center h-[60vh] justify-center"
        >
          <ScaleLoader color="#f6aa28" height={40} />
        </div>
      ) : (
        <div className="flex w-[100%] justify-between">
          <div
            id="loginContentDiv"
            className="w-[50%] flex flex-col gap-6 p-20"
          >
            <div className=" flex flex-col gap-3">
              <h1
                id="loginHead"
                className="text-[rgb(246,170,40)] text-4xl font-bold"
              >
                Welcome Back!
              </h1>
              <p
                id="loginSubHead"
                className="text-neutral-500 text-xl w-[90%] text-justify"
              >
                Returning shoe enthusiasts, rejoice! Your journey continues
                here. Log in now and let your footwear fantasies unfold.
              </p>
            </div>

            <form className="flex flex-col gap-9" onSubmit={submitHandler}>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="username"
                  className="text-[rgb(246,170,40)] font-semibold"
                >
                  Username <sup>*</sup>
                </label>
                <input
                  id="username"
                  type="text"
                  className="w-[100%] h-[55px] px-5 rounded-md bg-neutral-800 border border-neutral-600 text-white"
                  placeholder="Enter Username"
                  name="username"
                  value={formData.username}
                  onChange={changeHandler}
                  required
                />
              </div>

              <div className="flex flex-col gap-1 relative">
                <label
                  htmlFor="password"
                  className="text-[rgb(246,170,40)] font-semibold"
                >
                  Password <sup>*</sup>
                </label>
                <input
                  id="password"
                  type={showPass ? "text" : "password"}
                  className="w-[100%] h-[55px] px-5 rounded-md bg-neutral-800 border border-neutral-600 text-white"
                  placeholder="Enter Password"
                  name="password"
                  value={formData.password}
                  onChange={changeHandler}
                  required
                />
                <span
                  className="text-white cursor-pointer w-fit text-xl absolute right-5 top-[45px]"
                  onClick={() => {
                    setShowPass(!showPass);
                  }}
                >
                  {showPass ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
                <div className="flex justify-end">
                  <button className="text-[rgb(246,170,40)] text-xs">
                    Forgot Password
                  </button>
                </div>
              </div>

              <button className="w-[100%] text-white bg-[rgb(246,170,40)] h-[45px] hover:bg-[rgb(209,160,76)] transition-all duration-75 rounded-md">
                Sign In
              </button>
            </form>

            <div className="flex items-center justify-evenly">
              <div className="h-[2px] w-[43%] bg-neutral-500"></div>
              <div className="text-neutral-500">OR</div>
              <div className="h-[2px] w-[43%] bg-neutral-500"></div>
            </div>

            <div id="alternateLogins" className="border h-[50px] text-white">
              <button className="w-[50%] h-full bg-[#3c5a99]">
                FACEBOOK LOGIN
              </button>
              <button className="w-[50%] h-full bg-[#448fff]">
                GOOGLE LOGIN
              </button>
            </div>

            <div id="switchLoginPage" className="flex justify-center gap-2">
              <p id="switchLoginPageText" className="text-white">
                Don’t have an account yet?
              </p>
              <button
                className="text-[rgb(246,170,40)]"
                onClick={() => {
                  setPageShowStatus(true);
                  document.documentElement.scrollTop = 0;
                }}
              >
                Create Account
              </button>
            </div>
          </div>

          <div id="loginImageDiv" className="w-[50%]">
            <div id="loginImage" className="h-full w-full"></div>
          </div>
        </div>
      )}
    </div>
  );
}
