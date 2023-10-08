"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import SubjectList from "../subjectsList/SubjectsList";
const SelectSubjects = ({
  setInfo,
  info,
  selectedSubjects,
  setSelectedSubjects,
  handleNext,
}) => {
  const [isError, setIsError] = useState(false);

  const subjects = [
    {
      name: "English",
      icon: "/icons/eng.svg",
    },
    {
      name: "Math",
      icon: "/icons/math.svg",
    },
    {
      name: "Physics",
      icon: "/icons/physics.svg",
    },
    {
      name: "Chemistry",
      icon: "/icons/chem.svg",
    },
    {
      name: "Biology",
      icon: "/icons/bio.svg",
    },
    {
      name: "History",
      icon: "/icons/hist.svg",
    },
    {
      name: "Geography",
      icon: "/icons/geo.svg",
    },
    {
      name: "Health Science",
      icon: "/icons/agric.svg",
    },
    {
      name: "General Science",
      icon: "/icons/agric.svg",
    },
    {
      name: "Islamic Studies",
      icon: "/icons/agric.svg",
    },
    {
      name: "French",
      icon: "/icons/agric.svg",
    },
    {
      name: "Economics",
      icon: "/icons/agric.svg",
    },
    {
      name: "Financial Accounting",
      icon: "/icons/agric.svg",
    },
    {
      name: "Business Management",
      icon: "/icons/agric.svg",
    },
    {
      name: "Commerce",
      icon: "/icons/agric.svg",
    },
    {
      name: "Literature",
      icon: "/icons/agric.svg",
    },
  ];
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsError(() => false);
    }, 3000);

    () => {
      clearInterval(timeout);
    };
  }, [isError]);
  const updateSubjects = (value) => {
    if (!selectedSubjects.includes(value)) {
      setSelectedSubjects((prev) => [...prev, value]);
    } else {
      const newSubjects = selectedSubjects.filter(
        (subject) => subject !== value
      );
      setSelectedSubjects((prev) => [...newSubjects]);
      // setInfo((prev) => ({ ...prev, subjects: [...newSubjects] }));
    }
  };
  // console.log(info?.subjects);
  const isSubjectSelected = () => {
    return selectedSubjects.length > 0;
  };
  // console.log(isSubjectSelected());
  return (
    <div className=" my-14 mx-auto w-full flex flex-col items-center transition-all">
      <div className="flex justify-around items-center mb-5 text-3xl font-bold w-full">
        <h1 className="capitalize">Please select your subjects</h1>
        <span>Total Cost: GMD7800</span>
      </div>
      {isError ? (
        <span className=" text-red-700 capitalize p-5 transition-all">
          Please select one or more subjects
        </span>
      ) : null}

      <div className="flex gap-3 flex-wrap">
        <div className="flex gap-5 justify-around flex-col flex-1">
          <div className="flex justify-center items-center gap-4 flex-wrap w-full">
            {subjects.map((subject, index) => {
              return (
                <div
                  className={` transition-all w-[200px] h-[130px] rounded-md  py-4 px-6  flex flex-col items-center cursor-pointer justify-center ${
                    selectedSubjects?.includes(subject.name)
                      ? " bg-[#0aba4d] text-[#295a29]"
                      : " bg-[#1a1a24]"
                  }`}
                  key={index}
                  onClick={() => {
                    updateSubjects(subject.name);
                  }}
                >
                  <Image
                    src={subject.icon}
                    width={50}
                    height={45}
                    alt="subject icon"
                  />
                  <h3 className="text-lg font-extrabold pt-1 px-2">
                    {subject.name}
                  </h3>
                </div>
              );
            })}
          </div>
          <div className="flex w-full py-10 gap-4 justify-evenly">
            <Button
              className={`md:w-[200px] w-full`}
              variant="flat"
              size="lg"
              color="success"
              // disabled={currentForm === 5}
              onClick={() =>
                isSubjectSelected() ? handleNext() : setIsError(() => true)
              }
            >
              Next
            </Button>
          </div>
        </div>
        {/* <div className="flex-1">
          <SubjectList />
        </div> */}
      </div>
    </div>
  );
};

export default SelectSubjects;
