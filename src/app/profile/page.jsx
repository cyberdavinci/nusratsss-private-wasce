"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Profile = () => {
  const [load, setLoad] = useState(false);
  const session = useSession();
  const router = useRouter();
  if (session.status === "unauthenticated") router.push("/login");
  if (session.status === "authenticated" && session.data?.user?.token === 0)
    router.push("/verify-token");
  if (session.status === "loading") return <h1>Loading...</h1>;
  return (
    <div>
      <h1>Profile Page. you can now select your subjects</h1>
    </div>
  );
};

export default Profile;
