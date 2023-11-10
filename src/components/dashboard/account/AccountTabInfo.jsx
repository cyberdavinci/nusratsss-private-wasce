import React from "react";

const AccountTabInfo = ({ data }) => {
  return (
    <div className="flex flex-wrap md:justify-around justify-center w-full mt-10 items-center">
      <ol className="relative border-l border-gray-200 dark:border-gray-700 h-full max-h-[600px] ">
        <li className="mb-10 ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Personal Info
          </h3>

          <p>
            <span>Name: </span>
            {data?.name}
          </p>
          <p>
            <span>Address: </span>
            {data.address}
          </p>
          <p>
            <span>Gender:</span> {data.gender}
          </p>
          <p>
            <span>D.O.B:</span> {data.date_of_birth}
          </p>
          <p>
            <span>Nationality:</span> {data.nationality}
          </p>
          <p>
            <span>Ethnicity:</span> {data.ethnicity}
          </p>
          <p>
            <span>Phone:</span> {data.phone}
          </p>
          <p>
            <span>Email:</span> {data.email}
          </p>
        </li>
        <li className="mb-10 ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Education
          </h3>

          <p>
            <span>Level of Education: </span>
            {data.highest_level_of_education}
          </p>
          <p>
            <span>Year completion: </span>
            {data.year_of_completion}
          </p>

          <p>
            <span>Occupation: </span>
            {data.occupation}
          </p>
        </li>
      </ol>
      <ol className="relative border-l border-gray-200 dark:border-gray-700 h-full max-h-[600px] ">
        <li className="mb-10 ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Family data
          </h3>
          <p>
            <span>Parent name: </span> {data.parent_guardian_name}
          </p>
          <p>
            <span>Relationship: </span>
            {data.relationship_to_applicant}
          </p>
          <p>
            <span>Contact: </span>
            {data.contact_of_parent}
          </p>
          <p>
            <span>Nationality: </span>
            {data.nationality_of_parent}
          </p>

          <p>
            <span>Relationship 2:</span>
            {data.relationship_to_applicant_2}
          </p>
          <p>
            <span>Contact: </span>
            {data.contact_of_parent_2}
          </p>
          <p>
            <span>Nationality 2:</span> {data.nationality_of_parent_2}
          </p>
        </li>
        <li className="mb-10 ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Selected Subjects
          </h3>

          {data?.subjects?.map((subject, index) => (
            <p key={index}>{subject}</p>
          ))}
          <p className="text-lg font-semibold">Total Fee: {data?.totalFee}</p>
        </li>
      </ol>
    </div>
  );
};

export default AccountTabInfo;
