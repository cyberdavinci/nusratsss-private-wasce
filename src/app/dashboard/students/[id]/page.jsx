"use client";
import React, { useState } from "react";
import { Tabs, Tab, Spinner, useDisclosure } from "@nextui-org/react";
import useSWR, { useSWRConfig } from "swr";
import { useParams, useRouter } from "next/navigation";
import StudentInfoTab from "@/components/dashboard/students/StudentInfoTab";
import StudentTranscript from "@/components/dashboard/students/StudentTranscript";
import StudentSecurityTab from "@/components/dashboard/students/StudentSecurityTab";
import UpdatingModal from "@/components/dashboard/UpdatingModal";
import { useEffect } from "react";
import StudentTestimonialTab from "@/components/dashboard/students/StudentTestimonialTab";

const Student = () => {
  const fetcher = (...args) =>
    fetch(...args).then(async (res) => await res.json());
  const { id } = useParams();
  const { isOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = React.useState("info");
  const [userImg, setUserImg] = React.useState(null);
  const [updatingTable, setUpdatingTable] = React.useState(false);
  const [updatingInfo, setUpdatingInfo] = React.useState(false);
  const [updatingSecurity, setUpdatinfSecurity] = React.useState(false);

  const router = useRouter();
  const { data, isLoading, isError } = useSWR(
    `/api/others/students/${id}`,
    fetcher
  );
  const { mutate } = useSWRConfig();
  //
  const [newData, setNewData] = useState(data ? data : null);
  const [assessments, setAssessments] = useState([]);

  const handleInputChange = (event) => {
    setNewData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  // console.log(newData);
  const handleImageChange = (event) => {
    event.preventDefault();

    const reader = new FileReader();
    reader.onload = (e) => {
      // setUserImg(e.target.result);
      setNewData((prev) => ({
        ...prev,
        userImg: e.target.result,
      }));
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const updateStudentData = async (e) => {
    e.preventDefault();
    setUpdatingInfo((prev) => true);
    try {
      const res = await fetch("/api/others/complete-registration", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newData,
          // userImg,
        }),
      });

      setUpdatingInfo((prev) => false);
    } catch (err) {
      setUpdatingInfo((prev) => false);
      console.log(err);
    }
  };
  // console.log(newData);
  const updateStudentSecurity = async (email, password) => {
    // e.preventDefault();
    setUpdatinfSecurity((prev) => true);
    try {
      const res = await fetch("/api/others/security-update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: newData?._id,
          email,
          password,
          // userImg,
        }),
      });

      setUpdatinfSecurity((prev) => false);
    } catch (err) {
      setUpdatinfSecurity((prev) => false);
      console.log(err);
    }
  };

  const updateAssessmentTable = async (newDataTable, remarks) => {
    // console.log(remarks);
    setUpdatingTable((prev) => true);
    try {
      const res = await fetch("/api/others/complete-registration", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newData,
          assessments: [...newDataTable],
        }),
      });
      // console.log(res);
      setUpdatingTable((prev) => false);
    } catch (err) {
      setUpdatingTable((prev) => false);
      console.log(err);
    }
  };

  // console.log(data);

  return (
    <div>
      {isLoading && newData === null ? (
        <div className="w-full h-screen flex items-center justify-center">
          {" "}
          <Spinner label="loading data" />
        </div>
      ) : (
        <>
          <Tabs
            aria-label="Options"
            color="success"
            variant="bordered"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key={"info"} title={"Info"}>
              <StudentInfoTab
                updateStudentData={updateStudentData}
                newData={newData}
                data={data}
                setNewData={setNewData}
                handleInputChange={handleInputChange}
                handleImageChange={handleImageChange}
                userImg={userImg}
                updatingInfo={updatingInfo}
                router={router}
                // newPassword={newPassword}
                // setNewPassword={setNewPassword}
              />
              <UpdatingModal updating={updatingInfo} newData={newData} />
            </Tab>
            <Tab key={"security"} title={"Security"}>
              <StudentSecurityTab
                updateStudentSecurity={updateStudentSecurity}
                newData={newData}
                updatingSecurity={updatingSecurity}
              />
              <UpdatingModal updating={updatingSecurity} newData={newData} />
            </Tab>
            <Tab key={"transcript"} title={"Transcript"}>
              <StudentTranscript
                newData={newData}
                setNewData={setNewData}
                isLoading={isLoading}
                updateAssessmentTable={updateAssessmentTable}
                updatingTable={updatingTable}
                mutate={mutate}
                id={id}
                handleRemarksUpdate={handleInputChange}
              />
            </Tab>
            <Tab key={"testimonial"} title={"Testimonial"}>
              <StudentTestimonialTab
                newData={newData}
                setNewData={setNewData}
                // isLoading={isLoading}
                // updateAssessmentTable={updateAssessmentTable}
                // updatingTable={updatingTable}
                updatingInfo={updatingInfo}
                mutate={mutate}
                id={id}
                handleRemarksUpdate={handleInputChange}
              />
            </Tab>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default Student;
