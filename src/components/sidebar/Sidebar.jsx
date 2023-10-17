"use client";
import React, { createContext, useContext, useState } from "react";
import Image from "next/image";
import { FiMoreVertical } from "react-icons/fi";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { MainContextProvider } from "@/context/ContextProvider";
const SideBarContext = createContext();
import { RiMenuFoldLine, RiMenuUnfoldLine, RiCloseFill } from "react-icons/ri";
const Sidebar = ({ children }) => {
  const pathName = usePathname();
  const { toggleNav, expand } = useContext(MainContextProvider);
  // const actualPath = pathName?.replace("/", "");
  // console.log(actualPath);
  // const [expand, setExpand] = useState(false);

  return (
    <aside
      className={` md:translate-x-0 translate-x-[-200px] w-0 md:w-fit transition-all h-screen fixed overflow-hidden float-left ${
        expand ? "w-[180px] translate-x-0" : "w-0 translate-x-[-200px]"
      } z-40`}
    >
      <nav className="h-full flex flex-col bg-black border-r border-slate-800 shadow-sm w-full relative">
        <div className=" pb-2 mb-6 w-full float-right  justify-end text-end">
          {/* <Image
            src={"https://img.logoipsum.com/243.svg"}
            width={300}
            height={300}
            className={` overflow-hidden transition-all ${
              expand ? "w-52" : "w-0"
            }`}
            alt="somesss"
          /> */}
          <button
            className="p-1.5 rounded-lg text-indigo-400 hover:text-indigo-600 ml-3 animate-pulse"
            onClick={() => toggleNav()}
          >
            {expand ? (
              <RiCloseFill size={25} className="text-red-600 font-extrabold" />
            ) : (
              <RiMenuUnfoldLine size={25} className=" hidden md:block" />
            )}
          </button>
        </div>
        <SideBarContext.Provider value={{ expand, pathName }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SideBarContext.Provider>
        <div className="border-t border-slate-800 flex p-3 justify-between ">
          {/* <Image
            src={
              "https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            }
            alt="something..."
            width={50}
            height={50}
            className=" w-10 h-10 rounded-md"
          /> */}
          <p className=" text-center w-12 h-10 rounded-md bg-green-500 font-extrabold text-2xl flex items-center justify-center text-white">
            ET
          </p>
          <div
            className={` flex justify-between items-center  overflow-hidden transition-all ${
              expand ? "w-52 ml-2" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className=" font-semibold">John Doe</h4>
              <span className=" text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <FiMoreVertical size={25} color="#000" />
          </div>
        </div>
      </nav>
    </aside>
  );
};
export function SideBarItem({ icon, text, active, alert, link }) {
  // const session = useSession();
  const { expand, pathName } = useContext(SideBarContext);
  // console.log(pathName);
  return (
    // {routeType ===  ? :}
    <Link href={link}>
      <li
        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors ${
          pathName === link
            ? " bg-green-950 text-green-400"
            : " hover:bg-green text-gray-400"
        }`}
      >
        <Image src={icon} width={25} height={25} alt="some icon" />
        {/* {icon} */}
        <span
          className={`overflow-hidden transition-all ${
            expand ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute  w-2 h-2 rounded bg-indigo-400 ${
              expand ? "" : "top-2"
            }`}
          ></div>
        )}
      </li>
    </Link>
  );
}
export default Sidebar;
