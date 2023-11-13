"use client";
import React, { useState } from "react";
import { Tabs, Tab, Spinner, useDisclosure } from "@nextui-org/react";
import useSWR from "swr";
import { useParams } from "next/navigation";
import StudentInfoTab from "@/components/dashboard/students/StudentInfoTab";
import StudentTranscript from "@/components/dashboard/students/StudentTranscript";
import UpdatingModal from "@/components/dashboard/UpdatingModal";
import { useEffect } from "react";

const fetcher = (...args) =>
  fetch(...args).then(async (res) => await res.json());

const Student = () => {
  const { id } = useParams();
  const { isOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = React.useState("user");
  const [userImg, setUserImg] = React.useState(null);
  const [updatingTable, setUpdatingTable] = React.useState(false);
  const [updatingInfo, setUpdatingInfo] = React.useState(false);
  const { data, isLoading, isError, mutate } = useSWR(
    `/api/students/${id}`,
    fetcher
  );
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
        <Tab key={"user"} title={"User"}>
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
              />
              <UpdatingModal updatingInfo={updatingInfo} newData={newData} />
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
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Student;
