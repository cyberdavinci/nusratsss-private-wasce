"use client";
import { createContext, useState } from "react";

export const MainContextProvider = createContext();
export const ContextProvider = ({ children }) => {
  //   const [mode, setMode] = useState("dark");
  const [expand, setExpand] = useState(false);

  const toggleNav = () => {
    setExpand((prev) => !prev);
  };

  return (
    <MainContextProvider.Provider value={{ toggleNav, expand }}>
      <div>{children}</div>
    </MainContextProvider.Provider>
  );
};
