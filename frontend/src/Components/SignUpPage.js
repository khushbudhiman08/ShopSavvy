import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { ScaleLoader } from "react-spinners";
import "./Login.css";
import toast from "react-hot-toast";
import { authAPI } from "../utils/api";

export default function SignUpPage({ setPageShowStatus, setLoginStatus, setMainUser }) {
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [loaderStatus, setLoaderStatus] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    pass1: "",
    pass2: "",
  });

  async function submitHandler(event) {
    event.preventDefault();
    if (formData.pass1 !== formData.pass2) {
      toast.error("Passwords Do Not Match");
      return;
    }

    if (formData.pass1.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoaderStatus(true);
    try {
      const response = await authAPI.register(
        formData.username,
        formData.email,
        formData.pass1
      );
      setLoginStatus(true);
      setPageShowStatus(false);
      setMainUser(response.user.username);
      toast.success("Account Created Successfully");
    } catch (error) {
      toast.error(error.message || "Failed to create account");
    } finally {
      setLoaderStatus(false);
    }
  }

  function changeHandler(event) {
    setFormData((prevdata) => {
      return {
        ...prevdata,
        [event.target.name]: event.target.value,
      };
    });
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
            id="signUpCotentDiv"
            className="w-[50%] flex flex-col gap-6 p-10"
          >
            <div className=" flex flex-col gap-3">
              <h1
                id="signUpHead"
                className="text-[rgb(246,170,40)] text-4xl font-bold"
              >
                Shoe Seekers, Unite!
              </h1>
              <p
                id="signUpSubHead"
                className="text-neutral-500 text-xl w-[75%] text-justify"
              >
                {" "}
                Sign up now to unlock access to the latest trends and exclusive
                offers!
              </p>
            </div>

            <form className="flex flex-col gap-6" onSubmit={submitHandler}>
              <div id="signUpNameDiv" className="flex gap-4">
                <div id="twoInputDivs" className="w-[50%] flex flex-col gap-1">
                  <label
                    htmlFor="firstname"
                    className="text-[rgb(246,170,40)] font-semibold"
                  >
                    First Name <sup>*</sup>
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    className="w-[100%] h-[55px] px-5 rounded-md bg-neutral-800 border border-neutral-600 text-white"
                    placeholder="Enter First Name"
                    required
                    onChange={changeHandler}
                    value={formData.firstname}
                  />
                </div>

                <div id="twoInputDivs" className="w-[50%] flex flex-col gap-1">
                  <label
                    htmlFor="lastname"
                    className="text-[rgb(246,170,40)] font-semibold"
                  >
                    Last Name <sup>*</sup>
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    className="w-[100%] h-[55px] px-5 rounded-md bg-neutral-800 border border-neutral-600 text-white"
                    placeholder="Enter Last Name"
                    required
                    onChange={changeHandler}
                    value={formData.lastname}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="text-[rgb(246,170,40)] font-semibold"
                >
                  Email Address <sup>*</sup>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-[100%] h-[55px] px-5 rounded-md bg-neutral-800 border border-neutral-600 text-white"
                  placeholder="Enter Email Address"
                  required
                  onChange={changeHandler}
                  value={formData.email}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="username"
                  className="text-[rgb(246,170,40)] font-semibold"
                >
                  Set Username <sup>*</sup>
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter Username"
                  className="w-[100%] h-[55px] px-5 rounded-md bg-neutral-800 border border-neutral-600 text-white"
                  required
                  onChange={changeHandler}
                  value={formData.username}
                />
              </div>

              <div id="signUpNameDiv" className="flex gap-4">
                <div
                  id="twoInputDivs"
                  className="w-[50%] flex flex-col gap-1 relative"
                >
                  <label
                    htmlFor="password1"
                    className="text-[rgb(246,170,40)] font-semibold"
                  >
                    Create Password <sup>*</sup>
                  </label>
                  <input
                    type={showPass1 ? "text" : "password"}
                    id="password1"
                    name="pass1"
                    placeholder="Enter Password"
                    className="w-[100%] h-[55px] px-5 rounded-md bg-neutral-800 border border-neutral-600 text-white"
                    required
                    onChange={changeHandler}
                    value={formData.pass1}
                  />
                  <span
                    className="text-white cursor-pointer w-fit text-xl absolute right-5 top-[45px]"
                    onClick={() => {
                      setShowPass1(!showPass1);
                    }}
                  >
                    {showPass1 ? <FaRegEye /> : <FaRegEyeSlash />}
                  </span>
                </div>

                <div
                  id="twoInputDivs"
                  className="w-[50%] flex flex-col gap-1 relative"
                >
                  <label
                    htmlFor="password2"
                    className="text-[rgb(246,170,40)] font-semibold"
                  >
                    Confirm Password <sup>*</sup>
                  </label>
                  <input
                    type={showPass2 ? "text" : "password"}
                    id="password2"
                    name="pass2"
                    placeholder="Enter Password"
                    className="w-[100%] h-[55px] px-5 rounded-md bg-neutral-800 border border-neutral-600 text-white"
                    required
                    onChange={changeHandler}
                    value={formData.pass2}
                  />
                  <span
                    className="text-white cursor-pointer w-fit text-xl absolute right-5 top-[45px]"
                    onClick={() => {
                      setShowPass2(!showPass2);
                    }}
                  >
                    {showPass2 ? <FaRegEye /> : <FaRegEyeSlash />}
                  </span>
                </div>
              </div>

              <button className="w-[100%] text-white bg-[rgb(246,170,40)] h-[45px] hover:bg-[rgb(209,160,76)] transition-all duration-75 rounded-md">
                Create Account
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
                Already have an account?
              </p>
              <button
                className="text-[rgb(246,170,40)]"
                onClick={() => {
                  setPageShowStatus(false);
                  document.documentElement.scrollTop = 0;
                }}
              >
                Login
              </button>
            </div>
          </div>

          <div id="signUpImageDiv" className="w-[50%]">
            <div id="signupImage" className="h-full w-full"></div>
          </div>
        </div>
      )}
    </div>
  );
}
