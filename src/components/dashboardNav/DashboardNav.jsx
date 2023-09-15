"use client";
import React, { useEffect, useState } from "react";
import styles from "./dashboardNav.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { PiStudentDuotone } from "react-icons/pi";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import { GiBookshelf } from "react-icons/gi";
import { BiHomeAlt } from "react-icons/bi";
const DashboardNav = () => {
  const [open, setOpen] = useState("open");
  //   useEffect(() => {}, [open]);
  const links = [
    {
      customS: {
        "--i": 1,
      },
      name: "Dashboard",
      icon: <BiHomeAlt />,
      page: "/dashboard",
    },
    {
      customS: {
        "--i": 2,
      },
      name: "Settings",
      icon: <FiSettings />,
      page: "/dashboard/settings",
    },
    {
      customS: {
        "--i": 3,
      },
      name: "Students",
      icon: <PiStudentDuotone />,
      page: "/dashboard/students",
    },
    {
      customS: {
        "--i": 4,
      },
      name: "Tokens",
      icon: <MdOutlineGeneratingTokens />,
      page: "/dashboard/tokens",
    },
    {
      customS: {
        "--i": 5,
      },
      name: "Subjects",
      icon: <GiBookshelf />,
      page: "/dashboard/subjects",
    },
  ];
  const toggleMenu = () => {
    // console.log("open");
    open === "open" ? setOpen("") : setOpen("open");
  };
  return (
    <motion.div
      className=" float-left flex-1"
      drag
      dragConstraints={{
        top: -50,
        left: -50,
        right: 50,
        bottom: 150,
      }}
    >
      <nav className={`${styles.nav} ${open === "open" ? styles.open : null}`}>
        <div className={styles.toggle_btn} onClick={() => toggleMenu()}>
          <RiMenuUnfoldLine />
        </div>
        {links.map((link, index) => {
          return (
            <div className={styles.nav_content} key={index}>
              <span style={link.customS}>
                <Link href={link.page}>
                  <i>
                    {link.icon}
                    {/* {link.name} */}
                  </i>
                  {/* <p> {link.name} </p> */}
                </Link>
              </span>
            </div>
          );
        })}
      </nav>
    </motion.div>
  );
};

export default DashboardNav;
