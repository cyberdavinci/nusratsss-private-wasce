"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input, Button, Spinner } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";

const Login = () => {
  const session = useSession();
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [event, setEvent] = React.useState(null);
  React.useEffect(() => {
    if (session.status === "authenticated") {
      session?.data?.user?.role === "student"
        ? router.push("/dashboard/account")
        : router.push("/dashboard/");
      setLoading((prev) => false);
      event?.target?.reset();
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
      const st = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      setEvent(() => e);
      setErrorMsg(() => st.error);
      st.error ? setLoading((prev) => false) : null;
      // console.log(st);
    } catch (err) {
      setLoading((prev) => false);

      console.log("Error invalid credentials");
    }
  };
  // if (session.status === "authenticated") {
  //   router.push("/dashboard/account");
  // }
  if (session.status === "loading") {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner size="lg" color="success" label="loading page..." />
      </div>
    );
  }
  // console.log(session.data);
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className=" text-4xl font-extrabold p-3">Login</h1>
      <span className="text-[#ff261b] pb-2 font-semibold">{errorMsg}</span>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type="email"
          labelPlacement="outside"
          placeholder="Enter your email"
          className="max-w-xs border-slate-800"
          classNames={{
            inputWrapper: "border-slate-800",
          }}
          variant="bordered"
          label="Email"
          isRequired
        />
        <Input
          classNames={{
            inputWrapper: "border-slate-800",
          }}
          label="Password"
          labelPlacement="outside"
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
          {loading ? "Authenticating..." : "Login"}
        </Button>
      </form>
      {/* {err && <h1 className={styles.errorText}>Something went wrong!</h1>} */}
      <Link href={"/reset-password"} className=" mt-4 text-blue-500">
        {"Reset Password?"}
      </Link>
      <Link href={"/register"} className=" mt-4 text-blue-500">
        {"Don't have an account?"}
      </Link>
    </div>
  );
};

export default Login;
