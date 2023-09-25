"use client";
import React, { useState } from "react";
import Image from "next/image";
const SelectSubjects = ({ setInfo, info }) => {
  const [selectedSubjects, setSelectedSubjects] = useState([]);
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
      name: "Government",
      icon: "/icons/agric.svg",
    },
  ];
  const updateSubjects = (value) => {
    !info.subjects?.includes(value)
      ? setInfo((prev) => ({ ...prev, subjects: [...prev.subjects, value] }))
      : null;
  };
  return (
    <div className=" my-14 mx-auto w-full flex flex-col items-center">
      <h1 className=" text-3xl font-bold mb-5">Please select your subjects</h1>
      <div className="flex justify-items-center justify-center items-center gap-4 flex-wrap w-full">
        {subjects.map((subject, index) => {
          return (
            <div
              className={` transition-all w-[200px] h-[130px] rounded-md  py-4 px-6  flex flex-col items-center cursor-pointer justify-center ${
                info.subjects?.includes(subject.name)
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
    </div>
  );
};

export default SelectSubjects;
