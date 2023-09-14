"use client";
import Image from "next/image";
import React from "react";
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
const SubjectsList = () => {
  return (
    <div className=" my-14">
      <h1 className=" text-3xl font-bold mb-5">Subjects List</h1>
      <p className=" p-4 font-semibold text-lg">Please select your subjects</p>
      <div className="flex gap-4 flex-wrap">
        {subjects.map((subject) => {
          return (
            <div className=" w-[200px] h-[150px] rounded-md bg-[#1a1a24] py-4 px-6  flex flex-col items-center cursor-pointer justify-center">
              <Image src={subject.icon} width={50} height={45} />
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

export default SubjectsList;
