"use client";
import { Input, Button } from "@nextui-org/react";

import React from "react";

const ConfirmResetPin = ({ resetStep, setResetStep }) => {
  const [errorMsg, setErrorMsg] = React.useState("");
  const handleSubmit = (e) => {
    const verificationPin = e.target[0].value;
    setResetStep(() => "reset");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className=" text-4xl font-extrabold p-3">Enter Verification Pin</h1>
      <p>Verification pin has been sent to your email, please</p>
      <span className="text-[#ff261b] pb-2 font-semibold">{errorMsg}</span>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          label="Verification Pin"
          variant="bordered"
          placeholder="Enter verification pin"
          isRequired
          autoComplete={false}
        />

        <Button
          type="submit"
          color="success"
          variant="flat"
          // isLoading={loading}
        >
          Submit
        </Button>
      </form>
      {/* {err && <h1 className={styles.errorText}>Something went wrong!</h1>} */}
    </div>
  );
};

export default ConfirmResetPin;
