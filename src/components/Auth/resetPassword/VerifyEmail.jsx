"use client";
import React from "react";
import { Input, Button } from "@nextui-org/react";

const VerifyEmail = ({ resetStep, setResetStep, states, setUser }) => {
  const [errorMsg, setErrorMsg] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { email, setEmail } = states;

  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    // console.log(email);
    setEmail((prev) => email);
    setLoading(true);
    try {
      const res = await fetch(`/api/others/verify-user`, {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      // const resJson = await res.json();
      // console.log(res);
      res?.ok
        ? (setResetStep(() => "pin"),
          setUser(() => res.formData),
          setLoading(false))
        : setLoading(false);
    } catch (err) {
      console.log(err);
      err ? setErrorMsg("network error! please refresh.") : null;
      setLoading(false);
      setErrorMsg("email not found!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className=" text-4xl font-extrabold p-3">Verify Email</h1>
      <span className="text-[#ff261b] pb-2 font-semibold">{errorMsg}</span>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          label="Email"
          variant="bordered"
          placeholder="Enter email"
          isRequired
          autoComplete={false}
          type="email"
        />

        <Button
          type="submit"
          color="success"
          variant="flat"
          isLoading={loading}
        >
          {loading ? "verifying user" : "Submit"}
        </Button>
      </form>
      {/* {err && <h1 className={styles.errorText}>Something went wrong!</h1>} */}
    </div>
  );
};

export default VerifyEmail;
