// import Image from "next/image";
// "use client";
import Hero from "public/studies.svg";
import Image from "next/image";
import styles from "./page.module.css";
import HomeButtons from "@/components/dashboard/home/HomeButtons";

export default async function Home() {
  return (
    <div className="flex items-center justify-between flex-wrap-reverse h-full">
      <div className="flex flex-col gap-8 flex-1">
        <h1 className={`${styles.title} font-bold text-7xl leading-12`}>
          Welcome to Private Wascce Class Portal!
        </h1>
        <p className=" font-semibold text-xl leading-8">
          Your Comprehensive online portal for Private WASSCE study centers.
        </p>
        <HomeButtons />
      </div>
      {/* <Register /> */}
      <div className="flex-1 hidden md:block">
        <Image
          src={Hero}
          className={styles.costum_animation}
          alt="home banner image"
        />
      </div>
    </div>
  );
}
