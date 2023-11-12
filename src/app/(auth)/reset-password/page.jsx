"use client";

import React from "react";

import CurrentStep from "@/components/Auth/resetPassword/CurrentStep";

const ResetPassword = () => {
  // const session = useSession();
  const [resetStep, setResetStep] = React.useState("email");
  const [resetPin, setResetPin] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [newPassword, setNewpassword] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const states = {
    resetPin,
    setResetPin,
    email,
    setEmail,
    newPassword,
    setNewpassword,
  };

  const resetPassword = async () => {};

  return (
    <CurrentStep
      resetStep={resetStep}
      setResetStep={setResetStep}
      states={states}
      resetPassword={resetPassword}
      setUser={setUser}
    />
  );
};

export default ResetPassword;
