"use client";
import React, { useEffect, useState } from "react";
// import styles from "./page.module.css";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Avatar } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import Link from "next/link";
// import DashNav from "@/components/dashboardNav/DashNav";
const Layout = ({ children }) => {
  const router = useRouter();
  // console.log(router);
  const currentRoute = usePathname();
  const session = useSession();
  useEffect(() => {
    if (session.status === "unauthenticated") router.replace("/login");
  }, [router, session.state]);
  return (
    <div className=" p-4 ">
      <div className=" w-full h-10 ">
        <div className="float-right">
          <Avatar
            name="Joe"
            src="https://images.unsplash.com/broken"
            radius="full"
            isBordered
            showFallback
            className={{ base: "float-right" }}
          />
        </div>
      </div>
      {/* <Divider className="my-4 text-[10px]" /> */}
      <hr className="my-4 h-[1px] bg-gray-800" />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
