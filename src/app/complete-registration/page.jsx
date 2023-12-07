"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import MyLoader from "@/components/Loader/MyLoader";
import useSWR from "swr";
import { Spinner } from "@nextui-org/react";
import CurrentForm from "@/components/CompleteRegistration/CurrentForm";
import CurrentFormTracker from "@/components/CompleteRegistration/CurrentFormTracker";
const fetcher = (...args) =>
  fetch(...args).then(async (res) => await res.json());
const FinishRegistration = () => {
  const session = useSession();
  const router = useRouter();
  const id = session.data?.user?._id;
  const [currentForm, setCurrentForm] = useState(1);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setIsLoading] = useState(false);
  const { data, isLoading, isError } = useSWR(
    `/api/others/students/${id}`,
    fetcher
  );

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
    totalFee: 0,
    internalExamFee: 500,
    studyFee: 0,
    previousSchool: "",
  });

  useEffect(() => {
    data?.registrationStatus === "complete"
      ? router.push(`/print-application?id=${session.data?.user?._id}`)
      : null;
    session.status === "unauthenticated" ? router.replace("/login") : null;
  }, [session.status, data, router]);

  // console.log(session.data);
  const handleNext = () => {
    currentForm > 0 ? setCurrentForm((prev) => prev + 1) : null;
    // yes i know...
    setInfo((prev) => ({
      ...prev,
      subjects: [...selectedSubjects],
      studyFee: totalPrice,
    }));
  };

  //
  const handlePrevious = () => {
    currentForm !== 0 ? setCurrentForm((prev) => prev - 1) : null;
  };
  // not sure if am using this
  const updateSubs = (arr) => {
    setInfo((prev) => ({ ...prev, subjects: [...arr] }));
  };
  //
  const handleInputChange = (event) => {
    setInfo((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  //
  const isFormValid = (obj) => {
    const isValid = Object.values(obj).every((item) => item.trim() !== "");
    // console.log(isValid);
    return isValid;
  };
  // console.log(info);

  //
  const finishRegistration = async () => {
    setIsLoading((prev) => !prev);
    try {
      const res = await fetch("/api/others/complete-registration", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...info,
          _id: session.data?.user?._id,
          registrationStatus: "complete",
        }),
      });
      // console.log(res);

      // !res.ok
      //   ?
      //   :
      if (!res.ok) {
        alert("Failed to Submit"), setIsLoading((prev) => !prev);
      }
      if (session.status === "authenticated") {
        router.push(`/print-application?id=${session.data?.user?._id}`);
      }
    } catch (err) {
      setIsLoading((prev) => false);
      console.log(err);
    }
  };

  if (session.status === "loading" || isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center p-8">
        <Spinner />
      </div>
    );
  return (
    <div className="flex flex-col items-center p-8">
      <CurrentFormTracker currentForm={currentForm} />
      <CurrentForm
        info={info}
        setInfo={setInfo}
        handleInputChange={handleInputChange}
        // updateSubs={updateSubs}
        currentForm={currentForm}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        finishRegistration={finishRegistration}
        isFormValid={isFormValid}
        selectedSubjects={selectedSubjects}
        setSelectedSubjects={setSelectedSubjects}
        loading={loading}
        totalPrice={totalPrice}
        setTotalPrice={setTotalPrice}
      />
    </div>
  );
};

export default FinishRegistration;
