import React, { useEffect, useState } from "react";
import { ScaleLoader, ClipLoader } from "react-spinners";
import logo from "../Logo.png";
import toast from "react-hot-toast";
import { Checkmark } from "react-checkmark";
import { IoLockClosedSharp } from "react-icons/io5";
import CheckoutItems from "./CheckoutItems";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";
import { ordersAPI, cartAPI, getToken } from "../utils/api";

export default function Checkout({
  setnavStatus,
  cartItems,
  totalOrderCost,
  setFooterStatus,
}) {
  useEffect(() => {
    setnavStatus(true);
    setLoaderStatus(true);
    setTimeout(() => {
      setLoaderStatus(false);
    }, 3000);
  }, []);

  const [loaderStatus, setLoaderStatus] = useState(false);
  const [paymentLoader, setPaymentLoader] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const navigate = useNavigate();

  function payHandler() {
    setPaymentLoader(true);
    setTimeout(() => {
      setPaymentStatus(true);
      setPaymentLoader(false);
      toast.success("Payment Successfull");
    }, 2000);
  }

  async function submitHandler(event) {
    event.preventDefault();
    if (paymentStatus === false) {
      toast.error(
        "Oops! Looks like payment is missing. Please complete it to place your order!"
      );
      return;
    }

    const formData = new FormData(event.target);
    const orderData = {
      items: cartItems.map(item => ({
        productId: item.id || item.productId,
        title: item.title,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        size: item.size
      })),
      totalAmount: totalOrderCost,
      customerInfo: {
        email: formData.get("emailoruser") || "",
        firstName: formData.get("firstname") || "",
        lastName: formData.get("lastname") || "",
        phone: formData.get("phone") || ""
      },
      billingAddress: {
        street: formData.get("housenumber") || "",
        apartment: formData.get("apartment") || "",
        city: formData.get("town") || "",
        state: formData.get("state") || "",
        postcode: formData.get("postcode") || ""
      }
    };

    document.documentElement.scrollTop = 0;
    setLoaderStatus(true);
    
    try {
      await ordersAPI.create(orderData);
      // Clear cart after successful order
      const token = getToken();
      if (token) {
        try {
          await cartAPI.clearCart();
        } catch (cartError) {
          console.error("Error clearing cart:", cartError);
        }
      }
      toast.success("Order placed successfully!");
      navigate("/confirm");
      setFooterStatus(false);
    } catch (error) {
      toast.error(error.message || "Failed to place order. Please try again.");
      console.error("Order creation error:", error);
    } finally {
      setLoaderStatus(false);
    }
  }

  return (
    <div>
      <div className="bg-[#111111] h-[80px] flex justify-center items-center">
        <img src={logo} alt="" className="w-[150px]" />
      </div>
      <div className="bg-neutral-800 flex justify-center py-12">
        {loaderStatus && (
          <div
            id="loader2"
            className="bg-[#111111] w-[60%] flex flex-col items-center py-12 gap-16 h-[60vh] justify-center"
          >
            <ScaleLoader color="#f6aa28" height={40} />
          </div>
        )}
        {!loaderStatus && (
          <div
            id="checkoutMainDiv"
            className="w-[70%] bg-[#111111] p-10 flex flex-col gap-14"
          >
            <h1
              id="checkoutMainHead"
              className="text-[rgb(246,170,40)] text-center text-5xl font-semibold"
            >
              CHECKOUT
            </h1>
            <div
              id="responsiveSummaryDiv"
              className="hidden justify-around bg-neutral-800 text-white p-7 font-semibold text-xl"
            >
              <div>Order Summary</div>
              <div>₹ {totalOrderCost}</div>
            </div>
            <div className="flex">
              <div id="checkoutSubDiv1" className="w-[50%] px-7">
                <form
                  action=""
                  className="flex flex-col gap-10"
                  onSubmit={submitHandler}
                >
                  <div className="flex flex-col gap-6">
                    <h1
                      id="checkoutSubHeadings"
                      className="text-white text-2xl font-semibold"
                    >
                      Customer Information
                    </h1>
                    <input
                      type="text"
                      className="w-[100%] bg-transparent border border-neutral-600 text-white h-[55px] px-5 rounded-md focus:outline-none"
                      placeholder="Username Or Email Address"
                      required
                      name="emailoruser"
                    />
                  </div>

                  <div className="flex flex-col gap-6">
                    <h1
                      id="checkoutSubHeadings"
                      className="text-white text-2xl font-semibold"
                    >
                      Billing Details
                    </h1>
                    <div className="flex flex-col gap-5">
                      <div className="flex gap-5">
                        <input
                          type="text"
                          className="w-[50%] bg-transparent border border-neutral-600 text-white h-[55px] px-5 rounded-md focus:outline-none"
                          placeholder="Enter First Name"
                          required
                          name="firstname"
                        />
                        <input
                          type="text"
                          className="w-[50%] bg-transparent border border-neutral-600 text-white h-[55px] px-5 rounded-md focus:outline-none"
                          placeholder="Enter Last Name"
                          required
                          name="lastname"
                        />
                      </div>

                      <input
                        type="text"
                        className="w-[100%] bg-transparent border border-neutral-600 text-white h-[55px] px-5 rounded-md focus:outline-none"
                        placeholder="Company Name"
                        name="company"
                      />
                      <div className="flex gap-5">
                        <input
                          type="text"
                          className="w-[50%] bg-transparent border border-neutral-600 text-white h-[55px] px-5 rounded-md focus:outline-none"
                          placeholder="House Number And Street Name"
                          name="housenumber"
                          required
                        />
                        <input
                          type="text"
                          className="w-[50%] bg-transparent border border-neutral-600 text-white h-[55px] px-5 rounded-md focus:outline-none"
                          placeholder="Appartment,Unit,etc (optional)"
                        />
                      </div>

                      <div className="flex gap-5">
                        <input
                          type="text"
                          className="w-[33%] bg-transparent border border-neutral-600 text-white h-[55px] px-5 rounded-md focus:outline-none"
                          placeholder="Town / City"
                          name="town"
                          required
                        />
                        <select
                          name="state"
                          id="state"
                          className="w-[33%] bg-[#111111] border border-neutral-600 text-white h-[55px] px-5 rounded-md focus:outline-none"
                        >
                          <option
                            value=""
                            disabled
                            selected
                            hidden
                            className="text-[#9ca3aa]"
                          >
                            State
                          </option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Andaman and Nicobar Islands">
                            Andaman and Nicobar Islands
                          </option>
                          <option value="Arunachal Pradesh">
                            Arunachal Pradesh
                          </option>
                          <option value="Assam">Assam</option>
                          <option value="Bihar">Bihar</option>
                          <option value="Chandigarh">Chandigarh</option>
                          <option value="Chhattisgarh">Chhattisgarh</option>
                          <option value="Dadar and Nagar Haveli">
                            Dadar and Nagar Haveli
                          </option>
                          <option value="Daman and Diu">Daman and Diu</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Lakshadweep">Lakshadweep</option>
                          <option value="Puducherry">Puducherry</option>
                          <option value="Goa">Goa</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Haryana">Haryana</option>
                          <option value="Himachal Pradesh">
                            Himachal Pradesh
                          </option>
                          <option value="Jammu and Kashmir">
                            Jammu and Kashmir
                          </option>
                          <option value="Jharkhand">Jharkhand</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Madhya Pradesh">Madhya Pradesh</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Manipur">Manipur</option>
                          <option value="Meghalaya">Meghalaya</option>
                          <option value="Mizoram">Mizoram</option>
                          <option value="Nagaland">Nagaland</option>
                          <option value="Odisha">Odisha</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Sikkim">Sikkim</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Telangana">Telangana</option>
                          <option value="Tripura">Tripura</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Uttarakhand">Uttarakhand</option>
                          <option value="West Bengal">West Bengal</option>
                        </select>

                        <input
                          type="text"
                          className="w-[33%] bg-transparent border border-neutral-600 text-white h-[55px] px-5 rounded-md focus:outline-none"
                          placeholder="Postcode / ZIP"
                          name="postcode"
                          required
                        />
                      </div>

                      <input
                        type="text"
                        className="w-[100%] bg-transparent border border-neutral-600 text-white h-[55px] px-5 rounded-md focus:outline-none"
                        placeholder="Phone"
                        name="phone"
                        required
                        maxLength={10}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h1
                      id="checkoutSubHeadings"
                      className="text-white text-2xl font-semibold"
                    >
                      Payment
                    </h1>
                    <div>
                      {!paymentLoader && !paymentStatus && (
                        <button
                          className="flex justify-center items-center gap-1 bg-[#cd9940] p-3 border hover:bg-neutral-700 w-[40%] text-white transition-all duration-300"
                          onClick={payHandler}
                          id="payNowBtn"
                        >
                          PAY NOW
                        </button>
                      )}

                      {paymentLoader && <ClipLoader color="#f6aa28" />}

                      {paymentStatus && (
                        <div
                          id="paymentDoneDiv"
                          className="flex justify-center items-center w-fit gap-3"
                        >
                          <h1
                            id="paymentDoneText"
                            className="text-xl text-green-500"
                          >
                            Payment Done
                          </h1>{" "}
                          <Checkmark
                            id="paymentDoneText"
                            color="green"
                            size="30px"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-[100%] flex flex-col gap-8">
                    <button className="text-neutral-500 text-xl w-fit">
                      Have a coupon?
                    </button>

                    <button className="flex w-[100%] justify-center items-center text-white gap-3 bg-[#cd9940] p-3 border hover:bg-neutral-700 transition-all duration-300">
                      <IoLockClosedSharp className="text-xl" />
                      <p>PLACE ORDER</p>
                    </button>
                  </div>
                </form>
              </div>
              <div
                id="checkoutSubDiv2"
                className="w-[50%] px-14 flex flex-col gap-6"
              >
                <h1 className="text-white text-2xl font-semibold">
                  Your Order
                </h1>
                <div className="border border-neutral-600 rounded-md">
                  <div className="text-[#98a3af] flex justify-between text-xl border-b border-neutral-600 h-[70px] items-center px-6">
                    <h1>Product</h1>
                    <h1>Subtotal</h1>
                  </div>

                  <div>
                    {cartItems.map((item) => (
                      <CheckoutItems
                        image={item.image}
                        title={item.title}
                        quantity={item.quantity}
                        size={item.size}
                        price={item.price}
                        totalPrice={totalOrderCost}
                      />
                    ))}
                  </div>

                  <div className="text-[#f6aa28] font-semibold flex justify-between text-xl border-b border-neutral-600 h-[80px] items-center px-6">
                    <h1>Total</h1>
                    <h1 className="text-white">₹ {totalOrderCost}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
