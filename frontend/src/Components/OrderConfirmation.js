import React, { useEffect, useState } from "react";
import { Checkmark } from "react-checkmark";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import "./OrderConfirmation.css";

export default function OrderConfirmation({setCartItems,setnavStatus,setFooterStatus,setCartCount}) {
  const [confettiStatus, setConfettiStatus] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setConfettiStatus(true);
    setTimeout(() => {
      setConfettiStatus(false);
    }, 5000);
  }, []);

  function continueHandler() {
    setCartItems([]);
    setFooterStatus(true);
    setnavStatus(false);
    setCartCount(0);
    navigate("/");
  }

  return (
    <div>
      {confettiStatus && <Confetti className="w-[100vw] h-[100vh] " />}
      <div className="bg-neutral-800 h-[100vh] w-[100vw] flex justify-center items-center">
        <div id = "orderConfirmDiv" className="flex flex-col gap-10 bg-[#111111] p-20 rounded-2xl">
          <Checkmark size="96px" />
          <div className="flex flex-col gap-10">
            <h1 id = "orderCofirmHead" className="text-5xl text-[#7ac142] text-center font-semibold">
              ORDER CONFIRMED
            </h1>
            <p id = "orderCofirmText" className="text-center text-white text-2xl ">
              Thanks For Shopping!
            </p>
            <div className="flex justify-center">
              <button id = "orderConfirmBtn" className="bg-[#f6aa28] p-3 border hover:bg-[#926e2f] w-[60%] text-black transition-all duration-300 " onClick={continueHandler}>
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
