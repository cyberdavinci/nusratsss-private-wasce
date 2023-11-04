// import Image from "next/image";
// "use client";
import Hero from "public/studies.svg";
import Image from "next/image";
import styles from "./page.module.css";
import HomeButtons from "@/components/dashboard/home/HomeButtons";

export default async function Home() {
  return (
    <div className="flex items-center justify-between flex-wrap-reverse h-full p-12">
      <div className="flex flex-col gap-10 flex-1">
        <h1 className={`${styles.title} font-bold text-6xl leading-14`}>
          Welcome to Academia Registration Portal!
        </h1>
        <p className=" font-semibold text-xl leading-8">
          Your easy to use online registration portal for study centers.
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
