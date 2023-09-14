"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const session = useSession();
  const router = useRouter();
  console.log(session);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    // console.log(email, password);
    try {
      await signIn("credentials", { email, password, redirect: false });
    } catch (err) {
      console.log(err);
    }
    e.target.reset();
  };
  if (session.status === "authenticated") {
    router.push("/profile");
  }
  if (session.status === "loading") {
    return <h1>loading...</h1>;
  }
  return (
    <div className="flex flex-col items-center">
      <h1 className=" text-4xl font-extrabold p-3">Login</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none"
          placeholder="email"
          required
        />
        <input
          type="password"
          className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none"
          placeholder="password"
          required
        />
        <button className=" bg-teal-700 rounded-md py-3">Login</button>
      </form>
      {/* {err && <h1 className={styles.errorText}>Something went wrong!</h1>} */}
      <Link href={"/register"} className=" mt-4 text-blue-500">
        Don't have an account?
      </Link>
    </div>
  );
};

export default Login;
