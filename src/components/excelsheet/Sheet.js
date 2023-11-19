import { Button } from "@nextui-org/react";
import { PlusIcon } from "../tables/PlusIcon";
import React, { useState } from "react";
import { read, utils, writeFileXLSX } from "xlsx";
export const ExportExcelButton = ({ data, selectedSubs }) => {
  const subs = Array.from(selectedSubs);
  const newData = () => {
    // well... that's that.
    /*
    subjects are in an array and when we export the json data some how the subjects column in our sheet returns empty, so I decided to convert the array to string first, then remove all keys in object that are irrelivant
    */
    //  const subs = ar
    const subjectsArrayToString = data?.map((element) => {
      const filteredElement = Object?.keys(element)
        .filter((key) => key !== "_id" && key !== "route" && key !== "status")
        .reduce((obj, key) => {
          obj[key] = element[key];
          return obj;
        }, {});
      return { ...filteredElement, subjects: subs?.toString()?.toUpperCase() };
    });
    // const finalData = subjectsArrayToString.filter()
    // console.log(subjectsArrayToString);
    return subjectsArrayToString;
  };
  //   console.log(newData());
  const exportExcel = React.useCallback(() => {
    const ws = utils.json_to_sheet(newData());
    const wb = utils.book_new();

    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, "privateStudentsList.xlsx");
  }, [newData()]);
  return (
    <Button
      color="success"
      variant="flat"
      onClick={exportExcel}
      endContent={<PlusIcon />}
    >
      Export Excel
    </Button>
  );
};
