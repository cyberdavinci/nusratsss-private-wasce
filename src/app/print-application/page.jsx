import React from "react";
import PrintPage from "@/components/PrintPage/PrintPage";
import connect from "@/utils/db";
import User from "@/models/User";

const page = ({ student }) => {
  // console.log(student);
  return <PrintPage />;
};

export default page;
