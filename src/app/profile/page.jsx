"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import MyLoader from "@/components/Loader/MyLoader";
const Profile = () => {
  const [load, setLoad] = useState(false);
  const session = useSession();
  const router = useRouter();
  if (session.status === "unauthenticated") router.push("/login");

  if (session.status === "loading" || session.data === null)
    return <MyLoader />;
  return (
    <div>
      <h1>Profile Page. you can now select your subjects</h1>
    </div>
  );
};

export default Profile;
