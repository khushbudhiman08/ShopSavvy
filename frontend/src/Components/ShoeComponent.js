import React from "react";
import ShoeCard from "./ShoeCard";
import best1 from "../Shoe Images/Best Seller 1.jpg";
import best2 from "../Shoe Images/Best Seller 2.jpg";
import best3 from "../Shoe Images/Best Seller 3.jpg";
import best4 from "../Shoe Images/Best Seller 4.jpg";
import best5 from "../Shoe Images/Best Seller 5.jpg";
import best6 from "../Shoe Images/Best Seller 6.jpg";
import "./ShoeComponent.css";

export default function ShoeComponent(props) {
  const shoeData = [
    {
      image: best1,
      shoeTitle: "Women’s Tosca City Run",
      shoePrice: 2499,
      saleStatus: false,
      type: "Running",
      desc: "Introducing Women’s Tosca City Run, a vibrant embodiment of urban style and functionality. These sneakers feature a striking tosca hue that adds a bold pop of color to your cityscape ensemble. Crafted with meticulous detail, they offer a perfect balance of fashion-forward design and athletic performance. The lightweight construction and responsive cushioning ensure all-day comfort and support for your urban adventures. Whether navigating busy streets or exploring hidden gems, Women’s Tosca City Run shoes keep you effortlessly chic and on-the-go. Step into these sleek sneakers and make a statement with every step, embracing the dynamic spirit of city life with unmatched style and confidence."
    },

    {
      image: best2,
      shoeTitle: "Men’s Green Running",
      oldShoePrice: 4200,
      shoePrice: 3500,
      saleStatus: true,
      type: "Running",
      desc: "Introducing Men’s Green Running, a dynamic fusion of style and performance. These running shoes are designed to make a statement with their vibrant green colorway, adding a bold touch to your athletic attire. Engineered for runners who demand both comfort and functionality, they feature responsive cushioning and supportive midsoles to enhance your performance. With a breathable upper construction, they ensure optimal airflow to keep your feet cool and comfortable throughout your run. Whether you're hitting the track or pounding the pavement, Men’s Green Running shoes provide the perfect balance of style and support. Step into these sleek sneakers and conquer every mile with confidence and style."
    },

    {
      image: best3,
      shoeTitle: "Women’s Orange Sneaker",
      shoePrice: 2750,
      saleStatus: false,
      type: "Sneaker",
      desc: "Introducing Women’s Orange Sneaker, a vibrant blend of style and comfort for the modern woman. These sneakers feature a bold orange hue that adds a pop of color to any outfit. Crafted with attention to detail, they offer a perfect balance of fashion and functionality. The lightweight design and cushioned footbed ensure all-day comfort, making them ideal for everyday wear. Whether you're running errands or meeting friends for coffee, Women’s Orange Sneaker keeps you stylish and on-the-go. Step into these chic sneakers and elevate your look with a touch of playful sophistication. Experience the perfect combination of style and comfort with Women’s Orange Sneaker."
    },

    {
      image: best4,
      shoeTitle: "Men’s Black Running",
      shoePrice: 4500,
      saleStatus: false,
      type: "Running",
      desc: "Introducing Men's Black Running - the epitome of style and performance in athletic footwear. Engineered for the modern runner, these shoes blend sleek aesthetics with cutting-edge technology to deliver an unparalleled running experience. With their lightweight design and responsive cushioning, they provide optimal support and comfort mile after mile. The all-black colorway exudes sophistication and versatility, effortlessly complementing any workout attire or casual ensemble."
    },

    {
      image: best5,
      shoeTitle: "Women’s Green Training",
      oldShoePrice: 3500,
      shoePrice: 2600,
      saleStatus: true,
      type: "Training",
      desc: "Introducing Women’s Green Training, the epitome of style and performance for the active woman. These training shoes feature a vibrant green colorway that exudes energy and vitality. Engineered with precision, they offer optimal support and stability for all your training needs. The lightweight design and responsive cushioning ensure maximum comfort and flexibility, allowing you to push yourself further with each workout. Whether you're hitting the gym or enjoying outdoor activities, Women’s Green Training shoes are designed to keep up with your active lifestyle. Elevate your training routine with these stylish and functional sneakers that empower you to reach new heights. Step into Women’s Green Training and make a statement with every step."
    },

    {
      image: best6,
      shoeTitle: "Women’s Pink Training",
      oldShoePrice: 3500,
      shoePrice: 2600,
      saleStatus: true,
      type: "Training",
      desc: "Introducing Women’s Pink Training, a perfect blend of style and functionality for the active woman. These training shoes boast a vibrant pink hue that adds a touch of femininity to your workout ensemble. Crafted with precision, they offer optimal support and stability for your training sessions. The lightweight design and responsive cushioning ensure maximum comfort and flexibility, allowing you to push your limits with confidence. Whether you're hitting the gym or engaging in outdoor activities, Women’s Pink Training shoes keep you stylish and comfortable throughout your fitness journey. Step into these chic sneakers and elevate your workout attire with a splash of color. Experience the perfect fusion of fashion and performance with Women’s Pink Training."
    },
  ];

  return (
    <div className="flex justify-center">
      <div className="w-[70%] flex flex-col" id="fourthDiv">
        <div
          id="shoeCardsTopDiv"
          className="flex justify-between h-[150px] items-center px-6"
        >
          <h2 className="text-3xl font-bold">{props.title}</h2>
          <div id="shoeSubTitle" className="cursor-pointer">
            <div className="text-[15px]">{props.subTitle}</div>
            <div id="subTitleLine" className="bg-[#f6aa28] h-[1.5px]"></div>
          </div>
        </div>

        <div
          id="shoeCardCollection"
          className="flex justify-around flex-wrap gap-y-20"
        >
          {shoeData.map((shoe) => (
            <ShoeCard {...shoe} shoeInfo = {props.shoeInfo} setShoeInfo = {props.setShoeInfo}/>
          ))}
        </div>
      </div>
    </div>
  );
}
