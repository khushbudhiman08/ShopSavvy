import React from "react";

export default function NoItemsMatched({ searchResult }) {
  return (
    <div>
      <div
        id="menDiv"
        className="flex justify-center py-14 bg-neutral-800"
        style={{ maxWidth: "100%" }}
      >
        <div className="w-[75%] bg-[#111111] text-white p-12 flex flex-col gap-24 items-center">
          <div
            id="title-Sort-Div"
            className="flex flex-col gap-20 w-full"
            style={{ maxWidth: "100%" }}
          >
            <div className="flex flex-col gap-6 w-full">
              <h1
                id="catTitle"
                className="text-7xl text-[#f6aa28] font-semibold w-full break-words"
              >
                {searchResult}
              </h1>
            </div>

            <div>
              <h1 id="noMatchText" className="text-3xl">
                Sorry! No Items Matched Your Search :(
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
