"use client";

const subjects = [
  {
    amount: 4500,
    id: 1,
  },
  {
    amount: 5000,
    id: 2,
  },
  {
    amount: 6500,
    id: 3,
  },
  {
    amount: 7000,
    id: 4,
  },
  {
    amount: 7500,
    id: 5,
  },
  {
    amount: 8000,
    id: 6,
  },
  {
    amount: 8500,
    id: 7,
  },
  {
    amount: 9000,
    id: 8,
  },
];
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export default function SubjectList() {
  return (
    <Table
      isStriped
      aria-label="Example static collection table"
      className=" font-semibold text-xl"
    >
      <TableHeader>
        <TableColumn>Number of Sujects</TableColumn>
        <TableColumn>Amount</TableColumn>
      </TableHeader>
      <TableBody>
        {subjects.map((subject) => {
          return (
            <TableRow key={`${subject.id}`}>
              <TableCell>{subject.id}</TableCell>
              <TableCell>{subject.amount}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
