"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";
const Preview = ({ info, currentForm, finishRegistration, handlePrevious }) => {
  const session = useSession();
  if (session.status === "loading") {
    return <h1>Loading please wait...</h1>;
  }
  return (
    <div
      className={`preview flex flex-wrap flex-col items-center justify-center h-screen`}
    >
      <div>
        <h1 className=" text-center font-bold text-2xl ">
          Confirm your details before clicking on finish please.
        </h1>
      </div>
      <div className="flex mt-6 flex-wrap font-bold gap-6">
        {/* Personal */}
        <div className=" shadow-lg p-3 rounded-md bg-[#1a1a24] w-[300px]">
          <h1 className=" text-xl font-extrabold uppercase">Personal Info</h1>
          <div className="flex flex-col gap-5">
            <p>
              Name: <span> {session.data?.user?.name}</span>{" "}
            </p>
            <p>
              Address: <span> {info.address}</span>
            </p>
            <p>
              Gender: <span> {info.gender}</span>
            </p>
            <p>
              Date of Birth: <span> {info.date_of_birth}</span>
            </p>
            <p>
              Nationality: <span> {info.nationality} </span>
            </p>
            <p>
              Ethnicity: <span> {info.ethnicity} </span>
            </p>
            <p>
              Mobile: <span> {info.mobile}</span>
            </p>
            <p>
              Marital Status: <span> {info.marital_status}</span>
            </p>
          </div>
        </div>
        {/* Education */}
        <div className=" shadow-lg p-3 rounded-md bg-[#1a1a36]">
          <h1 className=" text-xl font-extrabold uppercase">Education</h1>
          <div className="flex flex-col gap-5">
            <p>
              Highest Level of Education:{" "}
              <span> {info.highest_level_of_education}</span>
            </p>
            <p>
              Year of Completion: <span> {info.year_of_completion}</span>
            </p>
            <p>
              Duration of Study: <span>{info.duration_of_study}</span>
            </p>
            <p>
              Occupation: <span>{info.occupation}</span>
            </p>
          </div>
        </div>
        {/* Family Info */}
        <div className=" shadow-lg p-3 rounded-md bg-[#1a1a24]">
          <h1 className=" text-xl font-extrabold uppercase">Family Info</h1>
          <div className="flex flex-col gap-5">
            <p>
              Parent or Guardian Name: <span>{info.parent_guardian_name}</span>
            </p>
            <p>
              Relationship to Applicant:{" "}
              <span>{info.relationship_to_applicant}</span>
            </p>
            <p>
              Contact of Parent: <span>{info.contact_of_parent}</span>
            </p>
            <p>
              Nationality of Parent: <span>{info.nationality_of_parent}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full py-10 gap-4 justify-evenly">
        <Button
          // className={`  ${"bg-teal-700"} rounded-md py-3 md:w-[200px] w-full`}
          onClick={() => handlePrevious()}
          variant="flat"
          color="success"
          size="lg"
        >
          Previous
        </Button>
        <Button
          // className={` bg-teal-700 rounded-md py-3 md:w-[200px] w-full`}
          // disabled={currentForm === 5}
          onClick={async () => {
            await finishRegistration();
          }}
          size="lg"
          variant="flat"
          color="success"
        >
          Finish
        </Button>
      </div>
    </div>
  );
};

export default Preview;
