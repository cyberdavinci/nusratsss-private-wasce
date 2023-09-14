"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
const Register = () => {
  const [err, setErr] = useState(false);
  const [errMsg, setErroMsg] = useState("");
  // const session = useSession();
  // const router = useRouter();
  // console.log(session);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      //clear form inputs
      e.target.reset();
      res.status === 500 && setErroMsg("Error connecting to server!");
      res.status === 201 &&
        (await signIn("credentials", {
          email,
          password,
          redirect: true,
          callbackUrl: "/profile",
        }));
    } catch (err) {
      setErr(true);
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col items-center">
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
