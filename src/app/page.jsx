// import Image from "next/image";
// "use client";
import Hero from "public/studies.svg";
import Image from "next/image";
import styles from "./page.module.css";
// import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
// import Register from "@/components/Register/Register";
import { useSession } from "next-auth/react";
import HomeButtons from "@/components/dashboard/home/HomeButtons";
// import { Button } from "@nextui-org/react";
export default async function Home() {
  const session = await getServerSession(authOptions);
  // const session = useSession();
  return (
    <div className="flex items-center justify-between h-full">
      <div className="flex flex-col gap-8 flex-1">
        <h1 className={`${styles.title} font-bold text-7xl leading-12`}>
          Welcome to TOKENZ
        </h1>
        <p className=" font-semibold text-xl leading-8">
          "Empowering Tomorrow's Leaders: Your Comprehensive Study Center for
          WASSCE Success - Where We Provide the Tools, Guidance, and Support to
          Help You Excel in the WASSCE , So You Can Achieve Your Academic Dreams
          and Unlock a World of Opportunities."
        </p>
        {!session ? <HomeButtons /> : null}
      </div>
      {/* <Register /> */}
      <div className="flex-1">
        <Image
          src={Hero}
          className={styles.costum_animation}
          alt="home banner image"
        />
      </div>
    </div>
  );
}
