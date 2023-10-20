"use client";
import { createContext, useState } from "react";
import { usePathname } from "next/navigation";

export const MainContextProvider = createContext();
export const ContextProvider = ({ children }) => {
  const setPathName = usePathname();
  //   const [mode, setMode] = useState("dark");
  const [expand, setExpand] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");
  // const [currentPathName, setPathName] = useState("");

  const toggleNav = () => {
    setExpand(!expand);
  };
  const updateBaseUrlState = (url) => {
    setBaseUrl(() => url);
  };
  return (
    <MainContextProvider.Provider
      value={{
        toggleNav,
        expand,
        setExpand,
        setPathName,
        setPathName,
        updateBaseUrlState,
      }}
    >
      <div>{children}</div>
    </MainContextProvider.Provider>
  );
};
