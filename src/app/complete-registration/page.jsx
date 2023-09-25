"use client";
import React, { useState } from "react";
import CurrentForm from "@/components/CompleteRegistration/CurrentForm";
import { useSession } from "next-auth/react";

const page = () => {
  const session = useSession();
  const [currentForm, setCurrentForm] = useState(1);
  const [info, setInfo] = useState({
    address: "",
    nationality: "",
    subjects: [],
    date_of_birth: "",
    gender: "",
    ethnicity: "",
    mobile: "",
    highest_level_of_education: "",
    year_of_completion: "",
    duration_of_study: "",
    occupation: "",
    marital_status: "",
    parent_guardian_name: "",
    relationship_to_applicant: "",
    contact_of_parent: "",
    nationality_of_parent: "",
    parent_guardian_name_2: "",
    relationship_to_applicant_2: "",
    contact_of_parent_2: "",
    nationality_of_parent_2: "",
  });

  const handleNext = () => {
    currentForm > 0 ? setCurrentForm((prev) => prev + 1) : null;
    // console.log(currentForm);
  };

  const handlePrevious = () => {
    currentForm !== 0 ? setCurrentForm((prev) => prev - 1) : null;
    // console.log(currentForm);
  };
  const updateSubs = (arr) => {
    setInfo((prev) => ({ ...prev, subjects: [...arr] }));
  };
  const handleInputChange = (event) => {
    setInfo((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const finishRegistration = async () => {
    try {
      const res = await fetch("/api/complete-registration", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...info, _id: session.data?.user?._id }),
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(session.data?.user?._id);

  return (
    <div className="flex flex-col items-center">
      <CurrentForm
        info={info}
        setInfo={setInfo}
        handleInputChange={handleInputChange}
        updateSubs={updateSubs}
        currentForm={currentForm}
      />
      {/* <PersonalInfo
        setInfo={setInfo}
        info={info}
        // handleInputChange={handleInputChange}
      /> */}
      <div className="flex w-full py-10 gap-4 justify-evenly">
        <button
          className={`  ${
            currentForm === 1 ? " bg-slate-400" : "bg-teal-700"
          } rounded-md py-3 md:w-[200px] w-full`}
          disabled={currentForm === 1}
          onClick={() => handlePrevious()}
        >
          Previous
        </button>
        <button
          className={` bg-teal-700 rounded-md py-3 md:w-[200px] w-full`}
          // disabled={currentForm === 5}
          onClick={async () => {
            currentForm === 5 ? await finishRegistration() : handleNext();
          }}
        >
          {currentForm === 5 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default page;
