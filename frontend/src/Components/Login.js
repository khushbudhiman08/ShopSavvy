import React, { useState } from "react";
import "./Login.css";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";

export default function Login({setLoginStatus,setMainUser}) {

  const [pageShowStatus,setPageShowStatus] = useState(false);

  return (
    <div id = "loginMainDiv" className="py-12 flex justify-center items-center bg-neutral-800">
      <div id = "login-signup-main-wrapper" className=" w-[70%] bg-[#111111]">
        {pageShowStatus ? <SignUpPage setPageShowStatus = {setPageShowStatus} setLoginStatus = {setLoginStatus} setMainUser = {setMainUser}/> : <LoginPage setPageShowStatus = {setPageShowStatus} setLoginStatus = {setLoginStatus} setMainUser = {setMainUser}/>}
      </div>
    </div>
  );
}
