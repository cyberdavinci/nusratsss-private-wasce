"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
const Navbar = () => {
  //   const session = useSession();
  return (
    <div className="flex justify-between items-center h-[100px]">
      <Link href={"/"}>BAH STUDIES</Link>
      <div className="flex items-center gap-5">
        <Link href={"/"}>Home</Link>
        <Link href={"/subjects"}>Subjects</Link>
        <Link href={"/profile"}>Profile</Link>
        <Link href={"/dashboard"}>Dashboard</Link>
        <button>Login</button>
      </div>
    </div>
  );
};

export default Navbar;
