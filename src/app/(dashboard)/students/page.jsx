import React from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
import StudentTable from "@/components/tables/StudentTable";

const Students = async () => {
  return (
    <div className="mt-[30px]">
      <StudentTable />
    </div>
  );
};

export default Students;
