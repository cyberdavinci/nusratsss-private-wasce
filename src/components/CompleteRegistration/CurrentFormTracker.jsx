"use client";
import React from "react";

const CurrentFormTracker = ({ currentForm }) => {
  //   const trackerList = Array.from({ length: 5 });
  //   console.log(trackerList);
  //   bg-white bg-green-600 bg-blue-700
  const currentBg = (current) => {
    if (currentForm < current) {
      return "bg-white";
    }
    if (currentForm === current) {
      return "bg-blue-700";
    }
    if (currentForm > current) {
      return "bg-green-600";
    }
  };
  return (
    <div>
      <ol className="flex gap-2 flex-wrap my-4 text-slate-400">
        {[1, 2, 3, 4, 5].map((current) => (
          <li
            className={` text-lg  ${currentBg(
              current
            )}  w-[40px] h-[40px] rounded-full flex items-center justify-center p-2`}
            key={current}
          >
            {current}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default CurrentFormTracker;
