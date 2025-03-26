"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
const HomeButtons = () => {
  const session = useSession();
  const router = useRouter();
  // useEffect(() => {
  //   // console.log;
  // }, [session.status]);
  // console.log(session.status);
  if (session.status === "loading") {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner size="lg" color="success" label="checking status..." />
      </div>
    );
  }
  return (
    <>
      {session.status === "authenticated" ? (
        <div className="flex gap-4 items-center">
          <Button
            variant="flat"
            color="danger"
            size="lg"
            onClick={() => signOut({ redirect: false, callbackUrl: "/" })}
          >
            Logout
          </Button>

          {/* <Link href="/dashboard/account"> */}
          <Button
            variant="bordered"
            color="success"
            size="lg"
            onPress={() => router.push("/dashboard/account")}
          >
            Dashboard
          </Button>
          {/* </Link> */}
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          {/* <Link href="/register"> */}
          <Button
            variant="flat"
            color="success"
            size="lg"
            onPress={() => router.push("/register")}
          >
            Register
          </Button>
          {/* </Link> */}
          {/* <Link href="/login"> */}
          <Button
            variant="bordered"
            color="success"
            size="lg"
            onPress={() => router.push("/login")}
          >
            Login
          </Button>
          {/* </Link> */}
        </div>
      )}
    </>
  );
};

export default HomeButtons;
