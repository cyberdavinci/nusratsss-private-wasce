// import Image from "next/image";
import Hero from "public/studies.svg";
import Image from "next/image";
import styles from "./page.module.css";
export default function Home() {
  return (
    <div className="flex items-center">
      <div className="flex flex-col gap-8 flex-1">
        <h1 className={`${styles.title} font-bold text-7xl`}>
          Welcome to Bah Studies
        </h1>
        <p className=" font-semibold text-xl leading-8">
          "Empowering Tomorrow's Leaders: Your Comprehensive Study Center for
          WASSCE Success - Where We Provide the Tools, Guidance, and Support to
          Help You Excel in the WASSCE , So You Can Achieve Your Academic Dreams
          and Unlock a World of Opportunities."
        </p>
        <button className=" bg-[#7CC190] w-fit px-8 py-3 rounded text-gray-800 font-semibold">
          Register
        </button>
      </div>
      <div className="flex-1">
        <Image src={Hero} className={styles.costum_animation} />
      </div>
    </div>
  );
}
