"use client";
import React, { useState } from "react";
import TokensTab from "@/components/dashboard/tokens/TokensTab";
import { Input, Button } from "@nextui-org/react";
import useSWR, { useSWRConfig } from "swr";

const fetcher = (...args) =>
  fetch(...args).then(async (res) => await res.json());
const Tokens = () => {
  const [isGeneratingTokens, setIsGeneratingTokens] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all");
  const { mutate, cache } = useSWRConfig();

  const { data, isLoading, isError } = useSWR(
    `http://localhost:3000/api/tokens?filter=${selectedTab}`,
    fetcher,
    {
      keepPreviousData: true,
    }
  );
  mutate(selectedTab);
  console.log(isLoading ? "Loading" : data);

  const generateToken = async (event) => {
    event.preventDefault();
    const numberOfTokens = event.target[0].value;
    try {
      setIsGeneratingTokens((prev) => !prev);
      const res = await fetch(`http://localhost:3000/api/tokens`, {
        method: "POST",
        body: JSON.stringify({ numberOfTokens }),
        headers: { "Content-Type": "application/json" },
      });

      console.log(res);
      setIsGeneratingTokens((prev) => !prev);
      // mutate(res.status);
    } catch (error) {
      setIsGeneratingTokens((prev) => false);
    }

    // console.log(`${numberOfTokens} token will be generated!`);
  };
  return (
    <div className="flex justify-between flex-wrap gap-3 flex-col">
      <form
        className="flex gap-2 "
        onSubmit={async (event) => {
          await generateToken(event);
          await mutate(
            `http://localhost:3000/api/tokens?filter=${selectedTab}`
          );
        }}
      >
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
          type="submit"
          // onClick={async (event) => {
          //   await generateToken(event);
          //   await mutate(
          //     `http://localhost:3000/api/tokens?filter=${selectedTab}`
          //   );
          // }}
        >
          Generate Tokens
        </Button>
      </form>
      <div className="">
        <TokensTab
          tokens={data}
          isLoading={isLoading}
          isError={isError}
          isGeneratingTokens={isGeneratingTokens}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </div>
    </div>
  );
};

export default Tokens;
