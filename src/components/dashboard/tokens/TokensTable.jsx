"use client";
import React from "react";
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
}) => {
  // console.log(tokens);
  // please do not ask why does case values
  // just print out the column key you will undertand
  // Note: according to nextui docs on table the column key was supposed to be used to render different rows of different styles but not sure why its giving me does wierd values
  const renderCell = React.useCallback((token, columnKey) => {
    const createdAt = new Date(token["createdAt"]);
    switch (columnKey) {
      case "$.0":
        return <p>#{token["token"]}</p>;
      case "$.1":
        return (
          <Chip
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

  return (
    <div className=" overflow-x-auto">
      <Table
        isCompact
        removeWrapper
        aria-label="Example table with custom cells, pagination and sorting"
        // align="right"
        classNames={{
          wrapper: "max-h-[382px] overflow-auto",
        }}
        isHeaderSticky
        bottomContentPlacement="outside"
        topContentPlacement="outside"
        layout="auto"
      >
        <TableHeader>
          <TableColumn>TOKEN</TableColumn>
          <TableColumn>STATUS</TableColumn>
          {/* <TableColumn>DATE</TableColumn> */}
          {/* <TableColumn>USED By</TableColumn> */}
        </TableHeader>
        <TableBody
          items={tokens ? tokens : []}
          emptyContent={"No tokens found."}
          isLoading={isLoading || isGeneratingTokens}
          loadingContent={
            <Spinner
              size="lg"
              labelColor="primary"
              color="primary"
              label="Generating tokens..."
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
