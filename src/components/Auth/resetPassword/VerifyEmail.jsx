"use client";
import React from "react";
const VerifyEmail = ({ resetStep, setResetStep }) => {
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleSubmit = (e) => {
    const email = e.target[0].value;
    setResetStep(() => "pin");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className=" text-4xl font-extrabold p-3">Verify Email</h1>
      <span className="text-[#ff261b] pb-2 font-semibold">{errorMsg}</span>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          label="Email"
          variant="bordered"
          placeholder="Enter email"
          isRequired
          autoComplete={false}
        />

        <Button
          type="submit"
          color="success"
          variant="flat"
          isLoading={loading}
        >
          Submit
        </Button>
      </form>
      {/* {err && <h1 className={styles.errorText}>Something went wrong!</h1>} */}
    </div>
  );
};

export default VerifyEmail;
