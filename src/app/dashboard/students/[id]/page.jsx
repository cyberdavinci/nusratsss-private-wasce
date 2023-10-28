"use client";
import React from "react";
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
  const { data, isLoading, isError } = useSWR(`/api/students/${id}`, fetcher);
  //   console.log(data);
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
          <StudentInfoTab />
        </Tab>
        <Tab key={"transcript"} title={"Transcript"}>
          <StudentTranscript />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Student;
