"use client";
import Link from "next/link";
import React, { useState } from "react";

const Register = () => {
  const [err, setErr] = useState(false);
  const [errMsg, setErroMsg] = useState("");

  const handleSubmit = (e) => {};
  return (
    <div className="flex flex-col items-center flex-1">
      <h1 className=" text-4xl font-extrabold p-3">Register</h1>

      <span className="text-[#ff261b] pb-2 font-semibold">{errMsg}</span>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none"
          placeholder="full name"
          required
        />
        <input
          type="email"
          className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none"
          placeholder="email"
          required
        />
        <input
          type="password"
          className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none"
          placeholder="password"
          required
        />

        <button className=" bg-teal-700 rounded-md py-3">Register</button>
      </form>

      <Link href={"/login"} className=" mt-4 text-blue-500">
        Login with existing account.
      </Link>
    </div>
  );
};

export default Register;
