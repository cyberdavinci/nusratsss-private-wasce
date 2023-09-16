"use client";
import Image from "next/image";
import React from "react";
import { useSession } from "next-auth/react";
const Dashboard = () => {
  const session = useSession();
  return (
    <div className="">
      {/* banner */}

      {/* banner end */}
      <div className="flex gap-5 mt-5">
        <div className=" w-[250px] h-[150px] bg-[#1a1a24] shadow-[ 0 0 20px rgba(0, 0, 0, 0.2)] flex flex-col items-center justify-center rounded-lg">
          <h2>230</h2>
          <p>students</p>
        </div>
        <div className=" w-[250px] h-[150px] bg-[#1a1a24] shadow-[ 0 0 20px rgba(0, 0, 0, 0.2)]  flex flex-col items-center justify-center rounded-lg">
          <h2>150</h2>
          <p>tokens</p>
        </div>
        <div className=" w-[250px] h-[150px] bg-[#1a1a24] shadow-[ 0 0 20px rgba(0, 0, 0, 0.2)] flex flex-col items-center justify-center rounded-lg">
          <h2>100 male</h2>
          <p>students</p>
        </div>
        <div className=" w-[250px] h-[150px] bg-[#1a1a24] shadow-[ 0 0 20px rgba(0, 0, 0, 0.2)] flex flex-col items-center justify-center rounded-lg">
          <h2>130 female</h2>
          <p>students</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
