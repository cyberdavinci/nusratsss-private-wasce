import React from "react";
import SubjectsList from "@/components/subjectsList/SubjectsList";
import PrivateWasscePriceList from "@/components/priceLists/nusratsss/PrivateWasscePriceList";
const Subjects = () => {
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
