"use client";
import React, { useRef, useState } from "react";
import TokensTab from "@/components/dashboard/tokens/TokensTab";
import useSWR, { useSWRConfig } from "swr";
import { useReactToPrint } from "react-to-print";

const fetcher = (...args) =>
  fetch(...args).then(async (res) => await res.json());

const Tokens = () => {
  const [isGeneratingTokens, setIsGeneratingTokens] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all");
  const [beforePrintBgColor, setBeforePrintBgColor] = useState("black");
  const { mutate, cache } = useSWRConfig();

  const { data, isLoading, isError } = useSWR(`/api/tokens`, fetcher, {
    keepPreviousData: true,
  });

  // const { data, isLoading, isError } = useSWR(
  //   `/api/tokens?filter=${selectedTab}`,
  //   fetcher,
  //   {
  //     keepPreviousData: true,
  //   }
  // );
  // mutate(selectedTab);
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
  const filteredTokens = React.useMemo(() => {
    let filtered = data !== undefined && !isLoading ? [...data] : [];

    if (selectedTab !== "all") {
      filtered = filtered?.filter((token) => token.status === selectedTab);
    }

    return filtered;
  }, [selectedTab, isLoading]);

  const componentRef = useRef();
  const handleDownload = useReactToPrint({
    content: () => componentRef?.current,
    documentTitle: "tokens",
    onAfterPrint: () => setBeforePrintBgColor("black"),
    onBeforePrint: () => setBeforePrintBgColor("white"),
  });
  return (
    <div className="flex justify-between flex-wrap gap-3 flex-col overflow-hidden">
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
          generateToken={generateToken}
          mutate={mutate}
          filteredTokens={filteredTokens}
        />
      </div>
    </div>
  );
};

export default Tokens;
