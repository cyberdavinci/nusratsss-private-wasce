"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const session = useSession();
  return (
    <div className="flex justify-between items-center h-[100px] ">
      <Link href={"/"}>TOKENZ</Link>
      <div className="flex items-center gap-5">
        <Link
          href={"/"}
          className=" font-semibold hover:border-t-2 hover:pt-[-1px] hover:text-emerald-600 "
        >
          Home
        </Link>
        <Link
          href={"/subjects"}
          className=" font-semibold hover:border-t-2 hover:pt-[-1px] hover:text-emerald-600 "
        >
          Subjects
        </Link>
        <Link
          href={"/profile"}
          className=" font-semibold hover:border-t-2 hover:pt-[-1px] hover:text-emerald-600 "
        >
          Profile
        </Link>
        {/* {session.status === "authenticated" &&
        session.data?.user.role === "admin" ? ( */}
        <Link
          href={"/dashboard"}
          className=" font-semibold hover:border-t-2 hover:pt-[-1px] hover:text-emerald-600 "
        >
          Dashboard
        </Link>
        {/* // ) : null} */}
        {session.status === "authenticated" ? (
          <button
            onClick={signOut}
            className="bg-[#7CC190] w-fit px-4 py-1 rounded text-gray-800  font-semibold"
          >
            Logout
          </button>
        ) : session.status === "unauthenticated" ? (
          <Link href={"/login"}>
            <button className="bg-[#7CC190] w-fit px-4 py-1 rounded text-gray-800  font-semibold">
              Login
            </button>
          </Link>
        ) : (
          <h1>Loading....</h1>
        )}
      </div>
    </div>
  );
};

export default Navbar;
