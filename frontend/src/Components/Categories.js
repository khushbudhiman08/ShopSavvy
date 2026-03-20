import React from "react";
import "./Categories.css";
import { useNavigate } from "react-router-dom";

export default function Categories() {

  const navigate = useNavigate();

  return (
    <div className="bg-black">
      <div id = "catMainDiv" className="h-[80vh] flex items-center justify-center gap-9 flex-wrap text-white bg-black">
        <div
          id="category1"
          className="h-[70%] w-[45%] flex flex-col justify-center items-center gap-10"
        >
          <h1 className="text-5xl">MEN</h1>
          <button className="border-2 border-neutral-100 w-[25%] h-[10%] transition-all duration-100 ease-in-out hover:bg-neutral-900 catbtn" onClick={() => {navigate("/men"); document.documentElement.scrollTop = 0;}}>
            <p className="hover-underline-animation">SHOP MEN</p>
          </button>
        </div>
        <div
          id="category2"
          className="h-[70%] w-[45%] flex flex-col justify-center items-center gap-10"
        >
          <h1 className="text-5xl">WOMEN</h1>
          <button className="border-2 border-neutral-100 w-[25%] h-[10%] transition-all duration-100 ease-in-out hover:bg-neutral-900 catbtn" onClick={() => {navigate("/women"); document.documentElement.scrollTop = 0;}}>
            <p className="hover-underline-animation">SHOP WOMEN</p>
          </button>
        </div>
      </div>
    </div>
  );
}
