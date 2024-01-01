"use client";
import React, { useContext, useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import UserAvatar from "@/components/dashboard/UserAvatar";
import { MainContextProvider } from "@/context/ContextProvider";
import { HiMenuAlt2 } from "react-icons/hi";
import { Spinner } from "@nextui-org/react";

const Layout = ({ children }) => {
  const router = useRouter();
  const { toggleNav, expand, setExpand } = useContext(MainContextProvider);
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();
  useEffect(() => {
    if (session.status === "unauthenticated") router.replace("/login");
    if (session.data?.user?.role === "student")
      router.replace("/dashboard/account");
  }, [router, session.status, session.data?.user?.role, expand]);

  //
  useEffect(() => {
    // setExpand(false);
  }, [expand]);
  if (session.status === "loading" || session.status === "unauthenticated")
    return (
      <div className="w-full h-full flex items-center justify-center font-extrabold text-xl">
        <Spinner label="loading..." color="success" />
        {/* <h1>Loading...</h1> */}
      </div>
    );
  return (
    <div className="dLayout  flex-2 w-full  shadow-2xl mx-auto min-h-screen md:w-[80%] mt-[20px] md:p-[10px] md:float-right px-3">
      {/* bg-[#16181A] */}
      <div className="md:ml-[20px]  avatarWrapper p-4 rounded-full ">
        <div className="flex justify-between items-center">
          <button
            className=" p-1.5 rounded-lg text-white font-extrabold hover:text-green-800 ml-3 overflow-hidden md:hidden md:w-0 block w-auto"
            onClick={() => setExpand(() => true)}
          >
            {/* {!expand ? ( */}
            <HiMenuAlt2 size={20} className="font-semibold" />
            {/* ) : null} */}
          </button>
          <span className="font-semibold md:text-lg text-sm text-center">
            Welcome back {session?.data?.user?.name?.split(" ")[0]}
          </span>
          <UserAvatar />
        </div>
      </div>
      {/* <Divider className="my-4 text-[10px]" /> */}
      {/* <hr className="my-4 h-[1px] bg-gray-800" /> */}
      <div className="mt-6 md:mx-auto md:ml-[10px]  p-4">{children}</div>
    </div>
  );
};

export default Layout;
