import React, { useState } from "react";
import { FaMobileScreenButton } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import toast from "react-hot-toast";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const [formStatus, setFormStatus] = useState(true);

  function changeHandler(event) {
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: [event.target.value],
      };
    });
  }

  function submitHandler(event) {
    event.preventDefault();
    setFormStatus(false);
    toast.success("Report Submitted");
  }

  return (
    <div className="h-fit bg-[#111]">
      <div className="h-[15vh] flex justify-center items-center">
        <h1
          id="contactMainHead"
          className="text-[#f6aa28] text-5xl font-semibold"
        >
          CONTACT US
        </h1>
      </div>

      <div className="bg-neutral-800 h-fit flex justify-center items-center">
        <div
          id="contactUsDiv"
          className="w-[100%] h-fit py-24 flex justify-center items-start gap-24"
        >
          <div id="numberSection" className="w-[20%] flex flex-col gap-10">
            <div id="numberSectionSubDivs" className="flex flex-col gap-2">
              <h1
                id="numberSectionHead"
                className="flex gap-2 text-2xl text-white items-center"
              >
                <FaMobileScreenButton className="text-[#f6aa28]" />{" "}
                <p className="font-semibold">Products & Order</p>
              </h1>
              <div
                id="numberSectionSubHead"
                className="w-[70%] flex flex-col pl-8 text-xl"
              >
                <p className="text-neutral-500">(+91) 123-456-7890</p>
                <p className="text-neutral-500">Available 24/7</p>
              </div>
            </div>
            <div className="bg-neutral-500 w-[100%] h-[1px]"> </div>
            <div id="numberSectionSubDivs" className="flex flex-col gap-2">
              <h1
                id="numberSectionHead"
                className="flex gap-2 text-2xl text-white items-center"
              >
                <FaMobileScreenButton className="text-[#f6aa28]" />{" "}
                <p className="font-semibold"> Info & Enquiries</p>
              </h1>
              <div
                id="numberSectionSubHead"
                className="w-[70%] flex flex-col pl-8 text-xl"
              >
                <p className="text-neutral-500">(+91) 123-456-7890</p>
                <p className="text-neutral-500">Available 24/7</p>
              </div>
            </div>
            <div className="bg-neutral-500 w-[100%] h-[1px]"> </div>
            <div id="numberSectionSubDivs" className="flex flex-col gap-2">
              <h1
                id="numberSectionHead"
                className="flex gap-2 text-2xl text-white items-center"
              >
                <FaLocationDot className="text-[#f6aa28]" />{" "}
                <p className="font-semibold">Store Locator</p>
              </h1>
              <p
                id="numberSectionSubHead"
                className="w-[70%] flex flex-col pl-8 text-xl text-neutral-500"
              >
                Find our retail near you
              </p>
            </div>
            <div
              id="numberSectionSubDivs"
              className="bg-neutral-500 w-[100%] h-[1px]"
            >
              {" "}
            </div>
            <div className="flex flex-col gap-3">
              <h1 id="numberSectionBottom" className="text-white">
                STAY IN TOUCH
              </h1>
              <p
                id="numberSectionBottom"
                className="flex gap-7 text-2xl text-[#f6aa28]"
              >
                <FaFacebook /> <FaTwitter /> <FaYoutube />
              </p>
            </div>
          </div>

          <div
            id="numberSectionLine"
            className="bg-neutral-500 w-[1px] h-[570px] z-30"
          ></div>

          <div
            id="inputSectionDiv"
            className="w-[40%] flex items-center h-[100%]"
          >
            {formStatus && (
              <form
                className="flex flex-col gap-9 w-[100%]"
                onSubmit={submitHandler}
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-white pl-1 text-xl">
                    Name <sup>*</sup>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-[100%] h-[50px] bg-[#111] rounded-lg text-white px-3"
                    required
                    onChange={changeHandler}
                    value={formData.name}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-white pl-1 text-xl">
                    Email <sup>*</sup>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-[100%] h-[50px] bg-[#111] rounded-lg text-white px-3"
                    required
                    onChange={changeHandler}
                    value={formData.email}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="comment" className="text-white pl-1 text-xl">
                    Comment or Message <sup>*</sup>
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    cols="30"
                    rows="6"
                    className="bg-[#111] rounded-lg text-white p-3 resize-none"
                    required
                    onChange={changeHandler}
                    value={formData.comment}
                  ></textarea>
                </div>

                <button
                  id="inputSectionBtn"
                  className="flex justify-center items-center gap-1 bg-[#cd9940] p-3 border hover:bg-neutral-700 w-[25%]"
                >
                  <p className="text-white">SEND MESSAGE</p>
                </button>
              </form>
            )}

            {!formStatus && (
              <div className="w-[100%]">
                <h1
                  id="afterSubmitText"
                  className="text-5xl text-white leading-relaxed"
                >
                  Thanks for contacting us! We will be in touch with you
                  shortly.
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
