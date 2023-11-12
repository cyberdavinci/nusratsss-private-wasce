import React from "react";
import VerifyEmail from "./VerifyEmail";
import ConfirmResetPin from "./ConfirmResetPin";
import ResetPassword from "./ResetPassword";

const CurrentStep = ({
  resetStep,
  setResetStep,
  states,
  resetPassword,
  setUser,
}) => {
  switch (resetStep) {
    case "email":
      return (
        <VerifyEmail
          resetStep={resetStep}
          setResetStep={setResetStep}
          states={states}
          setUser={setUser}
        />
      );
    case "pin":
      return (
        <ConfirmResetPin
          resetStep={resetStep}
          setResetStep={setResetStep}
          states={states}
        />
      );
    case "reset":
      return (
        <ResetPassword
          resetStep={resetStep}
          setResetStep={setResetStep}
          states={states}
          resetPassword={resetPassword}
        />
      );

    default:
      break;
  }
};

export default CurrentStep;
