"use client";
import React, { useState } from "react";
// import styles from "./page.module.css";
import DashboardNav from "@/components/dashboardNav/DashboardNav";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const layout = ({ children }) => {
  const [open, setOpen] = useState("");
  const router = useRouter();
  const session = useSession();
  const toggleMenu = () => {
    setOpen((prev) => (prev === "" ? "open" : ""));
  };
  return (
    <motion.div className="relative">
      <DashboardNav />
      <div className=" float-right ">{children}</div>
    </motion.div>
  );
};

export default layout;
