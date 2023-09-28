"use client";
import React from "react";
import { useSession } from "next-auth/react";
const Preview = ({ info, currentForm, finishRegistration, handlePrevious }) => {
  const session = useSession();
  if (session.status === "loading") {
    return <h1>Loading please wait...</h1>;
  }
  return (
    <div>
      <div>
        <h1 className=" text-center font-bold text-2xl ">
          Confirm your details before clicking on finish please.
        </h1>
      </div>
      <div className="flex mt-6 flex-wrap font-bold gap-6">
        {/* Personal */}
        <div className=" shadow-lg p-3 rounded-md bg-[#1a1a24]">
          <h1 className=" text-xl font-extrabold uppercase">Personal Info</h1>
          <div>
            <p>Name: {session.data?.user?.name}</p>
            <p>Address: {info.address}</p>
            <p>Gender: {info.gender}</p>
            <p>Date of Birth: {info.date_of_birth}</p>
            <p>Nationality: {info.nationality}</p>
            <p>Ethnicity: {info.ethnicity}</p>
            <p>Mobile: {info.mobile}</p>
            <p>Marital Status: {info.marital_status}</p>
          </div>
        </div>
        {/* Education */}
        <div className=" shadow-lg p-3 rounded-md bg-[#1a1a24]">
          <h1 className=" text-xl font-extrabold uppercase">Education</h1>
          <div>
            <p>Highest Level of Education: {info.highest_level_of_education}</p>
            <p>Year of Completion: {info.year_of_completion}</p>
            <p>Duration of Study: {info.duration_of_study}</p>
            <p>Occupation: {info.occupation}</p>
          </div>
        </div>
        {/* Family Info */}
        <div className=" shadow-lg p-3 rounded-md bg-[#1a1a24]">
          <h1 className=" text-xl font-extrabold uppercase">Family Info</h1>
          <div>
            <p>Parent or Guardian Name: {info.parent_guardian_name}</p>
            <p>Relationship to Applicant: {info.relationship_to_applicant}</p>
            <p>Contact of Parent: {info.contact_of_parent}</p>
            <p>Nationality of Parent: {info.nationality_of_parent}</p>
          </div>
        </div>
      </div>

      <div className="flex w-full py-10 gap-4 justify-evenly">
        <button
          className={`  ${"bg-teal-700"} rounded-md py-3 md:w-[200px] w-full`}
          onClick={() => handlePrevious()}
        >
          Previous
        </button>
        <button
          className={` bg-teal-700 rounded-md py-3 md:w-[200px] w-full`}
          // disabled={currentForm === 5}
          onClick={async () => {
            await finishRegistration();
          }}
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default Preview;
