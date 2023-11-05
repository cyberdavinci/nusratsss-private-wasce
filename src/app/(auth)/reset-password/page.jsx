"use client";

import React from "react";

import CurrentStep from "@/components/Auth/resetPassword/CurrentStep";

const ResetPassword = () => {
  // const session = useSession();
  const [resetStep, setResetStep] = React.useState("email");

  return <CurrentStep resetStep={resetStep} setResetStep={setResetStep} />;
};

export default ResetPassword;
