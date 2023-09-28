"use client";
import React, { useEffect, useState } from "react";
import CurrentForm from "@/components/CompleteRegistration/CurrentForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import MyLoader from "@/components/Loader/MyLoader";
const FinishRegistration = () => {
  const session = useSession();
  const router = useRouter();

  // console.log(session?.data);
  const [currentForm, setCurrentForm] = useState(1);
  const [isSubjectSelected, setIsSubjectSelected] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
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
  // const { data } = session;
  useEffect(() => {
    session.data?.user.registrationStatus === "complete"
      ? router.push("/profile")
      : null;
    session.status === "unauthenticated" ? router.replace("/register") : null;
  }, [session.status, router]);
  //
  const handleNext = () => {
    currentForm > 0 ? setCurrentForm((prev) => prev + 1) : null;
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

  const isFormValid = (obj) => {
    const isValid = Object.values(obj).every((item) => item.trim() !== "");
    return isValid;
  };
  const finishRegistration = async () => {
    try {
      const res = await fetch("/api/complete-registration", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...info,
          _id: session.data?.user?._id,
          registrationStatus: "complete",
        }),
      });
      console.log(res);
      res.status == 200
        ? alert("Successful submission")
        : alert("Failed to Submit");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(session);
  if (session.status === "loading" || session.data === null)
    return <MyLoader />;
  return (
    <div className="flex flex-col items-center">
      <CurrentForm
        info={info}
        setInfo={setInfo}
        handleInputChange={handleInputChange}
        updateSubs={updateSubs}
        currentForm={currentForm}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        finishRegistration={finishRegistration}
        isFormValid={isFormValid}
      />
      {/* <PersonalInfo
        setInfo={setInfo}
        info={info}
        // handleInputChange={handleInputChange}
      /> */}
    </div>
  );
};

export default FinishRegistration;
