"use client";
import React, { useContext, useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import UserAvatar from "@/components/dashboard/UserAvatar";
import { MainContextProvider } from "@/context/ContextProvider";
import { RiMenuUnfoldLine } from "react-icons/ri";
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
  if (session.status === "loading")
    return (
      <div className="w-full h-full flex items-center justify-center font-extrabold text-xl">
        <Spinner label="loading..." color="success" />
        {/* <h1>Loading...</h1> */}
      </div>
    );
  return (
    <div className="dLayout  w-[80%]  h-16  shadow-2xl  self-center mx-auto mt-[20px]">
      {/* bg-[#16181A] */}
      <div className="md:ml-[85px]  avatarWrapper p-4 rounded-full">
        <div className="flex justify-between ">
          <button
            className="p-1.5 rounded-lg text-white font-extrabold hover:text-green-800 ml-3 overflow-hidden"
            onClick={() => setExpand(() => true)}
          >
            {!expand ? <RiMenuUnfoldLine size={25} className="" /> : null}
          </button>
          <UserAvatar />
        </div>
      </div>
      {/* <Divider className="my-4 text-[10px]" /> */}
      {/* <hr className="my-4 h-[1px] bg-gray-800" /> */}
      <div className="  mt-6">{children}</div>
    </div>
  );
};

export default Layout;
