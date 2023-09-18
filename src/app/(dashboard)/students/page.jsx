"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import StudentTable from "@/components/tables/StudentTable";

const Students = () => {
  const session = useSession();

  return (
    <div className="mt-[30px]">
      <StudentTable student={session.data?.user} />
    </div>
  );
};

export default Students;
