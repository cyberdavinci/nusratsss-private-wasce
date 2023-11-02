"use client";
import React, { useContext, useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import UserAvatar from "@/components/dashboard/UserAvatar";
import { MainContextProvider } from "@/context/ContextProvider";
import { RiMenuUnfoldLine } from "react-icons/ri";

const Layout = ({ children }) => {
  const router = useRouter();
  const { toggleNav, expand, setExpand } = useContext(MainContextProvider);
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();
  useEffect(() => {
    if (session.status === "unauthenticated") router.replace("/login");
    if (session.data?.user?.role === "student")
      router.replace("/dashboard/account");

    // session.data?.user?.registrationStatus === "incomplete"
    //   ? router.replace(`/complete-registration`)
    //   : null;
  }, [
    router,
    session.status,
    session.data?.user?.role,
    expand,
    // session.data?.user?.registrationStatus,
  ]);
  useEffect(() => {
    // setExpand(false);
  }, [expand]);
  if (session.status === "loading")
    return (
      <div className="w-full h-full flex items-center justify-center font-extrabold text-xl">
        <h1>Loading...</h1>
      </div>
    );
  return (
    <div className=" p-4 w-full md:ml-[85px]">
      <div className=" w-full h-10 ">
        <div className="flex md:w-full justify-between md:float-right">
          <button
            className="p-1.5 rounded-lg text-white font-extrabold hover:text-green-800 ml-3"
            onClick={() => setExpand(() => true)}
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
