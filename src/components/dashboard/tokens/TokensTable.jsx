"use client";
import React, { useEffect } from "react";
import { read, utils, writeFileXLSX } from "xlsx";
// import useSWR from "swr";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
  Spinner,
  Input,
  Button,
} from "@nextui-org/react";
const statusColorMap = {
  all: "primary",
  used: "danger",
  unused: "success",
};

const TokensTable = ({
  selectedTab,
  tokens,
  isLoading,
  isError,
  isGeneratingTokens,
  // handleDownload,
  componentRef,
  // beforePrintBgColor,
  mutate,
  filteredTokens,
  generateToken,
}) => {
  const [tokensToExport, setTokensToExport] = React.useState(1);

  const filteredData = React.useMemo(() => {
    const filteredTokens =
      tokensToExport === 1 ? tokens : tokens?.slice(0, tokensToExport);
    // console.log(filteredTokens);

    return filteredTokens;
  }, [tokensToExport]);
  // console.log(filteredData);
  const exportExcel = React.useCallback(() => {
    const ws = utils.json_to_sheet(filteredData);
    const wb = utils.book_new();

    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, "tokens.xlsx");
  }, [filteredData, tokensToExport]);

  // console.log(tokens);
  // please do not ask why does case values
  // just print out the column key you will undertand
  // Note: according to nextui docs on table the column key was supposed to be used to render different rows of different styles but not sure why its giving me does wierd values
  const renderCell = React.useCallback((token, columnKey) => {
    const createdAt = new Date(token["createdAt"]);
    switch (columnKey) {
      case "$.0":
        return <p>{token["token"]}</p>;
      case "$.1":
        return (
          <Chip
            radius="sm"
            className="capitalize"
            color={statusColorMap[selectedTab]}
            size="lg"
            variant="flat"
          >
            {selectedTab}
          </Chip>
        );
      // case "$.2":
      //   return <p>{createdAt.toLocaleString()}</p>;
      default:
        return cellValue;
    }
  }, []);
  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl", "shadow-xl", "bg-none"],
      th: ["text-default-500", "shadow-2xl"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );

  return (
    <div className=" overflow-x-auto " ref={componentRef}>
      <Table
        isCompact
        // removeWrapper
        aria-label="Example table with custom cells, pagination and sorting"
        // align="right"
        classNames={classNames}
        // classNames
        // isHeaderSticky
        bottomContentPlacement="outside"
        topContentPlacement="outside"
        layout="auto"
        // isStriped
        topContent={
          selectedTab === "all" ? (
            <form
              className="flex gap-2 flex-wrap w-full"
              onSubmit={async (event) => {
                await generateToken(event);
                // await mutate(`/api/tokens?filter=${selectedTab}`);
                await mutate(`/api/tokens`);
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
              >
                {isGeneratingTokens
                  ? "Generating tokens..."
                  : " Generate Tokens"}
              </Button>
            </form>
          ) : (
            <div className="flex justify-end gap-2 w-full ">
              <Input
                className=""
                type="number"
                max={500}
                min={50}
                value={tokensToExport}
                placeholder={"number of tokens to export"}
                onChange={(e) => setTokensToExport(e.target.value)}
              />
              <Button
                color="success"
                variant="flat"
                className="px-4 "
                type="submit"
                onClick={exportExcel}
              >
                Export
              </Button>
            </div>
          )
        }
      >
        <TableHeader>
          <TableColumn>TOKEN</TableColumn>
          <TableColumn>STATUS</TableColumn>
          {/* <TableColumn>DATE</TableColumn> */}
          {/* <TableColumn>USED By</TableColumn> */}
        </TableHeader>
        <TableBody
          items={filteredTokens ? filteredTokens : []}
          emptyContent={"No tokens found."}
          isLoading={isLoading}
          loadingContent={
            <Spinner
              size="lg"
              labelColor="primary"
              color="primary"
              label="loading tokens..."
            />
          }
        >
          {(item) => {
            // console.log(item);
            return (
              <TableRow key={item?._id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
    </div>
  );
};

export default TokensTable;
