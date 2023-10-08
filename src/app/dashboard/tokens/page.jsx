"use client";
import React, { useState } from "react";
import TokensTab from "@/components/dashboard/tokens/TokensTab";
import { Input, Button } from "@nextui-org/react";
const Tokens = () => {
  // const [tokenAmount, setTokenAmount] = useState(null);
  const generateToken = async (event) => {
    event.preventDefault();
    const numberOfTokens = event.target[0].value;
    console.log(`${numberOfTokens} token will be generated!`);
  };
  return (
    <div className="flex justify-between flex-wrap gap-3 flex-col">
      <form className="flex gap-2 " onSubmit={generateToken}>
        <Input
          type="number"
          placeholder="Number of tokens to generate"
          max={100}
          min={1}
          defaultValue={1}
          variant="bordered"
        />
        <Button
          color="primary"
          variant="ghost"
          className="px-4 w-[200px]"
          type="
        submit"
        >
          Generate Tokens
        </Button>
      </form>
      <div className="">
        <TokensTab />
      </div>
    </div>
  );
};

export default Tokens;
