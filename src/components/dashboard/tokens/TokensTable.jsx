"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
} from "@nextui-org/react";
const statusColorMap = {
  all: "success",
  used: "danger",
  unused: "primary",
};

const TokensTable = ({ selectedTab }) => {
  // console.log(selectedTab);
  return (
    <Table aria-label="Example empty table">
      <TableHeader>
        <TableColumn>TOKEN</TableColumn>
        <TableColumn>STATUS</TableColumn>
        {/* <TableColumn>USED By</TableColumn> */}
      </TableHeader>
      <TableBody emptyContent={"No rows to display."}>
        <TableRow key={"12"}>
          <TableCell>#123</TableCell>
          <TableCell>
            <Chip
              className="capitalize"
              color={statusColorMap[selectedTab]}
              size="lg"
              variant="flat"
            >
              {selectedTab}
            </Chip>
          </TableCell>
          {/* <TableCell>cyber@gmail.com</TableCell> */}
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TokensTable;
