import React, { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import ShoeCard from "./ShoeCard";
import "./ShoeCategory.css";
import { useNavigate } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const ShoeCategory = ({
  title,
  menData,
  womenData,
  setnavStatus,
  shoeInfo,
  setShoeInfo,
  searchResult,
}) => {
  const [sortingOption, setSortingOption] = useState("default");
  const [catTitle, setCatTitle] = useState(title);
  const [sortedData, setSortedData] = useState(
    title === "Men" ||
      searchResult === "Sneakers For Men" ||
      searchResult === "Runners For Men"
      ? menData
      : womenData
  );
  const [defaultData, setDefaultData] = useState(
    title === "Men" ||
      searchResult === "Sneakers For Men" ||
      searchResult === "Runners For Men"
      ? menData
      : womenData
  );
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(womenData.length);
  const [shoeNumber, setShoeNumber] = useState(
    title === "Shop"
      ? `Showing ${startIndex}-${endIndex} Of ${
          menData.length + womenData.length
        }   Results`
      : `Showing All ${sortedData.length} Results`
  );

  const runningShoes = menData.filter((shoe) => shoe.type === "Running");
  const runningShoeCount = runningShoes.length;

  const runningShoesWomen = womenData.filter((shoe) => shoe.type === "Running");
  const runningShoeWomenCount = runningShoesWomen.length;

  const sneakerShoesWomen = womenData.filter((shoe) => shoe.type === "Sneaker");
  const sneakerShoeWomenCount = sneakerShoesWomen.length;

  const trainingShoesWomen = womenData.filter(
    (shoe) => shoe.type === "Training"
  );
  const trainingShoeWomenCount = trainingShoesWomen.length;

  const sneakerShoes = menData.filter((shoe) => shoe.type === "Sneaker");
  const sneakerShoeCount = sneakerShoes.length;

  const handleSortingChange = (e) => {
    const option = e.target.value;
    setSortingOption(option);
    if (option === "default") {
      setSortedData([...defaultData]);
    } else {
      sortByPrice(option);
    }
  };

  function searchBarHandler() {
    if (searchResult === "Sneakers For Men") {
      const sneakerShoeData = menData.filter((shoe) => shoe.type === "Sneaker");
      setCatTitle(`${searchResult}`);
      setSortedData(sneakerShoeData);
      setDefaultData(sneakerShoeData);
      setShoeNumber(`Showing All ${sneakerShoeData.length} Results`);
      document.getElementById("navButtons").style.display = "none";
      return;
    } else if (searchResult === "Sneakers For Women") {
      const sneakerShoeData = womenData.filter(
        (shoe) => shoe.type === "Sneaker"
      );
      setCatTitle(`${searchResult}`);
      setSortedData(sneakerShoeData);
      setDefaultData(sneakerShoeData);
      setShoeNumber(`Showing All ${sneakerShoeData.length} Results`);
      document.getElementById("navButtons").style.display = "none";
      return;
    } else if (searchResult === "Runners For Men") {
      const runningShoesData = menData.filter(
        (shoe) => shoe.type === "Running"
      );
      setCatTitle(`${searchResult}`);
      setSortedData(runningShoesData);
      setDefaultData(runningShoesData);
      setShoeNumber(`Showing All ${runningShoesData.length} Results`);
      document.getElementById("navButtons").style.display = "none";
      return;
    } else if (searchResult === "Runners For Women") {
      const runningShoesData = womenData.filter(
        (shoe) => shoe.type === "Running"
      );
      setCatTitle(`${searchResult}`);
      setSortedData(runningShoesData);
      setDefaultData(runningShoesData);
      setShoeNumber(`Showing All ${runningShoesData.length} Results`);
      document.getElementById("navButtons").style.display = "none";
      return;
    } else if (searchResult === "Trainers For Women") {
      const trainingShoeData = womenData.filter(
        (shoe) => shoe.type === "Training"
      );
      setCatTitle(`${searchResult}`);
      setSortedData(trainingShoeData);
      setDefaultData(trainingShoeData);
      setShoeNumber(`Showing All ${trainingShoeData.length} Results`);
      document.getElementById("navButtons").style.display = "none";
      return;
    }  else if (searchResult === "/") {
      setCatTitle("Shop");
      setSortedData(womenData);
      setDefaultData(womenData);
      document.getElementById("navButtons").style.display = "flex";
      return ;
    }
  }

  useEffect(() => {
    searchBarHandler();
  }, [searchResult]);

  const sortByPrice = (option) => {
    const sorted = [...sortedData];
    if (option === "lowtohigh") {
      sorted.sort((a, b) => a.shoePrice - b.shoePrice);
    } else if (option === "hightolow") {
      sorted.sort((a, b) => b.shoePrice - a.shoePrice);
    }
    setSortedData(sorted);
  };

  function openNav() {
    document.getElementById("mySidepanel").style.width = "280px";
    document.getElementById("menDiv").style.filter = "brightness(30%)";
    document.getElementById("menDiv").style.position = "fixed";
    document.getElementById("menDiv").style.width = "100%";
    document.getElementById("sidePanelText").style.display = "block";
    setnavStatus(true);
  }

  function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
    document.getElementById("menDiv").style.filter = "brightness(100%)";
    document.getElementById("menDiv").style.position = "static";
    document.getElementById("sidePanelText").style.display = "none";
    setnavStatus(false);
  }

  function menRunningHandler() {
    // navigate("/men");
    const runningShoesData = menData.filter((shoe) => shoe.type === "Running");
    setCatTitle("Running");
    setSortedData(runningShoesData);
    setDefaultData(runningShoesData);
    setShoeNumber(`Showing All ${runningShoesData.length} Results`);
    document.getElementById("navButtons").style.display = "none";
    closeNav();
  }

  function menHandler() {
    setSortedData(menData);
    setDefaultData(menData);
    setCatTitle("Men");
    navigate("/men");
    setShoeNumber(`Showing All ${sortedData.length} Results`);
    document.getElementById("navButtons").style.display = "none";
    closeNav();
  }

  function menSneakerHandler() {
    // navigate("/men");
    const sneakerShoeData = menData.filter((shoe) => shoe.type === "Sneaker");
    setCatTitle("Sneaker");
    setSortedData(sneakerShoeData);
    setDefaultData(sneakerShoeData);
    setShoeNumber(`Showing All ${sneakerShoeData.length} Results`);
    document.getElementById("navButtons").style.display = "none";
    closeNav();
  }

  function womenRunningHandler() {
    // navigate("/women");
    const runningShoesData = womenData.filter(
      (shoe) => shoe.type === "Running"
    );
    setCatTitle("Running");
    setSortedData(runningShoesData);
    setDefaultData(runningShoesData);
    setShoeNumber(`Showing All ${runningShoesData.length} Results`);
    document.getElementById("navButtons").style.display = "none";
    closeNav();
  }

  function womenSneakerHandler() {
    // navigate("/women");
    const sneakerShoeData = womenData.filter((shoe) => shoe.type === "Sneaker");
    setCatTitle("Sneaker");
    setSortedData(sneakerShoeData);
    setDefaultData(sneakerShoeData);
    setShoeNumber(`Showing All ${sneakerShoeData.length} Results`);
    document.getElementById("navButtons").style.display = "none";
    closeNav();
  }

  function womenTrainingHandler() {
    // navigate("/women");
    const trainingShoeData = womenData.filter(
      (shoe) => shoe.type === "Training"
    );
    setCatTitle("Training");
    setSortedData(trainingShoeData);
    setDefaultData(trainingShoeData);
    setShoeNumber(`Showing All ${trainingShoeData.length} Results`);
    document.getElementById("navButtons").style.display = "none";
    closeNav();
  }

  function womenHandler() {
    setSortedData(womenData);
    setDefaultData(womenData);
    setCatTitle("Women");
    navigate("/women");
    setShoeNumber(`Showing All ${sortedData.length} Results`);
    document.getElementById("navButtons").style.display = "none";
    closeNav();
  }

  function firstHandler() {
    setSortedData(womenData);
    setDefaultData(womenData);
    const newEndIndex = Math.min(womenData.length, 12);
    setStartIndex(1);
    setEndIndex(newEndIndex);
    setShoeNumber(
      `Showing 1-${newEndIndex} Of ${menData.length + womenData.length} Results`
    );
    document.getElementById("btn1").style.display = "none";
    document.getElementById("btn4").style.display = "block";
    document.getElementById("btn2").style.backgroundColor = "#f6aa28";
    document.getElementById("btn2").style.borderColor = "white";
    document.getElementById("btn2").style.color = "white";
    document.getElementById("btn3").style.backgroundColor = "#111111";
    document.getElementById("btn3").style.borderColor = "#f6aa28";
    document.getElementById("btn3").style.color = "#f6aa28";
    document.documentElement.scrollTop = 0;
  }

  function secondHandler() {
    setSortedData(menData);
    setDefaultData(menData);
    const newStartIndex = Math.max(13, endIndex + 1);
    const newEndIndex = Math.min(
      menData.length + womenData.length,
      newStartIndex + 7
    );
    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
    setShoeNumber(
      `Showing ${newStartIndex}-${newEndIndex} Of ${
        menData.length + womenData.length
      } Results`
    );
    document.getElementById("btn4").style.display = "none";
    document.getElementById("btn1").style.display = "block";
    document.getElementById("btn3").style.backgroundColor = "#f6aa28";
    document.getElementById("btn3").style.borderColor = "white";
    document.getElementById("btn3").style.color = "white";
    document.getElementById("btn2").style.backgroundColor = "#111111";
    document.getElementById("btn2").style.borderColor = "#f6aa28";
    document.getElementById("btn2").style.color = "#f6aa28";
    document.documentElement.scrollTop = 0;
  }

  function prevHandler() {
    setSortedData(womenData);
    setDefaultData(womenData);
    const newEndIndex = Math.min(womenData.length, 12);
    setStartIndex(1);
    setEndIndex(newEndIndex);
    setShoeNumber(
      `Showing 1-${newEndIndex} Of ${menData.length + womenData.length} Results`
    );
    document.getElementById("btn1").style.display = "none";
    document.getElementById("btn4").style.display = "block";
    document.getElementById("btn2").style.backgroundColor = "#f6aa28";
    document.getElementById("btn2").style.borderColor = "white";
    document.getElementById("btn2").style.color = "white";
    document.getElementById("btn3").style.backgroundColor = "#111111";
    document.getElementById("btn3").style.borderColor = "#f6aa28";
    document.getElementById("btn3").style.color = "#f6aa28";
    document.documentElement.scrollTop = 0;
  }

  function nextHandler() {
    setSortedData(menData);
    setDefaultData(menData);
    const newStartIndex = endIndex + 1;
    const newEndIndex = Math.min(
      menData.length + womenData.length,
      newStartIndex + 7
    );
    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
    setShoeNumber(
      `Showing ${newStartIndex}-${newEndIndex} Of ${
        menData.length + womenData.length
      } Results`
    );
    document.getElementById("btn4").style.display = "none";
    document.getElementById("btn1").style.display = "block";
    document.getElementById("btn3").style.backgroundColor = "#f6aa28";
    document.getElementById("btn3").style.borderColor = "white";
    document.getElementById("btn3").style.color = "white";
    document.getElementById("btn2").style.backgroundColor = "#111111";
    document.getElementById("btn2").style.borderColor = "#f6aa28";
    document.getElementById("btn2").style.color = "#f6aa28";
    document.documentElement.scrollTop = 0;
  }

  return (
    <div id="categoryDiv">
      <div id="menDiv" className="flex justify-center py-14 bg-neutral-800">
        <div className="w-[75%] bg-[#111111] text-white p-12 flex flex-col gap-24 items-center">
          <div id="title-Sort-Div" className="flex flex-col gap-20 w-[97%]">
            <div className="flex flex-col gap-6">
              <h1
                id="catTitle"
                className="text-7xl text-[#f6aa28] font-semibold"
              >
                {catTitle}
              </h1>
            </div>

            <div id="sortingDiv" className="flex justify-between items-center">
              <div className="flex gap-8 items-center" id="filterDiv">
                <button
                  className="flex justify-center items-center gap-1 bg-[#cd9940] p-3 border hover:bg-neutral-700"
                  onClick={openNav}
                  id="filterShoesBtn"
                >
                  <FiMenu id="filterShoesContent" className="text-3xl" />
                  <p id="filterShoesContent">FILTER SHOES</p>
                </button>
                <div id="shoeNumber">{shoeNumber}</div>
              </div>

              <div>
                <select
                  name="sorting"
                  id="sorting"
                  className="bg-[#111111] text-white cursor-pointer"
                  value={sortingOption}
                  onChange={handleSortingChange}
                >
                  <option value="default">Default Sorting</option>
                  <option value="lowtohigh">Sort By Price: Low To High</option>
                  <option value="hightolow">Sort By Price: High To Low</option>
                </select>
              </div>
            </div>
          </div>

          <div
            className="flex flex-wrap gap-x-12 justify-center gap-y-24"
            id="catShoeCard"
          >
            {sortedData.map((shoe) => (
              <ShoeCard
                key={shoe.id}
                {...shoe}
                shoeInfo={shoeInfo}
                setShoeInfo={setShoeInfo}
              />
            ))}
          </div>

          <div
            id="navButtons"
            className={title === "Shop" ? "flex gap-3 w-[100%]" : "hidden"}
          >
            <button
              id="btn1"
              className="border border-[#f6aa28] p-3 px-4 text-2xl text-[#f6aa28] hidden"
              onClick={prevHandler}
            >
              <GrFormPrevious />
            </button>
            <button
              id="btn2"
              className="border border-white p-3 px-6 text-xl text-white bg-[#f6aa28]"
              onClick={firstHandler}
            >
              1
            </button>
            <button
              id="btn3"
              className="border border-[#f6aa28] p-3 px-6 text-xl text-[#f6aa28]"
              onClick={secondHandler}
            >
              2
            </button>
            <button
              id="btn4"
              className="border border-[#f6aa28] p-3 px-4 text-2xl text-[#f6aa28]"
              onClick={nextHandler}
            >
              <MdNavigateNext />
            </button>
          </div>
        </div>
      </div>

      <div
        id="mySidepanel"
        className="sidepanel text-[#cd9940] flex flex-col items-center bg-neutral-900"
      >
        <div
          className="closebtn cursor-pointer hover:text-white text-white"
          onClick={closeNav}
        >
          &times;
        </div>
        <div className="w-[80%] flex flex-col gap-16">
          <div className="flex flex-col gap-3">
            <h1
              id="sidePanelText"
              className="text-4xl text-white font-semibold mt-8"
            >
              Filter Shoes
            </h1>

            <h2 className="text-2xl text-white">Categories</h2>
          </div>

          <div className="text-xl flex flex-col gap-4 font-medium">
            <h1 className="text-2xl cursor-pointer w-fit" onClick={menHandler}>
              Men ({menData.length})
            </h1>
            <div>
              <p className="text-[17px] text-neutral-400 cursor-pointer flex justify-between">
                <span className="hover:text-white" onClick={menRunningHandler}>
                  Running
                </span>{" "}
                <span>{runningShoeCount}</span>
              </p>
              <p className="text-[17px] text-neutral-400 cursor-pointer flex justify-between">
                <span className="hover:text-white" onClick={menSneakerHandler}>
                  Sneaker
                </span>{" "}
                <span>{sneakerShoeCount}</span>
              </p>
            </div>
          </div>

          <div className="text-xl flex flex-col gap-4 font-medium">
            <h1 className="text-2xl cursor-pointer" onClick={womenHandler}>
              Women ({womenData.length})
            </h1>
            <div>
              <p className="text-[17px] text-neutral-400 cursor-pointer flex justify-between">
                <span
                  className="hover:text-white"
                  onClick={womenRunningHandler}
                >
                  Running
                </span>{" "}
                <span>{runningShoeWomenCount}</span>
              </p>
              <p className="text-[17px] text-neutral-400 cursor-pointer flex justify-between">
                <span
                  className="hover:text-white"
                  onClick={womenSneakerHandler}
                >
                  Sneaker
                </span>{" "}
                <span>{sneakerShoeWomenCount}</span>
              </p>
              <p className="text-[17px] text-neutral-400 cursor-pointer flex justify-between">
                <span
                  className="hover:text-white"
                  onClick={womenTrainingHandler}
                >
                  Training
                </span>{" "}
                <span>{trainingShoeWomenCount}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoeCategory;
