"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";
const Preview = ({
  info,
  currentForm,
  finishRegistration,
  handlePrevious,
  isLoading,
}) => {
  const session = useSession();
  if (session.status === "loading") {
    return <h1>Loading please wait...</h1>;
  }
  return (
    <div
      className={`preview flex  flex-col items-center justify-center h-full w-full `}
    >
      <div>
        <h1 className=" text-center font-bold md:text-2xl text-xl ">
          Confirm your details before clicking on finish please.
        </h1>
      </div>
      <div className="preview-inner flex mt-6 flex-wrap  font-bold gap-6 w-full items-center m-[0 auto]">
        {/* Personal */}
        <div className="card-outer shadow-lg p-3">
          <div className="card-header flex gap-2 items-center  w-[300px]">
            <span className="w-[50px] h-[50px] rounded-full bg-gray-900 flex items-center justify-center">
              1
            </span>
            <h1 className=" text-xl font-extrabold  text-green-600">
              Personal Info
            </h1>
          </div>
          <div className="card flex flex-col gap-5">
            <div>
              <p> Name:</p> <span> {session.data?.user?.name}</span>
            </div>
            <div>
              <p>Address:</p> <span> {info.address}</span>
            </div>
            <div>
              <p>Gender:</p> <span> {info.gender}</span>
            </div>
            <div>
              <p>Date of Birth:</p> <span> {info.date_of_birth}</span>
            </div>
            <div>
              <p>Nationality:</p> <span> {info.nationality} </span>
            </div>
            <div>
              <p>Ethnicity:</p> <span> {info.ethnicity} </span>
            </div>
            <div>
              <p>Mobile:</p> <span> {info.mobile}</span>
            </div>
            <div>
              <p>Marital Status:</p> <span> {info.marital_status}</span>
            </div>
          </div>
        </div>
        {/* Education */}
        <div className="card-outer shadow-lg p-3 ">
          <div className="card-header flex gap-2 items-center  w-[300px]">
            <span className="w-[50px] h-[50px] rounded-full bg-gray-900 flex items-center justify-center">
              2
            </span>
            <h1 className=" text-xl font-extrabold uppercase text-green-600">
              Education
            </h1>
          </div>
          <div className="card flex flex-col gap-5">
            <div>
              <p>Highest Level of Education:</p>
              <span> {info.highest_level_of_education}</span>
            </div>
            <div>
              <p> Year of Completion:</p>{" "}
              <span> {info.year_of_completion}</span>
            </div>
            <div>
              <p> Duration of Study:</p> <span>{info.duration_of_study}</span>
            </div>
            <div>
              <p>Occupation:</p> <span>{info.occupation}</span>
            </div>
          </div>
        </div>
        {/* Family Info */}
        <div className="card-outer p-3">
          <div className="card-header flex gap-2 items-center  w-[300px]">
            <span className="w-[50px] h-[50px] rounded-full bg-gray-900 flex items-center justify-center">
              3
            </span>
            <h1 className=" text-xl font-extrabold uppercase text-green-600">
              Family Info
            </h1>
          </div>
          <div className="card flex flex-col gap-5">
            <div>
              <p>Parent or Guardian Name:</p>{" "}
              <span>{info.parent_guardian_name}</span>
            </div>
            <div>
              <p>Relationship to Applicant:</p>
              <span>{info.relationship_to_applicant}</span>
            </div>
            <div>
              <p>Contact of Parent:</p> <span>{info.contact_of_parent}</span>
            </div>
            <div>
              <p>Nationality of Parent:</p>{" "}
              <span>{info.nationality_of_parent}</span>
            </div>
            <div>
              <p>Parent or Guardian Name:</p>{" "}
              <span>{info.parent_guardian_name_2}</span>
            </div>
            <div>
              <p>Relationship to Applicant:</p>
              <span>{info.relationship_to_applicant_2}</span>
            </div>
            <div>
              <p>Contact of Parent:</p> <span>{info.contact_of_parent_2}</span>
            </div>
            <div>
              <p>Nationality of Parent:</p>{" "}
              <span>{info.nationality_of_parent_2}</span>
            </div>
          </div>
        </div>
        {/*  Family Info 2*/}
        <div className="card-outer shadow-lg p-3 ">
          <div className="card-header flex gap-2 items-center  w-[300px]">
            <span className="w-[50px] h-[50px] rounded-full bg-gray-900 flex items-center justify-center">
              4
            </span>
            <h1 className=" text-xl font-extrabold uppercase text-green-600">
              Family Info 2
            </h1>
          </div>
          <div className="card flex flex-col gap-5">
            <div>
              <p>Parent or Guardian Name:</p>{" "}
              <span>{info.parent_guardian_name_2}</span>
            </div>
            <div>
              <p>Relationship to Applicant:</p>
              <span>{info.relationship_to_applicant_2}</span>
            </div>
            <div>
              <p>Contact of Parent:</p> <span>{info.contact_of_parent_2}</span>
            </div>
            <div>
              <p>Nationality of Parent:</p>{" "}
              <span>{info.nationality_of_parent_2}</span>
            </div>
          </div>
        </div>
        {/* Subjects selected */}
        <div className="card-outer shadow-lg p-3 ">
          <div className="card-header flex gap-2 items-center  w-[300px]">
            <span className="w-[50px] h-[50px] rounded-full bg-gray-900 flex items-center justify-center">
              5
            </span>
            <h1 className=" text-xl font-extrabold uppercase text-green-600">
              Subjects Selected
            </h1>
          </div>
          <div className="card flex flex-col gap-5">
            <ul>
              {info?.subjects?.map((subject, index) => (
                <li className="text-lg  text-[#bbb]" key={index}>
                  {subject}
                </li>
              ))}
            </ul>
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
          disabled={isLoading}
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
          isLoading={isLoading}
        >
          {isLoading ? "uploading data..." : "  Finish"}
        </Button>
      </div>
    </div>
  );
};

export default Preview;
