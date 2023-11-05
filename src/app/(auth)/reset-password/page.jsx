"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import CurrentStep from "@/components/Auth/resetPassword/CurrentStep";

const ResetPassword = () => {
  // const session = useSession();
  const [resetStep, setResetStep] = React.useState("email");

  if (session.status === "loading") {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner size="lg" color="success" label="loading page..." />
      </div>
    );
  }
  return <CurrentStep resetStep={resetStep} setResetStep={setResetStep} />;
};

export default ResetPassword;
