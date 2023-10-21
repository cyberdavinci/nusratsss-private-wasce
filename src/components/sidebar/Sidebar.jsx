"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiMoreVertical } from "react-icons/fi";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { MainContextProvider } from "@/context/ContextProvider";
// const SideBarContext = createContext();
import { RiMenuFoldLine, RiMenuUnfoldLine, RiCloseFill } from "react-icons/ri";
const Sidebar = ({ children }) => {
  const { toggleNav, expand, setExpand } = useContext(MainContextProvider);
  const [shortName, setShortName] = useState("");
  const router = useRouter();
  const pathName = usePathname();
  const session = useSession();
  // console.log(router?.basePath);
  React.useEffect(() => {
    const shortNameArray = session?.data
      ? session.data?.user?.name?.split(" ")
      : [];
    const shortName =
      session.status === "authenticated"
        ? `${shortNameArray[0][0]}${
            shortNameArray[1] ? shortNameArray[1][1] : ""
          }`
        : "";

    setShortName(() => shortName);
  }, [router, session.status, pathName]);

  // console.log(shortName[0][0], shortName[1][1]);

  // useEffect(() => {
  //   // setPathName(() => pathName);
  //   setExpand(() => false);
  // }, []);

  return (
    <>
      {session.status === "authenticated" ? (
        <aside
          className={`${
            pathName?.includes("dashboard") ? "block" : "hidden w-0"
          } md:translate-x-0 translate-x-[-200px] w-0 md:w-fit transition-all h-screen fixed  float-left ${
            expand ? "w-[220px] translate-x-[5px]" : "w-0 translate-x-[-200px]"
          } z-40`}
        >
          <nav className="h-full flex flex-col bg-black border-r border-slate-800 shadow-sm w-full relative">
            <div className=" pb-2  w-full float-right  justify-end text-end">
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
                className={`p-1.5 rounded-lg text-indigo-400 hover:text-indigo-600 ml-3 animate-pulse md:absolute`}
                onClick={() => toggleNav()}
              >
                {expand && (
                  <RiCloseFill
                    size={25}
                    className="text-red-600 font-extrabold"
                  />
                )}
              </button>
            </div>
            {/* <SideBarContext.Provider value={{ expand, currentName, toggleNav }}> */}
            <ul className="flex-1 px-3">
              {session?.data?.user?.role === "admin" ? (
                <>
                  <SideBarItem
                    text={"Dashboard"}
                    // icon={<RxDashboard size={25} />}
                    icon={"/icons/sidebar/dashboard.svg"}
                    active={true}
                    link={"/dashboard"}
                    routeType={"admin"}
                  />
                  <SideBarItem
                    text={"Tokens"}
                    // icon={<AiOutlineKey size={25} />}
                    icon={"/icons/sidebar/token.svg"}
                    link={"/dashboard/tokens"}
                    routeType={"admin"}
                  />
                  <SideBarItem
                    text={"Students"}
                    // icon={<PiStudentDuotone size={25} />}
                    icon={"/icons/sidebar/students.svg"}
                    link={"/dashboard/students"}
                    routeType={"admin"}
                  />

                  <SideBarItem
                    text={"Settings"}
                    // icon={<AiOutlineSetting size={25} />}
                    icon={"/icons/sidebar/settings.svg"}
                    link={"/dashboard/settings"}
                    routeType={"admin"}
                  />
                </>
              ) : null}

              <SideBarItem
                text={"Account"}
                // icon={<BiUserCircle size={25} />}
                icon={"/icons/sidebar/user.svg"}
                link={"/dashboard/account"}
                routeType={"student"}
              />
            </ul>
            {/* </SideBarContext.Provider> */}
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
                {shortName}
              </p>
              <div
                className={` flex justify-between items-center  overflow-hidden transition-all ${
                  expand ? "w-52 ml-2" : "w-0"
                }`}
              >
                <div className="leading-4">
                  <h4 className=" font-semibold">{session.data?.user?.name}</h4>
                  <span className=" text-xs text-gray-600">
                    {session.data?.user?.email}
                  </span>
                </div>
                <FiMoreVertical size={25} color="#000" />
              </div>
            </div>
          </nav>
        </aside>
      ) : null}
    </>
  );
};
export function SideBarItem({ icon, text, active, alert, link }) {
  const pathName = usePathname();
  // const session = useSession();
  const { expand, toggleNav, setExpand } = useContext(MainContextProvider);
  // console.log(pathName);
  useEffect(() => {}, [expand, toggleNav]);
  return (
    // {routeType ===  ? :}
    <Link href={link} onClick={() => setExpand(() => false)}>
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
