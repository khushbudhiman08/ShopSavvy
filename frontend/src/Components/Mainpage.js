import React from "react";
import "./Mainpage.css";
import logo1 from "../Logos/vogue.png";
import logo2 from "../Logos/bbc.png";
import logo3 from "../Logos/forbes.png";
import logo4 from "../Logos/flipkart.png";
import logo5 from "../Logos/amazon.png";
import about from "./about.jpg";
import shoeComp from "../shoeComponents.png";
import ShoeComponent from "./ShoeComponent";
import Categories from "./Categories";
import Review from "./Review";
import { useNavigate } from "react-router-dom";

export default function Mainpage({shoeInfo,setShoeInfo}) {

  const navigate = useNavigate();
  
  return (
    <div>
      <div className="main h-[90.2vh]">
        <div className="flex items-center h-[80%]" id="mainPageCenter">
          <div className="w-[50%] flex flex-col gap-10 ml-44" id="textarea">
            <div id="mainheadingdiv">
              <h1 id="mainheading" className="text-8xl w-[90%] font-semibold">
                Love The Planet We Walk On
              </h1>
            </div>
            <div
              className="text-4xl w-[80%] text-white flex flex-col gap-3"
              id="subheading"
            >
              <p className="paras">Walk the path of eco-consciousness with</p>
              <p className="paras">our planet-friendly footwear collection.</p>
            </div>

            <div className="flex gap-6" id="btndiv">
              <button className="bg-black text-white w-[20%] h-[50px] shopbtn" onClick={()=>{navigate("/men");document.documentElement.scrollTop = 0;}}>
                <p className="hover-underline-animation">SHOP MEN</p>
              </button>
              <button className="bg-black text-white w-[20%] h-[50px] shopbtn" onClick={() => {navigate("/women");document.documentElement.scrollTop = 0;}}>
                <p className="hover-underline-animation">SHOP WOMEN</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black py-5">
        <div
          id="mainPageDiv2"
          className="text-white flex flex-col items-center h-[100vh]"
        >
          <div
            id="logoWithLine"
            className="h-[25%] w-[100%] flex flex-col items-center justify-center"
          >
            <div
              id="logosdiv"
              className="flex justify-around w-[70%] flex-wrap h-[100%] items-center"
            >
              <div id="logos" className="text-xl logostext">
                AS SEEN IN:
              </div>
              <div id="logos">
                <img id="logoImages" src={logo1} alt="" className="w-[150px]" />
              </div>
              <div id="logos">
                <img id="logoImages" src={logo2} alt="" className="w-[150px]" />
              </div>
              <div id="logos">
                <img id="logoImages" src={logo3} alt="" className="w-[150px]" />
              </div>
              <div id="logos">
                <img id="logoImages" src={logo4} alt="" className="w-[150px]" />
              </div>
              <div id="logos">
                <img
                  id="logoImages"
                  src={logo5}
                  alt=""
                  className="w-[150px] mt-3"
                />
              </div>
            </div>
            <div className="bg-white h-[0.1px] w-[70%]"></div>
          </div>

          <div className="flex w-[70%] justify-around items-center h-[100%] flex-wrap gap-8">
            <div>
              <img src={about} alt="" />
            </div>
            <div
              id="aboutdiv"
              className="w-[40%] flex flex-col justify-center gap-6"
            >
              <p id="abouthead" className="text-[#f6aa28]">
                ABOUT US
              </p>
              <p id="aboutsubhead" className="text-5xl leading-tight">
                Selected materials designed for comfort and sustainability
              </p>
              <p id="abouttext" className="leading-7 text-neutral-400">
                We prioritize comfort and sustainability. Our curated footwear
                collection features meticulously selected materials designed for
                both. With each step, we aim to tread lightly on the planet
                without compromising on style. Join us in our mission towards a
                greener future, one stylish stride at a time.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-neutral-900 text-white">
        <div id = "shoeCompMainDiv" className="flex flex-col justify-around items-center py-6 h-[100vh]">
          <div className="flex flex-col items-center w-[100%] gap-6">
            <h1 id="shoeStructHead" className="w-[60%] text-center text-4xl text-[#f6aa28] font-bold">See How Your Shoes Are Made</h1>
            <p id = "shoeStructSubHead"className="w-[50%] text-center text-3xl">
              Peek behind the scenes: Witness the craftsmanship that brings your
              shoes to life
            </p>
          </div>

          <div id = "shoeComp" className="flex w-[80%] gap-20 h-[70%] items-center">
            <div id="shoeCompSubDiv" className="w-[30%] h-[100%] flex flex-col justify-evenly">
              <div id = "shoeCompSubDiv2" className="flex flex-col gap-2 h-[35%] justify-center">
                <p className="text-[#f6aa28]">01.</p>
                <h2 className="text-2xl font-bold">PET CANVAS</h2>
                <p className="text-neutral-400">
                  Our artisans skillfully incorporate your pet's likeness into
                  every step, creating unique and cherished footwear that
                  celebrates your bond.
                </p>
              </div>
              <div id = "line" className="h-[1px] bg-neutral-700"></div>
              <div id = "shoeCompSubDiv2" className="flex flex-col gap-2 h-[35%] justify-center">
                <p className="text-[#f6aa28]">02.</p>
                <h2 className="text-2xl font-bold">ALGAE FOAM + VEGAN GLUE</h2>
                <p className="text-neutral-400">
                  Experience sustainability in every step with our innovative
                  Algae foam and vegan glue technology. Crafted with
                  eco-conscious materials, our shoes offer both comfort and
                  conscience.
                </p>
              </div>
            </div>
            <div id="shoeCompSubDiv" className="w-[60%] h-[100%] flex items-center justify-center">
              <img src={shoeComp} alt="" id = "shoeCompSubDiv2" className="h-[80%]"/>
            </div>
            <div id="shoeCompSubDiv" className="w-[30%] h-[100%] flex flex-col justify-evenly">
              <div id = "shoeCompSubDiv3" className="flex flex-col gap-2 h-[35%] justify-center">
                <p className="text-[#f6aa28]">03.</p>
                <h2 id = "shoeCompText" className="text-2xl font-bold">ORGANIC COTTON</h2>
                <p id = "shoeCompText" className="text-neutral-400">
                Elevate your stride with our organic cotton laces, sourced responsibly for eco-friendly footwear. Embrace sustainability from head to toe with every tie, knowing each step supports ethical farming practices.
                </p>
              </div>
              <div id = "line" className="h-[1px] bg-neutral-700"></div>
              <div id = "shoeCompSubDiv3" className="flex flex-col gap-2 h-[35%] justify-center">
                <p className="text-[#f6aa28]">04.</p>
                <h2 id = "shoeCompText" className="text-2xl font-bold">UPCYCLED PLASTIC BOTTLES</h2>
                <p id = "shoeCompText" className="text-neutral-400">
                  Transforming waste into fashion, our shoes are crafted from
                  upcycled plastic bottles, reducing environmental impact one
                  step at a time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black text-white pb-10">
        <ShoeComponent title = "Our Best Seller" subTitle = "VIEW ALL BEST SELLERS" shoeInfo = {shoeInfo} setShoeInfo = {setShoeInfo}/>
      </div>

      <div className="bg-black">
        <Categories/>
      </div>

      <div className="bg-black text-white">
        <Review/>
      </div>

    </div>
  );
}
