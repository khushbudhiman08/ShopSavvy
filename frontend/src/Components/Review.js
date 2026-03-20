import React from "react";
import ReviewCard from "./ReviewCard";
import rev1 from "../Review Images/Review 1.jpg";
import rev2 from "../Review Images/Review 2.jpg";
import rev3 from "../Review Images/Review 3.jpg";

export default function Review() {
  const reviewData = [
    {
      value: 4,
      review:
        "Absolutely love my new shoes from this website! The quality is top-notch, and they're so comfortable to wear all day long. Will definitely be buying from here again!",
      image: rev1,
      name: "AKSHAY SHARMA",
    },

    {
      value: 5,
      review:
        "These shoes exceeded my expectations! Not only are they stylish, but the fit is perfect and the shipping was lightning-fast.",
      image: rev2,
      name: "KARTIK KATWAL",
    },

    {
      value: 4,
      review:
        "Wow, these shoes are a game-changer! The design is trendy, the material feels durable, and they provide fantastic support.",
      image: rev3,
      name: "KRISHNANSHU RATHOR",
    },
  ];

  return (
    <div id = "review" className="bg-neutral-950 h-[70vh] flex flex-col">
      <h1 id="reviewHead" className="text-4xl font-bold h-[25%] flex items-center justify-center text-[#f6aa28]">
        OUR CUSTOMERS SPEAK FOR US
      </h1>
      <div className="flex justify-center gap-10 h-[60%] flex-wrap">
        <ReviewCard
          value={reviewData[0].value}
          review={reviewData[0].review}
          image={reviewData[0].image}
          name={reviewData[0].name}
        />
        <ReviewCard
          value={reviewData[1].value}
          review={reviewData[1].review}
          image={reviewData[1].image}
          name={reviewData[1].name}
        />
        <ReviewCard
          value={reviewData[2].value}
          review={reviewData[2].review}
          image={reviewData[2].image}
          name={reviewData[2].name}
        />
      </div>

      <div className="flex justify-center items-center">
        <p className="text-xl text-neutral-400" id = "reviewEnd">4.8 average rating from 1814 reviews</p>
      </div>
    </div>
  );
}
