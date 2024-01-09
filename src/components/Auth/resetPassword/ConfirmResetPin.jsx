"use client";
import { Input, Button } from "@nextui-org/react";

import React from "react";
// import sendEmail from "@/utils/mailer";
// import generateToken from "@/utils/generateToken";
const ConfirmResetPin = ({ resetStep, setResetStep, states }) => {
  const { resetPin, setResetPin, email } = states;
  const [errorMsg, setErrorMsg] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationPin = e.target[0].value;
    setResetPin((prev) => verificationPin);
    setLoading(true);
    try {
      const res = await fetch(`/api/others/verify-reset-pin`, {
        method: "POST",
        body: JSON.stringify({ verificationPin }),
      });
      res.ok
        ? (setResetStep(() => "reset"), setLoading(false))
        : (setErrorMsg("invalid reset pin"), setLoading(false));
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const [time, setTime] = React.useState(120);

  React.useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else {
      setIsDisabled(false);
    }
  }, [time]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className=" text-4xl font-extrabold p-3">Enter Verification Pin</h1>
      <p className=" font-semibold text-green-400">
        Verification pin has been sent to your email
      </p>
      <span className="text-[#ff261b] pb-2 font-semibold">{errorMsg}</span>
      <form
        className="flex flex-col gap-4 w-full justify-center items-center"
        onSubmit={handleSubmit}
      >
        <Input
          // label="Verification Pin"
          variant="bordered"
          placeholder="Enter verification pin"
          isRequired
          autoComplete={false}
          className="max-w-[320px]"
          labelPlacement="outside"
          typeof="number"
        />

        <Button
          type="submit"
          color="success"
          variant="flat"
          className="max-w-[320px] min-w-[320px]"
          isLoading={loading}
        >
          Submit
        </Button>
        {/* <div className="flex gap-4 items-center"> */}
        <div>
          <Button
            type="submit"
            // color="success"
            variant="flat"
            className="bg-transparent"
            isDisabled={isDisabled}
            // isLoading={loading}
            onClick={async () => {
              await fetch(`/api/others/verify-user`, {
                method: "POST",
                body: JSON.stringify({ email }),
              });
              setIsDisabled(true);
              setTime(120);
            }}
          >
            Didn't recieve pin
          </Button>
          {time > 0 ? (
            <span className=" text-blue-500 font-semibold cursor-pointer">
              {formatTime(time)}
            </span>
          ) : null}
        </div>
      </form>
      {/* {err && <h1 className={styles.errorText}>Something went wrong!</h1>} */}
    </div>
  );
};

export default ConfirmResetPin;
