"use client";
import React, { useRef, useState } from "react";
import TokensTab from "@/components/dashboard/tokens/TokensTab";
import { Input, Button } from "@nextui-org/react";
import useSWR, { useSWRConfig } from "swr";
import { useReactToPrint } from "react-to-print";

const fetcher = (...args) =>
  fetch(...args).then(async (res) => await res.json());

const Tokens = () => {
  const [isGeneratingTokens, setIsGeneratingTokens] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all");
  const [beforePrintBgColor, setBeforePrintBgColor] = useState("black");
  const { mutate, cache } = useSWRConfig();

  const { data, isLoading, isError } = useSWR(
    `/api/tokens?filter=${selectedTab}`,
    fetcher,
    {
      keepPreviousData: true,
    }
  );
  mutate(selectedTab);
  // console.log(isLoading ? "Loading" : data);

  const generateToken = async (event) => {
    event.preventDefault();
    const numberOfTokens = event.target[0].value;
    setIsGeneratingTokens((prev) => true);
    try {
      const res = await fetch(`/api/tokens`, {
        method: "POST",
        body: JSON.stringify({ numberOfTokens }),
        headers: { "Content-Type": "application/json" },
      });

      // console.log(res);
      setIsGeneratingTokens((prev) => false);
      // mutate(res.status);
    } catch (error) {
      setIsGeneratingTokens((prev) => false);
    }
    // console.log(`${numberOfTokens} token will be generated!`);
  };

  const componentRef = useRef();
  const handleDownload = useReactToPrint({
    content: () => componentRef?.current,
    documentTitle: "tokens",
    onAfterPrint: () => setBeforePrintBgColor("black"),
    onBeforePrint: () => setBeforePrintBgColor("white"),
  });
  return (
    <div className="flex justify-between flex-wrap gap-3 flex-col overflow-hidden">
      <form
        className="flex gap-2 flex-wrap w-full"
        onSubmit={async (event) => {
          await generateToken(event);
          await mutate(`/api/tokens?filter=${selectedTab}`);
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
          color="success"
          variant="ghost"
          className="px-4 md:w-[200px] w-full"
          type="submit"
          isLoading={isGeneratingTokens}

          // onClick={async (event) => {
          //   await generateToken(event);
          //   await mutate(
          //     `http://localhost:3000/api/tokens?filter=${selectedTab}`
          //   );
          // }}
        >
          {isGeneratingTokens ? "Generating tokens..." : " Generate Tokens"}
        </Button>
        <Button
          color="success"
          variant="flat"
          className="px-4 md:w-[200px] w-full"
          onClick={() => handleDownload()}
        >
          Export Tokens to PDF
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
          componentRef={componentRef}
          handleDownload={handleDownload}
          beforePrintBgColor={beforePrintBgColor}
          setBeforePrintBgColor={setBeforePrintBgColor}
        />
      </div>
    </div>
  );
};

export default Tokens;
