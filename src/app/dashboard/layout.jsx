"use client";
import React, { useState } from "react";
// import styles from "./page.module.css";
import DashboardNav from "@/components/dashboardNav/DashboardNav";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const layout = ({ children }) => {
  const [open, setOpen] = useState("");
  const router = useRouter();
  const session = useSession();
  const toggleMenu = () => {
    setOpen((prev) => (prev === "" ? "open" : ""));
  };
  return (
    <motion.div className="relative  h-screen">
      {session.status === "loading" ? (
        <h1 className="text-center font-extrabold text-emerald-400 text-3xl">
          Loading please wait
        </h1>
      ) : (
        <div className="">
          <div className=" bg-[#bbb] h-[10rem] text-black rounded-lg">
            <div className="bg-[#1a1a24]  p-9 h-[3rem] ">
              <div className=" w-[60px] h-[60px] rounded-[50%] bg-green-600  flex items-center justify-center">
                <h1 className=" text-2xl font-bold uppercase text-[#bbb]">
                  {session.data?.user?.name[0]}
                </h1>
              </div>
              {/*  */}
              <div className="flex gap-10 font-semibold items-baseline justify-around">
                <div>
                  <p className=" text-2xl text-[#1a1a24]">
                    Welcome back{" "}
                    <span className=" capitalize">
                      {session.data?.user?.name}
                    </span>
                  </p>
                  <p className=" text-xl text-gray-900">
                    {session.data?.user?.role}
                  </p>
                </div>

                <div>
                  <span>Email</span>
                  <p>{session.data?.user?.email}</p>
                </div>
                <div>
                  <p>Current Route</p>
                </div>
              </div>
              {/*  */}
            </div>
            {/*  */}
          </div>
          <div>{children}</div>
        </div>
      )}

      <DashboardNav />
    </motion.div>
  );
};

export default layout;
