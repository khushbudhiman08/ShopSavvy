import React, { useState } from "react";
import logo from "../Logo.png";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { RiAccountCircleFill } from "react-icons/ri";
import { BiMenu } from "react-icons/bi";
import Sidebar from "./Sidebar";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const sampleSuggestions = [
    "Sneakers For Men",
    "Sneakers For Women",
    "Runners For Men",
    "Runners For Women",
    "Trainers For Women",
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleInputChange = (value) => {
    setInputValue(value);
    const fetchedSuggestions = [
      "Sneakers For Men",
      "Sneakers For Women",
      "Runners For Men",
      "Runners For Women",
      "Trainers For Women",
    ].filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(fetchedSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);

    setSuggestions([]);
  };
 
  const handleDocumentClick = (event) => {
    if (!event.target.closest(".autocomplete")) {
      setSuggestions([]);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  function submitHandler(event) {
    event.preventDefault();
    if (inputValue.trim() === "") {
      return;
    }

    if (!sampleSuggestions.includes(inputValue)) {
      props.setSearchResult(inputValue);
      setInputValue("");
      navigate("/nomatch");
      return;
    }

    props.setSearchResult(inputValue);
    setInputValue("");
    navigate("/collection");
  }

  return (
    <div id="navBar" className={props.navStatus ? "hidden" : ""}>
      <div className="flex justify-between p-5 bg-[#111111] font-medium px-10 text-[14px] items-center">
        <div
          className="sideBarMenu text-4xl text-white cursor-pointer hidden"
          onClick={toggleSidebar}
        >
          <BiMenu />
        </div>
        <div className="flex gap-9 items-center">
          <div className="cursor-pointer">
            <NavLink to="/">
              <img src={logo} alt="" className="w-[150px]" />
            </NavLink>
          </div>
          <div className="flex gap-6 items-center navcont1">
            <div className="text-neutral-400 hover:text-white cursor-pointer transition-all duration-100 delay-75">
              <NavLink
                to="/men"
                onClick={() => {
                  props.setSearchResult("men");
                }}
              >
                MEN
              </NavLink>
            </div>
            <div className="text-neutral-400 hover:text-white cursor-pointer transition-all duration-100 delay-75">
              <NavLink
                to="/women"
                onClick={() => {
                  props.setSearchResult("women");
                }}
              >
                WOMEN
              </NavLink>
            </div>
            <div className="text-neutral-400 hover:text-white cursor-pointer transition-all duration-100 delay-75">
              <NavLink
                to="/collection"
                onClick={() => {
                  props.setSearchResult("/");
                }}
              >
                COLLECTION
              </NavLink>
            </div>
            <div className="text-neutral-400 hover:text-white cursor-pointer transition-all duration-100 delay-75">
              <NavLink to="/lookbook">LOOKBOOK</NavLink>
            </div>
          </div>
        </div>

        <div className="flex gap-7 items-center">
          <form
            id="mainSearchBar"
            className="w-[450px] relative"
            onSubmit={submitHandler}
          >
            <label
              htmlFor="search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                id="search"
                autoComplete="off"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-neutral-900 focus:border-neutral-900 dark:bg-neutral-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-neutral-900 dark:focus:border-neutral-900"
                placeholder="Search Items ..."
              />
              {suggestions.length > 0 && (
                <div className="autocomplete absolute z-10 w-full mt-1 bg-neutral-800 text-[#959ba6] border border-neutral-600 rounded-lg shadow-lg">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="autocomplete-item px-4 py-2 cursor-pointer hover:bg-neutral-700 rounded-lg"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
              <button
                type="submit"
                className="text-neutral-400 absolute end-2.5 bottom-2.5 bg-black hover:bg-neutral-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#111111] dark:hover:bg-neutral-900 dark:focus:ring-neutral-900"
              >
                Search
              </button>
            </div>
          </form>

          <div className="navcont1 text-neutral-400 hover:text-white cursor-pointer transition-all duration-100 delay-75">
            <NavLink to="/contact">CONTACT</NavLink>
          </div>
          <div className="text-3xl text-white cursor-pointer relative h-[100%] w-[40px] flex items-center">
            <sup className="absolute top-[-1] text-xs right-[1px]">
              {props.cartCount}
            </sup>
            <NavLink to="/cart">
              <HiMiniShoppingBag />
            </NavLink>
          </div>
          <div className="navcont1 text-3xl text-white cursor-pointer">
            <NavLink to="/account">
              <RiAccountCircleFill />
            </NavLink>
          </div>
        </div>
        {isSidebarOpen && (
          <Sidebar
            setIsSidebarOpen={setIsSidebarOpen}
            setSearchResult={props.setSearchResult}
          />
        )}
      </div>

      <div
        id="searchBarDiv"
        className="hidden justify-center items-center bg-[#111111] py-5"
      >
        <form className="w-[90%] relative" onSubmit={submitHandler}>
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              autoComplete="off"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-neutral-900 focus:border-neutral-900 dark:bg-neutral-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-neutral-900 dark:focus:border-neutral-900"
              placeholder="Search Items ..."
            />
            {suggestions.length > 0 && (
              <div className="autocomplete absolute z-10 w-full mt-1 bg-neutral-800 text-[#959ba6] border border-neutral-600 rounded-lg shadow-lg">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="autocomplete-item px-4 py-2 cursor-pointer hover:bg-neutral-700 rounded-lg"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
            <button
              type="submit"
              className="text-neutral-400 absolute end-2.5 bottom-2.5 bg-black hover:bg-neutral-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#111111] dark:hover:bg-neutral-900 dark:focus:ring-neutral-900"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
