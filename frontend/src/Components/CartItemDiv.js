import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import toast from "react-hot-toast";

export default function CartItemDiv({
  itemId,
  index,
  image,
  title,
  quantity,
  size,
  price,
  onUpdateQuantity,
  onRemove,
}) {
  function minusHandler() {
    if (quantity > 1) {
      onUpdateQuantity(quantity - 1);
    }
  }

  function plusHandler() {
    onUpdateQuantity(quantity + 1);
  }

  function handleRemove() {
    onRemove(itemId, index);
  }

  return (
    <div
      id="productDetailsDiv"
      className="w-[100%] px-3 bg-neutral-800v h-[100px] flex items-center text-neutral-400 border border-neutral-600"
    >
      <div id="imgDiv" className="w-[40%] flex gap-10 items-center">
        <div>
          <img src={image} alt="" className="w-[80px] h-[80px]" />
        </div>
        <div id="productTitleDiv" className="flex flex-wrap">
          <span id="productResponsiveHeadings" className="hidden">
            Product:
          </span>{" "}
          <p className="flex justify-end">{title}</p>
        </div>
      </div>

      <div id="shoeDetailsDivResp" className="w-[20%] flex justify-center">
        <span id="productResponsiveHeadings" className="hidden">
          Price:
        </span>{" "}
        ₹ {price}
      </div>

      <div
        id="shoeDetailsDivResp"
        className="w-[20%] flex justify-center flex-wrap"
      >
        <span id="productResponsiveHeadings" className="hidden">
          Quantity:
        </span>

        <div className="flex">
          <button
            className="border border-neutral-600 w-10 h-10 flex justify-center items-center cursor-pointer"
            onClick={minusHandler}
          >
            -
          </button>
          <div className="border border-neutral-600 w-12 h-10 flex justify-center items-center">
            {quantity}
          </div>
          <button
            className="border border-neutral-600 w-10 h-10 flex justify-center items-center cursor-pointer"
            onClick={plusHandler}
          >
            +
          </button>
        </div>
      </div>

      <div
        id="shoeDetailsDivResp"
        className="w-[20%] flex justify-center flex-wrap"
      >
        {" "}
        <span id="productResponsiveHeadings" className="hidden">
          Size:
        </span>{" "}
        {size}
      </div>
      <div
        id="subTotalMainDiv"
        className="w-[20%] flex justify-end gap-9 items-center"
      >
        {" "}
        <div id="subTotalDiv" className="flex flex-wrap">
          {" "}
          <span id="productResponsiveHeadings" className="hidden">
            Subtotal:
          </span>{" "}
          <p>{quantity * price}</p>{" "}
        </div>
        <IoCloseCircleOutline
          className="text-2xl cursor-pointer text-white"
          id="cartRemoveBtn"
          onClick={() => {
            handleRemove();
            toast.success(`${title} Removed From Cart`);
          }}
        />
      </div>
    </div>
  );
}
