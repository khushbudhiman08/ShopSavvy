import React from "react";
import { CgClose } from "react-icons/cg";
import { RiAccountCircleFill } from "react-icons/ri";
import "./Mainpage.css";
import { NavLink } from "react-router-dom";

const Sidebar = (props) => {
  return (
    <div id = "sidebar" className="fixed top-0 left-0 h-[100%] w-[100%] bg-black text-[#6E7051] text-5xl z-50 transform transition-all duration-300">
      <div className="text-white flex justify-end p-5">
        <div>
          <CgClose onClick={() => {props.setIsSidebarOpen(false);}}/>
        </div>
      </div>

      <div className="flex flex-col gap-8 px-16 text-[#f6aa28]">
        <div className="text-white">
          <NavLink to="/account" onClick={() => props.setIsSidebarOpen(false)}><RiAccountCircleFill/></NavLink>
        </div>
        <div className="bg-[#f6aa28] h-[1px]"></div>
        <NavLink to="/" onClick={() => props.setIsSidebarOpen(false)}><div>HOME</div></NavLink>
        <div className="bg-[#f6aa28] h-[1px]"></div>
        <NavLink to="/collection" onClick={() => {props.setIsSidebarOpen(false);props.setSearchResult("/");}}><div>SHOP EVERYTHING</div></NavLink>
        <div className="bg-[#f6aa28] h-[1px]"></div>
        <NavLink to="/lookbook" onClick={() => props.setIsSidebarOpen(false)}><div>LOOKBOOK</div></NavLink>
        <div className="bg-[#f6aa28] h-[1px]"></div>
        <NavLink to="/contact" onClick={() => props.setIsSidebarOpen(false)}><div>CONTACT</div></NavLink>
        <div className="bg-[#f6aa28] h-[1px]"></div>
      </div>
    </div>
  );
};

export default Sidebar;
