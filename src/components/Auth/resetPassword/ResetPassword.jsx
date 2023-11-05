"use client";
import { EyeFilledIcon } from "@/app/(auth)/login/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/app/(auth)/login/EyeSlashFilledIcon";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import React from "react";

const ResetPassword = ({ resetStep, setResetStep }) => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = React.useState("");
  const [isVisible, setIsVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = (e) => {
    const newPassword = e.target[0].value;
    const confirmPassword = e.target[1].value;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
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
