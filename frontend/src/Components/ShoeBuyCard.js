import React, { useState, useEffect } from "react";
import "./ShoeBuyCard.css";
import visa from "../Logos/visa.png";
import mastercard from "../Logos/mastercard.png";
import rupay from "../Logos/rupay.png";
import { ScaleLoader } from "react-spinners";
import toast from "react-hot-toast";
import { cartAPI, getToken } from "../utils/api";
import WriteReview from "./WriteReview";
import ProductReviews from "./ProductReviews";

export default function ShoeBuyCard({
  shoeInfo,
  setCartCount,
  cartCount,
  cartItems,
  setCartItems,
}) {
  const [shoeCount, setShoeCount] = useState(1);
  const [shoeSize, setShoeSize] = useState(0);
  const [loaderStatus, setLoaderStatus] = useState(false);

  useEffect(() => {
    function updateSubDivHeight() {
      const shoeImage = document.getElementById("shoe-image");
      const shoeBuyFirstSubDiv1 = document.getElementById(
        "shoeBuyFirstSubDiv1"
      );
      if (shoeImage && shoeBuyFirstSubDiv1) {
        shoeBuyFirstSubDiv1.style.height = `${shoeImage.clientHeight}px`;
      }
    }
    updateSubDivHeight();
    window.addEventListener("resize", updateSubDivHeight);
    return () => window.removeEventListener("resize", updateSubDivHeight);
  });

  function overHandler() {
    document.getElementById("shoe-image").classList.add("zoomed");
  }

  function outHandler() {
    document.getElementById("shoe-image").classList.remove("zoomed");
  }

  function plusHandler() {
    setShoeCount(shoeCount + 1);
  }

  function minusHandler() {
    if (shoeCount === 1) {
      return;
    }
    setShoeCount(shoeCount - 1);
  }

  function sizeHandler(event) {
    const selectedSize = event.target.value;
    setShoeSize(selectedSize);
    const sizeButtons = document.querySelectorAll(".sizeBTN");
    sizeButtons.forEach((button) => {
      button.style.backgroundColor = "";
    });
    event.target.style.backgroundColor = "#cd9940";
  }

  async function cartHandler() {
    if(shoeSize === 0) {
      toast.error("Please Select Shoe Size");
      return;
    }
    
    document.documentElement.scrollTop = 0;
    setLoaderStatus(true);

    try {
      const token = getToken();
      
      if (token) {
        // User is logged in - save to database
        await cartAPI.addToCart({
          productId: shoeInfo.id,
          title: shoeInfo.shoeTitle,
          image: shoeInfo.image,
          price: shoeInfo.shoePrice,
          quantity: shoeCount,
          size: shoeSize.toString()
        });
        
        // Fetch updated cart from database
        const updatedCart = await cartAPI.getCart();
        setCartItems(updatedCart.items);
        setCartCount(updatedCart.items.reduce((sum, item) => sum + item.quantity, 0));
        toast.success(`${shoeInfo.shoeTitle} Added To Cart`);
      } else {
        // User not logged in - use local state (fallback)
        const updatedCartItems = [...cartItems];
        const existingItemIndex = updatedCartItems.findIndex(
          (item) => item.title === shoeInfo.shoeTitle && item.size === shoeSize.toString()
        );

        if (existingItemIndex !== -1) {
          updatedCartItems[existingItemIndex].quantity += shoeCount;
        } else {
          updatedCartItems.push({
            id: shoeInfo.id,
            image: shoeInfo.image,
            title: shoeInfo.shoeTitle,
            price: shoeInfo.shoePrice,
            quantity: shoeCount,
            size: shoeSize.toString(),
          });
        }

        setCartItems(updatedCartItems);
        setCartCount(cartCount + shoeCount);
        toast.success(`${shoeInfo.shoeTitle} Added To Cart`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error(error.message || "Failed to add item to cart");
    } finally {
      setShoeCount(1);
      setShoeSize(0);
      setLoaderStatus(false);
    }
  }

  console.log(cartItems);
  return (
    <div className="flex justify-center py-14 bg-neutral-800">
      {loaderStatus && (
        <div
          id="loader"
          className="bg-[#111111] w-[60%] flex flex-col items-center py-12 gap-16 h-[60vh] justify-center"
        >
          <ScaleLoader color="#f6aa28" height={40} />
        </div>
      )}

      {!loaderStatus && (
        <div
          id="shoeBuyMainDiv"
          className="bg-[#111111] w-[60%] flex flex-col items-center py-12 gap-16"
        >
          <div id="shoeBuyFirstDiv" className="w-[92%] flex gap-12">
            <div
              className="relative w-[48%] h-[500px] overflow-hidden"
              onMouseOver={overHandler}
              onMouseOut={outHandler}
              id="shoeBuyFirstSubDiv1"
            >
              <img
                src={shoeInfo.image}
                alt=""
                className="w-[100%] absolute transition-transform duration-[0.3s] ease-in-out"
                id="shoe-image"
              />
            </div>
            <div
              id="shoeBuyFirstSubDiv2"
              className="w-[46%] flex flex-col gap-6"
            >
              <div className="flex flex-col gap-11">
                <div className="flex flex-col gap-2">
                  <p className="text-[#f6aa28]">{shoeInfo.type}</p>
                  <h1 id="shoeBuyTitle" className="text-white text-2xl">
                    {shoeInfo.shoeTitle}
                  </h1>
                  <div id="shoeBuyPrice" className="flex text-2xl gap-5">
                    <div
                      className={
                        shoeInfo.saleStatus
                          ? `line-through text-neutral-600 block font-semibold`
                          : `hidden`
                      }
                    >
                      ₹ {shoeInfo.oldShoePrice}
                    </div>
                    <div className="text-neutral-400 font-semibold flex gap-3 items-center">
                      ₹ {shoeInfo.shoePrice}{" "}
                      <span id="freeShipping" className="text-lg">
                        & Free Shipping
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-neutral-300 flex gap-4 items-center flex-wrap">
                  <div>Size-UK/India</div>
                  <button
                    value="4"
                    name="size"
                    className="border border-neutral-600 w-[40px] h-[40px] flex justify-center items-center cursor-pointer sizeBTN"
                    onClick={sizeHandler}
                  >
                    4
                  </button>
                  <button
                    value="5"
                    name="size"
                    className="border border-neutral-600 w-[40px] h-[40px] flex justify-center items-center cursor-pointer sizeBTN"
                    onClick={sizeHandler}
                  >
                    5
                  </button>
                  <button
                    value="6"
                    name="size"
                    className="border border-neutral-600 w-[40px] h-[40px] flex justify-center items-center cursor-pointer sizeBTN"
                    onClick={sizeHandler}
                  >
                    6
                  </button>
                  <button
                    value="7"
                    name="size"
                    className="border border-neutral-600 w-[40px] h-[40px] flex justify-center items-center cursor-pointer sizeBTN"
                    onClick={sizeHandler}
                  >
                    7
                  </button>
                  <button
                    value="8"
                    name="size"
                    className="border border-neutral-600 w-[40px] h-[40px] flex justify-center items-center cursor-pointer sizeBTN"
                    onClick={sizeHandler}
                  >
                    8
                  </button>
                  <button
                    value="9"
                    name="size"
                    className="border border-neutral-600 w-[40px] h-[40px] flex justify-center items-center cursor-pointer sizeBTN"
                    onClick={sizeHandler}
                  >
                    9
                  </button>
                </div>

                <div id="addToCartDiv" className="flex gap-10">
                  <div className="text-neutral-400 flex text-xl">
                    <button
                      className="border border-neutral-600 w-10 h-10 flex justify-center items-center cursor-pointer"
                      onClick={minusHandler}
                    >
                      -
                    </button>
                    <div className="border border-neutral-600 w-12 h-10 flex justify-center items-center">
                      {shoeCount}
                    </div>
                    <button
                      className="border border-neutral-600 w-10 h-10 flex justify-center items-center cursor-pointer"
                      onClick={plusHandler}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={cartHandler}
                    id="addToCartBTN"
                    className="text-white bg-[#cd9940] px-5 border hover:bg-neutral-700"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
              <div className="w-[100%] h-[2px] bg-neutral-600"></div>

              <div className="flex flex-col gap-5">
                <p className="text-neutral-500 font-semibold">
                  Category:{" "}
                  <span className="text-[#f6aa28] font-semibold">
                    {shoeInfo.type}
                  </span>
                </p>

                <div
                  id="cardLogosMainDiv"
                  className="h-[150px] flex items-center justify-center relative"
                >
                  <h1
                    id="cardLogosHead"
                    className="text-neutral-400 text-xl w-fit absolute top-1 bg-[#111111] px-3"
                  >
                    Guaranteed Safe Checkout
                  </h1>
                  <div
                    id="cardLogosDiv"
                    className="border border-neutral-600 h-[75%] w-full flex justify-center items-center gap-7"
                  >
                    <img src={visa} alt="" className="w-[70px] h-[70px]" />
                    <img
                      src={mastercard}
                      alt=""
                      className="w-[70px] h-[40px]"
                    />
                    <img src={rupay} alt="" className="w-[70px] h-[55px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[92%]">
            <div className="w-[100%] h-[1px] bg-neutral-600"></div>
            <div className="pt-10 flex flex-col gap-6">
              <h1 id="descHead" className="text-white text-3xl font-semibold">
                DESCRIPTION
              </h1>
              <div
                id="descBody"
                className="text-neutral-500 text-xl leading-loose"
              >
                {shoeInfo.desc}
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          {shoeInfo.id && (
            <div className="w-[92%] mt-10">
              <div className="w-[100%] h-[1px] bg-neutral-600 mb-10"></div>
              
              {/* Product Reviews */}
              <ProductReviews productId={shoeInfo.id} productTitle={shoeInfo.shoeTitle} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
