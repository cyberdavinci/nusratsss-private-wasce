"use client";
import React, { useState } from "react";
import { Tabs, Tab, Spinner, useDisclosure } from "@nextui-org/react";
import useSWR, { mutate } from "swr";
import { useParams } from "next/navigation";
import StudentInfoTab from "@/components/dashboard/students/StudentInfoTab";
import StudentTranscript from "@/components/dashboard/students/StudentTranscript";
import StudentSecurityTab from "@/components/dashboard/students/StudentSecurityTab";
import UpdatingModal from "@/components/dashboard/UpdatingModal";
import { useEffect } from "react";

const fetcher = (...args) =>
  fetch(...args).then(async (res) => await res.json());

const Student = () => {
  const { id } = useParams();
  const { isOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = React.useState("info");
  const [userImg, setUserImg] = React.useState(null);
  const [updatingTable, setUpdatingTable] = React.useState(false);
  const [updatingInfo, setUpdatingInfo] = React.useState(false);
  const [updatingSecurity, setUpdatinfSecurity] = React.useState(false);

  const { data, isLoading, isError } = useSWR(`/api/students/${id}`, fetcher);
  const [newData, setNewData] = useState(isLoading ? {} : data);
  // const [assessments, setAssessments] = useState([]);
  useEffect(() => {
    setNewData((prev) => data);
  }, [data]);
  const handleInputChange = (event) => {
    setNewData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
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
  // console.log(userImg);
  // console.log(newData);
  const updateStudentData = async (e) => {
    e.preventDefault();
    setUpdatingInfo((prev) => true);
    try {
      const res = await fetch("/api/complete-registration", {
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
      const res = await fetch("/api/security-update", {
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
  // console.log(newData);

  const updateAssessmentTable = async (newDataTable) => {
    setUpdatingTable((prev) => true);
    try {
      const res = await fetch("/api/complete-registration", {
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
      <Tabs
        aria-label="Options"
        color="success"
        variant="bordered"
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab key={"info"} title={"Info"}>
          {isLoading ? (
            <Spinner label="loading data..." />
          ) : (
            <>
              <StudentInfoTab
                updateStudentData={updateStudentData}
                newData={newData}
                setNewData={setNewData}
                handleInputChange={handleInputChange}
                handleImageChange={handleImageChange}
                userImg={userImg}
                updatingInfo={updatingInfo}
                // newPassword={newPassword}
                // setNewPassword={setNewPassword}
              />
              <UpdatingModal updating={updatingInfo} newData={newData} />
            </>
          )}
        </Tab>
        <Tab key={"security"} title={"Security"}>
          {isLoading ? (
            <Spinner label="loading data..." />
          ) : (
            <>
              <StudentSecurityTab
                updateStudentSecurity={updateStudentSecurity}
                newData={newData}
                updatingSecurity={updatingSecurity}
              />
              <UpdatingModal updating={updatingSecurity} newData={newData} />
            </>
          )}
        </Tab>
        <Tab key={"transcript"} title={"Transcript"}>
          <StudentTranscript
            data={data}
            isLoading={isLoading}
            updateAssessmentTable={updateAssessmentTable}
            updatingTable={updatingTable}
            mutate={mutate}
            id={id}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Student;
