"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";
const Preview = ({
  info,
  currentForm,
  finishRegistration,
  handlePrevious,
  loading,
}) => {
  const session = useSession();
  if (session.status === "loading") {
    return <h1>Loading please wait...</h1>;
  }
  return (
    <div className={`preview flex  flex-col justify-between w-full `}>
      <div>
        <h1 className=" text-center font-bold md:text-2xl  ">
          Confirm your details before clicking on finish please.
        </h1>
      </div>
      {/* newer */}
      <div className="flex flex-wrap justify-start w-full mt-10 items-center">
        <ol className="relative border-l border-gray-200 dark:border-gray-700 h-full max-h-[600px] ">
          <li className="mb-10 ml-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Personal Info
            </h3>

            <p>
              <span>Name: </span>
              {session.data?.user?.name}
            </p>
            <p>
              <span>Address: </span>
              {info.address}
            </p>
            <p>
              <span>Gender:</span> {info.gender}
            </p>
            <p>
              <span>D.O.B:</span> {info.date_of_birth}
            </p>
            <p>
              <span>Nationality:</span> {info.nationality}
            </p>
            <p>
              <span>Ethnicity:</span> {info.ethnicity}
            </p>
            <p>
              <span>Phone:</span> {info.mobile}
            </p>
            <p>
              <span>Phone:</span> {info.email}
            </p>
          </li>
          <li className="mb-10 ml-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Education
            </h3>

            <p>
              <span>Level of Education: </span>
              {info.highest_level_of_education}
            </p>
            <p>
              <span>Year completion: </span>
              {info.year_of_completion}
            </p>

            <p>
              <span>Occupation: </span>
              {info.occupation}
            </p>
          </li>
        </ol>
        <ol className="relative border-l border-gray-200 dark:border-gray-700 h-full max-h-[600px] ">
          <li className="mb-10 ml-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Family Info
            </h3>
            <p>
              <span>Parent name: </span> {info.parent_guardian_name}
            </p>
            <p>
              <span>Relationship: </span>
              {info.relationship_to_applicant}
            </p>
            <p>
              <span>Contact: </span>
              {info.contact_of_parent}
            </p>
            <p>
              <span>Nationality: </span>
              {info.nationality_of_parent}
            </p>

            <p>
              <span>Relationship 2:</span>
              {info.relationship_to_applicant_2}
            </p>
            <p>
              <span>Contact: </span>
              {info.contact_of_parent_2}
            </p>
            <p>
              <span>Nationality 2:</span> {info.nationality_of_parent_2}
            </p>
          </li>
          <li className="mb-10 ml-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Selected Subjects
            </h3>

            {info?.subjects?.map((subject, index) => (
              <p key={index}>{subject}</p>
            ))}
            <p className="text-lg font-semibold">Total Fee: {info?.totalFee}</p>
          </li>
        </ol>
      </div>

      <div className="flex w-full py-10 gap-4 justify-evenly">
        <Button
          onClick={() => handlePrevious()}
          variant="flat"
          color="success"
          size="lg"
          disabled={loading}
        >
          Previous
        </Button>
        <Button
          onClick={async () => {
            await finishRegistration();
          }}
          size="lg"
          variant="flat"
          color="success"
          isLoading={loading}
        >
          {loading ? "uploading data..." : "  Submit"}
        </Button>
      </div>
    </div>
  );
};

export default Preview;
