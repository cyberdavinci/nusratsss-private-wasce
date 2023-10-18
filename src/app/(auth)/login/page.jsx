"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";

const Login = () => {
  const session = useSession();
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/dashboard/account");
    }
  }, [session.status, router]);
  const toggleVisibility = () => setIsVisible(!isVisible);
  // console.log(session);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    // console.log(email, password);
    setLoading((prev) => true);
    try {
      await signIn("credentials", { email, password, redirect: false });
      setLoading((prev) => false);
    } catch (err) {
      setLoading((prev) => false);

      console.log(err);
    }
    e.target.reset();
  };
  // if (session.status === "authenticated") {
  //   router.push("/dashboard/account");
  // }
  if (session.status === "loading") {
    return (
      <div className="w-full h-full flex items-center justify-center text-xl font-extrabold">
        <h1>loading...</h1>
      </div>
    );
  }
  // console.log(session.data);
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className=" text-4xl font-extrabold p-3">Login</h1>
      {/* <span>{erroMsg}</span> */}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Enter your email"
          className="max-w-xs"
          variant="bordered"
          label="Email"
          isRequired
        />
        <Input
          label="Password"
          variant="bordered"
          placeholder="Enter your password"
          isRequired
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="max-w-xs"
        />
        <Button
          type="submit"
          color="success"
          variant="flat"
          isLoading={loading}
        >
          Login
        </Button>
      </form>
      {/* {err && <h1 className={styles.errorText}>Something went wrong!</h1>} */}
      <Link href={"/register"} className=" mt-4 text-blue-500">
        {"Don't have an account?"}
      </Link>
    </div>
  );
};

export default Login;
