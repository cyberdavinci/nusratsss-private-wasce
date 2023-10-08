"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
const HomeButtons = () => {
  return (
    <div className="flex gap-4 items-center">
      <Link href="/register">
        <Button variant="flat" color="success" size="lg">
          Register
        </Button>
      </Link>
      <Link href="/login">
        <Button variant="bordered" color="success" size="lg">
          Login
        </Button>
      </Link>
    </div>
  );
};

export default HomeButtons;
