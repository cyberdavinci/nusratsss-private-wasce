// import Image from "next/image";
// "use client";
import Hero from "public/studies.svg";
import Image from "next/image";
import styles from "./page.module.css";
import HomeButtons from "@/components/dashboard/home/HomeButtons";

export default async function Home() {
  return (
    <div className="flex flex-col justify-between items-center h-screen overflow-x-hidden ">
      <div className="flex items-center justify-between flex-wrap-reverse h-full py-12 px-9 w-full">
        <div className="flex flex-col gap-10 flex-1">
          <h1
            className={`${styles.title} font-bold md:text-6xl text-4xl leading-14`}
          >
            Welcome to Academia Portal!
            <br />
            <span className=" text-3xl">
              Nusrat Private Registration Portal
            </span>
          </h1>
          {/* <p className=" font-semibold text-xl leading-8">
            Your easy to use online registration portal for study centers.
          </p> */}
          <HomeButtons />
        </div>
        {/* <Register /> */}
        <div className="flex-1 hidden md:block">
          <Image
            src={Hero}
            className={`${styles.costum_animation} w-full h-full`}
            alt="home banner image"
          />
        </div>
      </div>
      <footer class="shadow m-0 w-full bg-gray-950 ">
        <div class="w-full mx-auto   p-4 text-center">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="https://faalentech.com/" class="hover:underline">
              Faalen Technologies™
            </a>
            . All Rights Reserved.
          </span>
          {/* <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <HomeButtons />
          </ul> */}
        </div>
      </footer>
    </div>
  );
}
