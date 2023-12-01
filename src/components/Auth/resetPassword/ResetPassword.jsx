"use client";
import { EyeFilledIcon } from "@/app/(auth)/login/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/app/(auth)/login/EyeSlashFilledIcon";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const ResetPassword = ({ resetStep, setResetStep, states }) => {
  const router = useRouter();
  const session = useSession();
  const [errorMsg, setErrorMsg] = React.useState("");
  const [isVisible, setIsVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  //

  useEffect(() => {
    session.status === "authenticated" ? router.replace("/") : null;
  }, [session.status]);
  // console.log(session);s
  //
  const { email, resetPin } = states;
  const toggleVisibility = () => setIsVisible(!isVisible);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = e.target[0].value;
    const confirmPassword = e.target[2].value;
    setLoading(true);
    if (password === confirmPassword) {
      try {
        const res = await fetch(`/api/others/reset-password`, {
          method: "POST",
          body: JSON.stringify({ password, resetPin, email }),
        });
        res.ok
          ? await signIn("credentials", {
              email,
              password,
              redirect: false,
              // callbackUrl: () => "/",
            })
          : setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    } else {
      setErrorMsg("error, unmatch passwords");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className=" text-4xl font-extrabold p-3">Reset Password</h1>
      <span className="text-[#ff261b] pb-2 font-semibold">{errorMsg}</span>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          label="Password"
          variant="bordered"
          placeholder="Enter new password"
          isRequired
          autoComplete={false}
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
        <Input
          label="Password"
          variant="bordered"
          placeholder="Confirm your password"
          autoComplete={false}
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
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
      {/* {err && <h1 className={styles.errorText}>Something went wrong!</h1>} */}
    </div>
  );
};

export default ResetPassword;
