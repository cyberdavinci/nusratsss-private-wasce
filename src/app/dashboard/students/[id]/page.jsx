"use client";
import React, { useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import useSWR from "swr";
import { useParams } from "next/navigation";
import StudentInfoTab from "@/components/dashboard/students/StudentInfoTab";
import StudentTranscript from "@/components/dashboard/students/StudentTranscript";

const fetcher = (...args) =>
  fetch(...args).then(async (res) => await res.json());

const Student = () => {
  const { id } = useParams();

  const [selected, setSelected] = React.useState("user");
  const [updatingTable, setUpdatingTable] = React.useState(false);
  const { data, isLoading, isError, mutate } = useSWR(
    `/api/students/${id}`,
    fetcher
  );
  const [newData, setNewData] = useState(isLoading ? {} : data);
  // const [assessments, setAssessments] = useState([]);
  const handleInputChange = (event) => {
    setNewData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  console.log(newData);
  const updateStudentData = async (newDataTable) => {
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
          <StudentInfoTab
            updateStudentData={updateStudentData}
            newData={newData}
            setNewData={setNewData}
          />
        </Tab>
        <Tab key={"transcript"} title={"Transcript"}>
          <StudentTranscript
            data={data}
            isLoading={isLoading}
            updateStudentData={updateStudentData}
            updatingTable={updatingTable}
            mutate={mutate}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Student;
