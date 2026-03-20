import React from "react";
import "./Footer.css";
import { IoLockClosed } from "react-icons/io5";
import { MdLocalShipping } from "react-icons/md";
import { FaSync } from "react-icons/fa";
import logo from "../Logo.png";
import { FaInstagram } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="bg-[#111111]">
      <div
        id="upperFooter"
        className="h-[500px] text-white flex flex-col justify-center items-center gap-8"
      >
        <h1 id = "upperFooterHead" className="text-6xl font-semibold">
          Better for People & the Planet
        </h1>
        <p id = "upperFooterText" className="text-xl w-[30%] text-center text-neutral-300 font-medium">
          Step into a brighter future with shoes that are better for both people
          and the planet
        </p>
      </div>

      <div id = "lowerFooter" className="h-[500px] bg-[#111111] text-white flex flex-col items-center justify-center gap-10">
        <div id = "lowerFooter1Div" className="flex justify-around w-[70%] items-center flex-wrap">
          <div id = "lowerFooter1" className="flex justify-center items-center gap-3 text-xl">
            <IoLockClosed id = "lowerFooter1Icon" className="text-2xl" />
            <p id="lowerFooter1Text">Secure Payment</p>
          </div>
          <div id = "lowerFooter1Line" className="bg-neutral-700 h-full w-[1px]"></div>
          <div id = "lowerFooter1" className="flex justify-center items-center gap-3 text-xl">
            <MdLocalShipping id = "lowerFooter1Icon" className="text-3xl" />
            <p id="lowerFooter1Text">Expess Shipping</p>
          </div>
          <div id = "lowerFooter1Line" className="bg-neutral-700 h-full w-[1px]"></div>
          <div id = "lowerFooter1" className="flex justify-center items-center gap-3 text-xl">
            <FaSync id = "lowerFooter1Icon" className="text-2xl" />
            <p id="lowerFooter1Text">Free Return</p>
          </div>
        </div>

        <div className="bg-neutral-700 w-[70%] h-[1px]"></div>

        <div id = "lowerFooter2Div" className="w-[70%] flex justify-around flex-wrap">
          <div id = "lowerFooter2" className="w-[25%] flex flex-col gap-10">
            <div>
              <img src={logo} alt="" className="w-[130px]" />
            </div>
            <p className="text-neutral-500 text-xl pl-2 w-[60%] underLogoText" id="lowerFooter2Items">
              Striding towards sustainability, one step at a time.
            </p>
            <div className="flex gap-3 text-xl pl-2">
              <FaInstagram className="hover:text-[#f6aa28] cursor-pointer"/>
              <FaPinterestP className="hover:text-[#f6aa28] cursor-pointer"/>
              <FaFacebook className="hover:text-[#f6aa28] cursor-pointer"/>
              <FaTwitter className="hover:text-[#f6aa28] cursor-pointer"/>
            </div>
          </div>

          <div id = "lowerFooter2" className="w-[25%] flex flex-col gap-10 justify-center">
            <h1 className="text-3xl">Shop</h1>
            <div className="flex flex-col gap-2 text-[#f6aa28]" id="lowerFooter2TextDiv">
              <p className="hover:text-white cursor-pointer w-fit" id = "lowerFooter2Items">Shop Men</p>
              <p className="hover:text-white cursor-pointer w-fit" id = "lowerFooter2Items">Shop Women</p>
              <p className="hover:text-white cursor-pointer w-fit" id = "lowerFooter2Items">Lookbook</p>
            </div>
          </div>
          
          <div id = "lowerFooter2" className="w-[25%] flex flex-col gap-10 justify-center">
            <h1 className="text-3xl">About</h1>
            <div className="flex flex-col gap-2 text-[#f6aa28]" id="lowerFooter2TextDiv">
              <p className="hover:text-white cursor-pointer w-fit" id = "lowerFooter2Items">Our Story</p>
              <p className="hover:text-white cursor-pointer w-fit" id = "lowerFooter2Items">Our Materials</p>
              <p className="hover:text-white cursor-pointer w-fit" id = "lowerFooter2Items">Our Value</p>
            </div>
          </div>

          <div id = "lowerFooter2" className="w-[25%] flex flex-col gap-10 justify-center">
            <h1 className="text-3xl">Need Help?</h1>
            <div className="flex flex-col gap-2 text-[#f6aa28]" id="lowerFooter2TextDiv">
              <p className="hover:text-white cursor-pointer w-fit" id = "lowerFooter2Items">FAQs</p>
              <p className="hover:text-white cursor-pointer w-fit" id = "lowerFooter2Items">Shipping & Returns</p>
              <p className="hover:text-white cursor-pointer w-fit" id = "lowerFooter2Items">Contact Us</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
