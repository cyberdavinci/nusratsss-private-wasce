"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
// import SubjectList from "../subjectsList/SubjectsList";
const SelectSubjects = ({
  setInfo,
  info,
  selectedSubjects,
  setSelectedSubjects,
  handleNext,
  totalPrice,
  setTotalPrice,
}) => {
  const [isError, setIsError] = useState(false);
  // const [totalPrice, setTotalPrice] = useState(0);
  const subjects = [
    {
      name: "English Language",
      icon: "/icons/eng.svg",
    },
    {
      name: "Agricultural Science",
      icon: "/icons/agric.svg",
    },
    {
      name: "Mathematics",
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
    {
      name: "Government",
      icon: "/icons/agric.svg",
    },

    {
      name: "Civic Education",
      icon: "/icons/agric.svg",
    },
    {
      name: "Insurance",
      icon: "/icons/agric.svg",
    },
    {
      name: "Marketing",
      icon: "/icons/agric.svg",
    },
  ];
  const subjectsPricees = [
    {
      amount: 4500,
      id: 1,
    },
    {
      amount: 5000,
      id: 2,
    },
    {
      amount: 6500,
      id: 3,
    },
    {
      amount: 7000,
      id: 4,
    },
    {
      amount: 7500,
      id: 5,
    },
    {
      amount: 8000,
      id: 6,
    },
    {
      amount: 8500,
      id: 7,
    },
    {
      amount: 9000,
      id: 8,
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
  useEffect(() => {
    updateSubjectPrice();
    // console.log(selectedSubjects);
  }, [selectedSubjects]);

  const updateSubjectPrice = () => {
    selectedSubjects?.length === 0 && setTotalPrice(() => 0);
    subjectsPricees.filter((sub) => {
      selectedSubjects?.length === sub.id && setTotalPrice(() => sub.amount);
    });
  };
  const updateSubjects = (value) => {
    if (!selectedSubjects.includes(value)) {
      if (selectedSubjects?.length < 8) {
        setSelectedSubjects((prev) => [...prev, value]);
        // setInfo((prev) => ({ ...prev, totalFee: totalPrice }));
      }
    } else {
      const newSubjects = selectedSubjects.filter(
        (subject) => subject !== value
      );
      setSelectedSubjects((prev) => [...newSubjects]);
    }
  };

  const isSubjectSelected = () => {
    return selectedSubjects.length > 0;
  };
  return (
    <div className=" my-14 mx-auto w-full flex flex-col items-center transition-all">
      <div className="flex justify-around flex-wrap items-center mb-5 md:text-2xl text-xl font-bold w-full">
        <h1 className="capitalize text-center">Please select your subjects</h1>
        <span>Total Cost: GMD {totalPrice}</span>
      </div>

      <span className=" text-red-700 capitalize font-extrabold transition-all">
        {isError && "Please select one or more subjects"}
      </span>

      <div className="flex gap-3 flex-wrap">
        <div className="flex gap-5 justify-around flex-col flex-1">
          <div className="flex justify-center items-center gap-4 flex-wrap w-full">
            {subjects.map((subject, index) => {
              return (
                <div
                  className={` transition-all md:w-[200px] md:h-[130px] rounded-md w-[120px] h-[100px]  md:py-4 py-6 px-6  flex flex-col items-center cursor-pointer justify-center ${
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
                    className="w-[40px] h-[35px]"
                    alt="subject icon"
                  />
                  <h3 className="md:text-lg font-extrabold pt-1 px-2">
                    {subject.name}
                  </h3>
                </div>
              );
            })}
          </div>
          <div className="flex w-full py-10 gap-4 justify-evenly">
            <Button
              className={`md:w-[200px] w-[160px]`}
              variant="flat"
              size="lg"
              color="success"
              // disabled={currentForm === 5}
              onClick={() =>
                isSubjectSelected()
                  ? (handleNext(),
                    setInfo((prev) => ({
                      ...prev,
                      totalFee: prev?.studyFee + prev?.internalExamFee,
                    })))
                  : setIsError(() => true)
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
