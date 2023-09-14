"use client";
import React, { useEffect, useState } from "react";
import styles from "./dashboardNav.module.css";
import Link from "next/link";
const DashboardNav = () => {
  const [open, setOpen] = useState("");
  //   useEffect(() => {}, [open]);
  const links = [
    {
      customS: {
        "--i": 1,
      },
      name: "H",
    },
    {
      customS: {
        "--i": 2,
      },
      name: "S",
    },
    {
      customS: {
        "--i": 3,
      },
      name: "T",
    },
    {
      customS: {
        "--i": 4,
      },
      name: "S",
    },
    {
      customS: {
        "--i": 5,
      },
      name: "SJ",
    },
  ];
  const toggleMenu = () => {
    // setOpen((prev) => (prev === "" ? "open" : ""));
    // setOpen("open");
    console.log("open");
    open === "open" ? setOpen("") : setOpen("open");
  };
  return (
    <div>
      <nav className={`${styles.nav} ${open === "open" ? styles.open : null}`}>
        <div className={styles.toggle_btn} onClick={() => toggleMenu()}>
          <i className={`${styles.bx} ${styles.bx_plus}`}>+</i>
        </div>
        {links.map((link, index) => {
          return (
            <div className={styles.nav_content} key={index}>
              <span style={link.customS}>
                <Link href="#">
                  <i>{link.name}</i>
                </Link>
              </span>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default DashboardNav;
