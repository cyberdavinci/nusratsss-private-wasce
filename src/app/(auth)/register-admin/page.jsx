"use client";
import React from "react";
import { useRouter } from "next/navigation";

const RegistrationToken = () => {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = e.taret[0].value;
  };
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

export default RegistrationToken;
