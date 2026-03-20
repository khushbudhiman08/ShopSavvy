import React from "react";
import "./Lookbook.css";
import { useNavigate } from "react-router-dom";

export default function Lookbook() {
    const navigate = useNavigate();

    function clickHandler() {
        navigate("/collection");
        document.documentElement.scrollTop = 0;
    }

  return (
    <div className="bg-[#111]">
      <div id = "lookBookDiv" className="flex flex-col items-center py-5">
        <div id="lookbookimg1" className="h-[65vh] w-[95%]"></div>
        <div id = "lookbookcontent" className="py-10 flex justify-center gap-32 items-center flex-wrap h-[40vh]">
          <h1 id = "lookbookconthead" className="text-white text-4xl w-[20%] h-[200px]">
            Icy Glamour: Where Fashion Meets Frost
          </h1>
          <div id = "lookbookcontbody" className="text-neutral-500 w-[30%] h-[200px] flex flex-col gap-10">
            <p id = "subText" className="text-2xl">
              Step into Winter's Embrace: Where Style Meets Snow. Explore our
              collection and discover shoes designed to elevate your
              cold-weather wardrobe.
            </p>
            <div className="w-fit">
              <button className="text-white" id = "lookbookbtn" onClick={clickHandler}>SHOP NOW</button>
              <div className="bg-[#f6aa28] h-[1px]" id = "lookbookline"></div>
            </div>
          </div>
        </div>
      </div>

      <div id = "lookBookDiv" className="flex flex-col items-center py-5">
        <div id="lookbookimg2" className="h-[65vh] w-[95%]"></div>
        <div id = "lookbookcontent" className="py-10 flex justify-center gap-32 items-center flex-wrap h-[40vh]">
          <h1 id = "lookbookconthead" className="text-white text-4xl w-[20%] h-[200px]">
          Blooming Blossoms: Step Into Spring
          </h1>
          <div id = "lookbookcontbody" className="text-neutral-500 w-[30%] h-[200px] flex flex-col gap-10">
            <p id = "subText" className="text-2xl">
            Welcome the season of renewal with our Blooming Blossoms collection, where every step is a celebration of spring's vibrant spirit. From whimsical florals to fresh pastels, our shoes embody the essence of the season.
            </p>
            <div className="w-fit">
              <button className="text-white" id = "lookbookbtn" onClick={clickHandler}>SHOP NOW</button>
              <div className="bg-[#f6aa28] h-[1px]" id = "lookbookline"></div>
            </div>
          </div>
        </div>
      </div>

      <div id = "lookBookDiv" className="flex flex-col items-center py-5">
        <div id="lookbookimg3" className="h-[65vh] w-[95%]"></div>
        <div id = "lookbookcontent" className="py-10 flex justify-center gap-32 items-center flex-wrap h-[40vh]">
          <h1 id = "lookbookconthead" className="text-white text-4xl w-[20%] h-[200px]">
          PlayBound: Your Go-To Play Shoes
          </h1>
          <div id = "lookbookcontbody" className="text-neutral-500 w-[30%] h-[200px] flex flex-col gap-10">
            <p id = "subText" className="text-2xl">
            Whether you're hitting the court, field, or pavement, our shoes offer the perfect blend of comfort, support, and durability. Designed to keep up with your every move, PlayBound ensures you're always ready for the next adventure.
            </p>
            <div className="w-fit">
              <button className="text-white" id = "lookbookbtn" onClick={clickHandler}>SHOP NOW</button>
              <div className="bg-[#f6aa28] h-[1px]" id = "lookbookline"></div>
            </div>
          </div>
        </div>
      </div>

      <div id = "lookBookDiv" className="flex flex-col items-center py-5">
        <div id="lookbookimg4" className="h-[65vh] w-[95%]"></div>
        <div id = "lookbookcontent" className="py-10 flex justify-center gap-32 items-center flex-wrap h-[40vh]">
          <h1 id = "lookbookconthead" className="text-white text-4xl w-[20%] h-[200px]">
          TrailBlaze: Adventure-Ready Footwear
          </h1>
          <div id = "lookbookcontbody" className="text-neutral-500 w-[30%] h-[200px] flex flex-col gap-10">
            <p id = "subText" className="text-2xl">
            Embark on your next adventure with confidence in TrailBlaze: Adventure-Ready Footwear. Crafted for the bold explorer, our shoes are designed to tackle any terrain with ease.
            </p>
            <div className="w-fit">
              <button className="text-white" id = "lookbookbtn" onClick={clickHandler}>SHOP NOW</button>
              <div className="bg-[#f6aa28] h-[1px]" id = "lookbookline"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
