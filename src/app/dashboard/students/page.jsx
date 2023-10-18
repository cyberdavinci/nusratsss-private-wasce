import React from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import StudentTable from "@/components/tables/StudentTable";
import MyTable from "@/components/tables/Table";

const Students = async () => {
  return (
    <div className="mt-[30px]">
      {/* <StudentTable /> */}
      <MyTable />
    </div>
  );
};

export default Students;
