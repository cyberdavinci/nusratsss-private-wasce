// "use client";
import Image from "next/image";
import React from "react";
import MyCard from "@/components/dashboard/home/Card";
import { PiStudentDuotone } from "react-icons/pi";
import { FaMale, FaFemale } from "react-icons/fa";
import { MdGeneratingTokens } from "react-icons/md";

const Dashboard = () => {
  return (
    <div className="w-full">
      <div className="flex w-full justify-center gap-4 flex-wrap">
        <MyCard
          icon={<MdGeneratingTokens size={30} />}
          text={"Tokens"}
          text2={"3000"}
          bg={"bg-green-600"}
        />
        <MyCard
          icon={<PiStudentDuotone size={30} />}
          text={"Students"}
          text2={"765"}
          bg={"bg-[#16181A]"}
        />
        <MyCard
          icon={<FaMale size={30} />}
          text={"Male"}
          text2={"342"}
          bg={"bg-[#0072F5]"}
        />
        <MyCard
          icon={<FaFemale size={30} />}
          text={"Female"}
          text2={"368"}
          bg={"bg-[#17C964]"}
        />
      </div>
    </div>
  );
};

export default Dashboard;
