"use client";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { Button, Spinner } from "@nextui-org/react";
const fetcher = (...args) =>
  fetch(...args).then(async (res) => await res.json());

const PrintApplication = ({ currentForm }) => {
  const session = useSession();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data, isLoading, isError } = useSWR(`/api/students/${id}`, fetcher);
  // console.log(id);
  const componentRef = useRef();
  const router = useRouter();
  const handlePrint = useReactToPrint({
    content: () => componentRef?.current,
    documentTitle: "application-form",
    onAfterPrint: () => router.replace("/dashboard/account"),
    // onBeforeGetContent:()=>
  });
  if (session.status === "loading" || isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner size="lg" color="success" label="loading page..." />
      </div>
    );
  }
  return (
    <div
      ref={componentRef}
      className={`h-screen w-[100%] py-2 px-8 text-slate-900 bg-white`}
    >
      <div>
        <h3 className="w-full p-2 bg-green-500 text-white rounded-lg">
          Congratulations! You have successfully submitted your application.
        </h3>
        <h1 className="p-4 text-3xl font-extrabold text-center">
          Nusrat Private Wassce Studies
        </h1>
        <h4 className="mt-1 font-extrabold">
          Print this form and bring it along when coming for payment.
        </h4>
      </div>
      {/*  */}
      {/* <div> */}
      <div className=" w-full flex  justify-between mt-4">
        <div className="flex gap-1 flex-wrap">
          <Button size="sm" variant="flat" onClick={handlePrint} className="">
            Print Form
          </Button>
          <Button
            size="sm"
            variant="flat"
            // color="primary"
            onClick={handlePrint}
            className=""
          >
            Download Form
          </Button>
        </div>
        <div>
          <p className="text-sm">APPLICATION NUMBER</p>
          <h1 className="text-2xl">#{data?.registration_ID}</h1>
        </div>
      </div>

      {/* app from */}
      <div className="flex flex-wrap justify-between mt-10 md:gap-0 gap-3">
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
        {/* <div className="flex flex-wrap justify-between mt-10 md:gap-0 gap-3"> */}
        {/* </div> */}
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
          <h3 className="mb-2 font-semibold uppercase">Guardian Information</h3>
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
          <p className=" font-semibold">
            Study Fee: GMD{" "}
            {data?.studyFee === 0 ? data?.totalFee : data?.studyFee}
          </p>
          <p className=" font-semibold">
            Internal Exam Fee: GMD{" "}
            {data?.internalExamFee === 0 ? 500 : data?.internalExamFee}
          </p>
          <p className="text-lg font-semibold">
            Total Fee:{" "}
            {data?.studyFee === 0 && data?.internalExamFee === 0
              ? parseInt(data?.totalFee) + 500
              : data?.totalFee}
          </p>
        </div>
        {/* </div> */}
      </div>
      <div>
        <p className="font-semibold italic text-xl mt-4 test-justify">
          NOTE: This fee do not include WAEC exam fees, the payment is only for
          the studies. Please print and submit this form with your payment as
          soon you can to secure a position. The fee is paid in full before you
          start classes. Also, bring along a copy of your previous WASSCE or
          GABECE results with one passport size photograph.
        </p>
        {/* <p className="font-semibold mt-2">
          You will need to bring a printed copy to the school for payment with a
          copy of your previous WASSCE or GABECE results with one passport size
          photograph.
        </p> */}
      </div>
    </div>
  );
};

export default PrintApplication;
