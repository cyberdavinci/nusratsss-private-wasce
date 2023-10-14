"use client";
import React, { useEffect } from "react";
// import styles from "./page.module.css";
// import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { usePathname } from "next/navigation";
// import { Avatar } from "@nextui-org/react";
import UserAvatar from "@/components/dashboard/UserAvatar";
// import Link from "next/link";
// import DashNav from "@/components/dashboardNav/DashNav";
const Layout = ({ children }) => {
  const router = useRouter();
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
        <div className="float-right">
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
