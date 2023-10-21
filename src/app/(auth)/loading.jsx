"use client";
import React from "react";
import { Spinner } from "@nextui-org/react";
const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner size="lg" color="success" label="loading page..." />
    </div>
  );
};

export default Loading;
