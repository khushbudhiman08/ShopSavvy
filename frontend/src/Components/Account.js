import React, { useState, useEffect } from "react";
import "./Account.css";
import toast from "react-hot-toast";
import { authAPI, ordersAPI, reviewsAPI } from "../utils/api";
import { ScaleLoader } from "react-spinners";
import Rating from "@mui/material/Rating";

export default function Account({ mainUser, setLoginStatus }) {
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
    fetchReviews();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const ordersData = await ordersAPI.getMyOrders();
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      setReviewsLoading(true);
      const reviewsData = await reviewsAPI.getMyReviews();
      setReviews(reviewsData);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setReviewsLoading(false);
    }
  };

  function signOutHandler() {
    setLoginStatus(false);
    authAPI.logout();
    localStorage.clear();
    toast.success("Logged Out");
    document.documentElement.scrollTop = 0;
  }
  
  return (
    <div>
      <div
        id="responsiveAccountDropdown"
        className="bg-neutral-800 justify-center hidden"
      >
        <select
          name=""
          id="accountDropdown"
          className="text-white bg-[#111111] rounded-md h-[60px] w-[90%] px-12"
        >
          <option value="">Account</option>
          <option value="">Order History</option>
          <option value="">Favorites Lists</option>
          <option value="">Address Book</option>
          <option value="">Communications</option>
          <option value="">Account Settings</option>
          <option value="">Store Credit</option>
          <option value="">Return Request</option>
        </select>
      </div>

      <div
        id="accountWrapper"
        className="p-16 bg-neutral-800 flex justify-center"
      >
        <div
          id="accountMainDiv"
          className="bg-[#111111] w-[80%] flex p-16 gap-28"
        >
          <div
            id="accountNavBTNDiv"
            className="flex justify-center items-center w-[18%] py-24"
          >
            <div className="flex flex-col text-neutral-500 items-start gap-6 w-[100%] text-xl">
              <button className="text-white">Account</button>
              <button className="hover:text-white transition-all duration-75">
                Order History
              </button>
              <button className="hover:text-white transition-all duration-75">
                Favorites Lists
              </button>
              <button className="hover:text-white transition-all duration-75">
                Address Book
              </button>
              <button className="hover:text-white transition-all duration-75">
                Communications
              </button>
              <button className="hover:text-white transition-all duration-75">
                Account Settings
              </button>
              <button className="hover:text-white transition-all duration-75">
                Store Credit
              </button>
              <button className="hover:text-white transition-all duration-75">
                Return Request
              </button>
              <div className="w-[100%] h-[1px] bg-neutral-400"></div>
              <button
                onClick={signOutHandler}
                className="text-[rgb(246,170,40)] transition-all duration-75 hover:text-white"
              >
                Sign Out
              </button>
            </div>
          </div>
          <div
            id="accountNavBTNDiv"
            className="h-full w-[1px] bg-neutral-400"
          ></div>

          <div
            id="accountContentDiv"
            className="w-[70%] flex flex-col py-24 gap-16"
          >
            <div id="accountTopText1" className="flex items-center">
              <h1 id="accountTopText1" className="text-4xl text-white">
                Welcome,{" "}
                <span className="text-[rgb(246,170,40)] font-semibold max-w-[100%] inline-block break-all">
                  {mainUser}
                </span>
              </h1>
            </div>
            <div className="w-[100%] h-[1px] bg-neutral-400"></div>
            <div
              id="accountFlexSubDivs"
              className="flex justify-between items-center"
            >
              <div
                id="accountFlexSubDivsText"
                className="w-[55%] flex flex-col gap-3"
              >
                <h1
                  id="accountFlexSubDivsHead"
                  className="text-[rgb(246,170,40)] text-4xl font-semibold"
                >
                  Orders
                </h1>
                {loading ? (
                  <div className="flex justify-center py-4">
                    <ScaleLoader color="#f6aa28" height={20} />
                  </div>
                ) : orders.length === 0 ? (
                  <p id="accountFlexSubDivsOther" className="text-neutral-500">
                    It looks like you haven't placed any orders yet. Remember, you
                    get free shipping and returns!
                  </p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order._id} className="bg-neutral-800 p-4 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white font-semibold">
                            Order #{order._id.slice(-6).toUpperCase()}
                          </span>
                          <span className="text-[rgb(246,170,40)] font-semibold">
                            ₹{order.totalAmount}
                          </span>
                        </div>
                        <p className="text-neutral-400 text-sm">
                          {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} item(s) • Status: {order.status}
                        </p>
                      </div>
                    ))}
                    {orders.length > 3 && (
                      <p className="text-neutral-500 text-sm">
                        +{orders.length - 3} more order(s)
                      </p>
                    )}
                  </div>
                )}
              </div>
              {orders.length > 0 && (
                <div>
                  <button id="viewAllOrdersDiv" className="text-white">
                    VIEW ALL ORDERS ({orders.length})
                  </button>
                  <div
                    id="viewAllOrdersLine"
                    className="w-[100%] h-[1px] bg-[rgb(246,170,40)]"
                  ></div>
                </div>
              )}
            </div>
            <div className="w-[100%] h-[1px] bg-neutral-400"></div>
            <div
              id="accountFlexSubDivs"
              className="flex justify-between items-center"
            >
              <div
                id="accountFlexSubDivsText"
                className="w-[55%] flex flex-col gap-3"
              >
                <h1
                  id="accountFlexSubDivsHead"
                  className="text-[rgb(246,170,40)] text-4xl font-semibold"
                >
                  My Reviews
                </h1>
                {reviewsLoading ? (
                  <div className="flex justify-center py-4">
                    <ScaleLoader color="#f6aa28" height={20} />
                  </div>
                ) : reviews.length === 0 ? (
                  <p id="accountFlexSubDivsOther" className="text-neutral-500">
                    You haven't written any reviews yet. Share your experience with products you've purchased!
                  </p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {reviews.slice(0, 3).map((review) => (
                      <div key={review._id} className="bg-neutral-800 p-4 rounded-md">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-white font-semibold mb-1">
                              Product ID: {review.productId}
                            </p>
                            <Rating value={review.rating} readOnly size="small" />
                          </div>
                          <span className="text-neutral-400 text-sm">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-neutral-300 text-sm mt-2 line-clamp-2">
                          {review.comment}
                        </p>
                        {review.verifiedPurchase && (
                          <span className="text-xs text-green-400 mt-2 inline-block">
                            ✓ Verified Purchase
                          </span>
                        )}
                      </div>
                    ))}
                    {reviews.length > 3 && (
                      <p className="text-neutral-500 text-sm">
                        +{reviews.length - 3} more review(s)
                      </p>
                    )}
                  </div>
                )}
              </div>
              {reviews.length > 0 && (
                <div>
                  <button id="viewAllOrdersDiv" className="text-white">
                    VIEW ALL REVIEWS ({reviews.length})
                  </button>
                  <div
                    id="viewAllOrdersLine"
                    className="w-[100%] h-[1px] bg-[rgb(246,170,40)]"
                  ></div>
                </div>
              )}
            </div>
            <div className="w-[100%] h-[1px] bg-neutral-400"></div>
            <div
              id="accountFlexSubDivs"
              className="flex justify-between items-center"
            >
              <div
                id="accountFlexSubDivsText"
                className="w-[55%] flex flex-col gap-3"
              >
                <h1
                  id="accountFlexSubDivsHead"
                  className="text-[rgb(246,170,40)] text-4xl font-semibold"
                >
                  Favourites
                </h1>
                <p id="accountFlexSubDivsOther" className="text-neutral-500">
                  The products you've ♥'d, saved in one place.
                </p>
              </div>
              <div>
                <button id="viewAllOrdersDiv" className="text-white">
                  VIEW ALL FAVOURITES
                </button>
                <div
                  id="viewAllOrdersLine"
                  className="w-[100%] h-[1px] bg-[rgb(246,170,40)]"
                ></div>
              </div>

              <button
                id="responsiveSignOutBtn"
                onClick={signOutHandler}
                className="text-[rgb(246,170,40)] transition-all duration-75 hover:text-white text-xl hidden"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
