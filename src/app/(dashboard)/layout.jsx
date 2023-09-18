"use client";
import React, { useState } from "react";
// import styles from "./page.module.css";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import Link from "next/link";
import DashNav from "@/components/dashboardNav/DashNav";
const Layout = ({ children }) => {
  // const router = useRouter();
  // console.log(router);
  const currentRoute = usePathname();
  const session = useSession();

  return (
    <motion.div className="relative  h-screen">
      {session.status === "loading" ? (
        <h1 className="text-center font-extrabold text-emerald-400 text-3xl">
          Loading please wait
        </h1>
      ) : (
        <div className="">
          <div className=" bg-[#bbb] h-[10rem] text-black rounded-lg">
            <div className="bg-[#1f2937]    h-[4rem] p-3 ">
              <div className="flex justify-around items-center ">
                <div className=" w-[60px] h-[60px] rounded-[50%] bg-green-600  flex items-center justify-center">
                  <h1 className=" text-2xl font-bold uppercase text-[#bbb]">
                    {session.data?.user?.name[0]}
                  </h1>
                </div>
                <div className="flex gap-4 text-[#bbb] text-lg font-semibold">
                  <Link
                    href={"/dashboard"}
                    className="hover:underline hover:text-teal-500"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href={"/students"}
                    className="hover:underline hover:text-teal-500"
                  >
                    Students
                  </Link>
                  <Link
                    href={"/tokens"}
                    className="hover:underline hover:text-teal-500"
                  >
                    Tokens
                  </Link>
                  <Link
                    href={"/subjects-list"}
                    className="hover:underline hover:text-teal-500"
                  >
                    Subject
                  </Link>
                  <Link
                    href={"/settings"}
                    className="hover:underline hover:text-teal-500"
                  >
                    Settings
                  </Link>
                </div>
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
                <div className="text-xl font-extrabold uppercase pt-6">
                  <p>{currentRoute?.replace("/", "")}</p>
                </div>
              </div>
              {/*  */}
            </div>
            {/*  */}
          </div>
          <div>{children}</div>
        </div>
      )}

      {/* <DashboardNav /> */}
    </motion.div>
  );
};

export default Layout;
