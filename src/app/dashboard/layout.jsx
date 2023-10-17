"use client";
import React, { useContext, useEffect } from "react";
// import styles from "./page.module.css";
// import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { usePathname } from "next/navigation";
// import { Avatar } from "@nextui-org/react";
import UserAvatar from "@/components/dashboard/UserAvatar";
import { MainContextProvider } from "@/context/ContextProvider";
import { RiCloseFill, RiMenuUnfoldLine } from "react-icons/ri";
// import Link from "next/link";
// import DashNav from "@/components/dashboardNav/DashNav";
const Layout = ({ children }) => {
  const router = useRouter();
  const { toggleNav, expand } = useContext(MainContextProvider);

  // console.log(router);
  // const currentRoute = usePathname();
  const session = useSession();
  useEffect(() => {
    if (session.status === "unauthenticated") router.replace("/login");
    if (session.data?.user?.role === "student")
      router.replace("/dashboard/account");
  }, [router, session.status, session.data?.user?.role]);
  if (session.status === "loading")
    return (
      <div className="w-full h-full flex items-center justify-center font-extrabold text-xl">
        <h1>Loading...</h1>
      </div>
    );
  return (
    <div className=" p-4 ">
      <div className=" w-full h-10 ">
        <div className="flex justify-between md:float-right">
          <button
            className="p-1.5 rounded-lg text-indigo-400 hover:text-indigo-600 ml-3 animate-pulse md:hidden block"
            onClick={() => toggleNav()}
          >
            {!expand ? <RiMenuUnfoldLine size={25} className="" /> : null}
          </button>
          <UserAvatar />
        </div>
      </div>
      {/* <Divider className="my-4 text-[10px]" /> */}
      <hr className="my-4 h-[1px] bg-gray-800" />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
