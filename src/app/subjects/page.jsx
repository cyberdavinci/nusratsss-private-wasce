import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SubjectsList from "@/components/subjectsList/SubjectsList";
import PrivateWasscePriceList from "@/components/priceLists/nusratsss/PrivateWasscePriceList";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Subjects = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/register?callbackUrl=/subjects");

  return (
    <div>
      <div>
        <PrivateWasscePriceList />
      </div>
      <div>
        <SubjectsList />
      </div>
    </div>
  );
};

export default Subjects;
