"use client";
import React from "react";
import { Triangle } from "react-loader-spinner";

const MyLoader = () => {
  return (
    <div className="w-full flex flex-1 items-center justify-center flex-col">
      <Triangle
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
      <h1 className=" font-extrabold text-[#4fa94d]">Loading...</h1>
    </div>
  );
};

export default MyLoader;
