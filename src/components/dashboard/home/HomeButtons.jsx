"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
const HomeButtons = () => {
  const session = useSession();
  useEffect(() => {
    // console.log;
  }, [session.status]);

  return (
    <>
      {session.status === "authenticated" ? (
        <div className="flex gap-4 items-center">
          <Link onClick={signOut} href={"/"}>
            <Button variant="flat" color="danger" size="lg">
              Logout
            </Button>
          </Link>
          <Link href="/dashboard/account">
            <Button variant="bordered" color="success" size="lg">
              Dashboard
            </Button>
          </Link>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default HomeButtons;
