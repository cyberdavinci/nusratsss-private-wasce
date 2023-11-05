import React from "react";
import VerifyEmail from "./VerifyEmail";
import ConfirmResetPin from "./ConfirmResetPin";
import ResetPassword from "./ResetPassword";

const CurrentStep = ({ resetStep, setResetStep }) => {
  switch (resetStep) {
    case "email":
      return <VerifyEmail resetStep={resetStep} setResetStep={setResetStep} />;
    case "pin":
      return (
        <ConfirmResetPin resetStep={resetStep} setResetStep={setResetStep} />
      );
    case "reset":
      return (
        <ResetPassword resetStep={resetStep} setResetStep={setResetStep} />
      );

    default:
      break;
  }
};

export default CurrentStep;
