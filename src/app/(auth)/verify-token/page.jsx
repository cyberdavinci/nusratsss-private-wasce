"use client";
import React from "react";

const VerifyToken = () => {
  const handleSubmit = () => {};
  return (
    <div className="flex flex-col items-center">
      <h1 className=" text-3xl font-extrabold p-3">Registration Token</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="number"
          className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none"
          placeholder="token"
          required
        />
        <button className=" bg-teal-700 rounded-md py-3">
          Finish Registration
        </button>
      </form>
    </div>
  );
};

export default VerifyToken;
