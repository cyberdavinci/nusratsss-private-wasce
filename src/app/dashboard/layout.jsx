"use client";
import React, { useState } from "react";
// import styles from "./page.module.css";
import DashboardNav from "@/components/dashboardNav/DashboardNav";
const layout = ({ children }) => {
  const [open, setOpen] = useState("");
  const toggleMenu = () => {
    setOpen((prev) => (prev === "" ? "open" : ""));
  };
  return (
    <div>
      <DashboardNav open={open} toggleMenu={toggleMenu} />
      {children}
    </div>
  );
};

export default layout;
