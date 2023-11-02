"use client";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { Button, Spinner } from "@nextui-org/react";
const fetcher = (...args) =>
  fetch(...args).then(async (res) => await res.json());

const PrintApplication = ({ currentForm }) => {
  const session = useSession();
  const id = session.data?.user?._id;
  const { data, isLoading, isError } = useSWR(`/api/students/${id}`, fetcher);
  // console.log(data);
  const componentRef = useRef();
  const router = useRouter();
  const handlePrint = useReactToPrint({
    content: () => componentRef?.current,
    documentTitle: "application-form",
    onAfterPrint: () => router.replace("/dashboard/account"),
  });
  if (session.status === "loading") {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner size="lg" color="success" label="loading page..." />
      </div>
    );
  }
  return (
    <div
      ref={componentRef}
      className={`h-[100vh] w-[100%] p-2 text-slate-900 bg-white`}
    >
      <div>
        <h3 className="w-full p-2 bg-green-500 text-white rounded-lg">
          Congratulations! You have successfully submited your application.
        </h3>
        <h4 className="mt-1 font-extrabold">
          Print this page and bring it along.
        </h4>
      </div>
      {/*  */}
      <div>
        <div className=" w-full flex  justify-between mt-4">
          <Button size="sm" variant="flat" onClick={handlePrint} className="">
            Print Form
          </Button>
          <div>
            <p className="text-sm">APPLICATION NUMBER</p>
            <h1 className="text-2xl">#{data?.registration_ID}</h1>
          </div>
        </div>

        {/* app from */}
        <div>
          <p>APPLICATION FROM</p>
          <h1 className="text-lg font-semibold uppercase">{data?.name}</h1>

          <p>
            <span>Name: </span>
            {data?.name}
          </p>
          <p>
            <span>Address: </span>
            {data?.address}
          </p>
          <p>
            <span>Gender:</span> {data?.gender}
          </p>
          <p>
            <span>D.O.B:</span> {data?.date_of_birth}
          </p>
          <p>
            <span>Nationality:</span> {data?.nationality}
          </p>
          <p>
            <span>Ethnicity:</span> {data?.ethnicity}
          </p>
          <p>
            <span>Phone:</span> {data?.phone}
          </p>
          <p>
            <span>Email:</span> {data?.email}
          </p>
        </div>
        {/* more stuff */}
        <div className="flex flex-wrap justify-between mt-10 md:gap-0 gap-3">
          {/* Education */}
          <div>
            <h3 className="mb-2 font-semibold uppercase">Education</h3>
            <p>
              <span>Level of Education: </span>
              {data?.highest_level_of_education}
            </p>
            <p>
              <span>Year completion: </span>
              {data?.year_of_completion}
            </p>

            <p>
              <span>Occupation: </span>
              {data?.occupation}
            </p>
          </div>
          {/* family */}
          <div>
            <h3 className="mb-2 font-semibold uppercase">
              Parent or Guardian Information,
            </h3>
            <p>
              <span>Parent name: </span> {data?.parent_guardian_name}
            </p>
            <p>
              <span>Relationship: </span>
              {data?.relationship_to_applicant}
            </p>
            <p>
              <span>Contact: </span>
              {data?.contact_of_parent}
            </p>
            <p>
              <span>Nationality: </span>
              {data?.nationality_of_parent}
            </p>

            <p>
              <span>Relationship 2:</span>
              {data?.relationship_to_applicant_2}
            </p>
            <p>
              <span>Contact: </span>
              {data?.contact_of_parent_2}
            </p>
            <p>
              <span>Nationality 2:</span> {data?.nationality_of_parent_2}
            </p>
          </div>
          {/* subjects */}
          <div>
            <h3 className="mb-2 font-semibold uppercase">Subjects</h3>
            {data?.subjects?.map((subject, index) => (
              <p key={index}>{subject}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintApplication;
