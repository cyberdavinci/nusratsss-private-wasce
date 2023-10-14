"use client";
import React from "react";

import { Tabs, Tab } from "@nextui-org/react";
import Image from "next/image";

import TokensTable from "./TokensTable";
// import { Input } from "postcss";

export default function TokensTab({
  tokens,
  isLoading,
  isError,
  isGeneratingTokens,
  selectedTab,
  setSelectedTab,
}) {
  // const [selectedTab, setSelectedTab] = React.useState("all");
  // console.log(selectedTab);
  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        color="primary"
        variant="bordered"
        selectedKey={selectedTab}
        onSelectionChange={setSelectedTab}
      >
        <Tab
          key="all"
          title={
            <div className="flex items-center space-x-2">
              {/* <GalleryIcon/> */}
              {/* <Image
                width={30}
                height={30}
                src={"/icons/account/accsettings.svg"}
              /> */}
              <span>All Tokens</span>
            </div>
          }
        >
          <div>
            <TokensTable
              selectedTab={selectedTab}
              tokens={tokens}
              isLoading={isLoading}
              isError={isError}
              isGeneratingTokens={isGeneratingTokens}
            />
          </div>
        </Tab>

        <Tab
          key="unused"
          title={
            <div className="flex items-center space-x-2">
              {/* <Image
                width={30}
                height={30}
                src={"/icons/account/security.svg"}
              /> */}
              {/* <MusicIcon/> */}
              <span>Unused</span>
            </div>
          }
        >
          <div>
            <TokensTable
              selectedTab={selectedTab}
              tokens={tokens}
              isLoading={isLoading}
              isError={isError}
              isGeneratingTokens={isGeneratingTokens}
            />
          </div>
        </Tab>
        <Tab
          key="used"
          title={
            <div className="flex items-center space-x-2">
              {/* <Image
                width={30}
                height={30}
                src={"/icons/account/security.svg"}
              /> */}
              {/* <MusicIcon/> */}
              <span>Used</span>
            </div>
          }
        >
          <div>
            <TokensTable
              selectedTab={selectedTab}
              tokens={tokens}
              isLoading={isLoading}
              isError={isError}
              isGeneratingTokens={isGeneratingTokens}
              // setSelectedTab={setSelectedTab}
            />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
