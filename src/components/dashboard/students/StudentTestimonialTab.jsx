import React, { useState } from "react";
// import { Button } from "@nextui-org/react";
import { LuFileEdit } from "react-icons/lu";
import { Button, useDisclosure } from "@nextui-org/react";
import EditTestimonialModal from "./EditTestimonialModal";
import Image from "next/image";
const StudentTestimonialTab = ({
  newData,
  setNewData,
  updateStudentData,
  updating,
}) => {
  const [modalTitle, setModalTitle] = useState("");
  const [modalPlaceHolder, setModalPlaceHolder] = useState("");
  const [modalName, setModalName] = useState("");
  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const createdAt = new Date(newData["createdAt"]);
  const updatedAt = new Date(newData["updatedAt"]);
  const inputDateCreatedAt = new Date(createdAt);
  const inputDateUpdatedAt = new Date(updatedAt);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const admissionDate = `${
    months[inputDateCreatedAt.getMonth()]
  } ${inputDateCreatedAt.getFullYear()}`;
  const graduationDate = `${
    months[inputDateUpdatedAt.getMonth()]
  } ${inputDateUpdatedAt.getFullYear()}`;
  const imgSrc =
    newData?.gender === "Male"
      ? "/avatars/avatar-male.svg"
      : "/avatars/avatar-female.svg";
  return (
    <>
      <div>
        <div className="download-btn">
          <Button>Download Testimonial</Button>
        </div>
        {/* testimonial container */}
        <div className="bg-white mt-3 rounded-md text-slate-800 p-3 pt-[100px] pb-12">
          {/* header */}
          <div className="text-center">
            <h3>Bismillahi Rahmani Rahim</h3>
            <h3>He Who Purifies Himself Shall Prosper (al Quran)</h3>
            {/* sub-main-head */}
            <div className="text-center mt-6">
              <h1 className="text-3xl font-bold">
                Nusrat Senior Secondary School
              </h1>
              <h3>
                P.O. Box 603, Banjul, The Gambia. Tel: (+220) 4376655 | Email:
                info@nusratsss.com
              </h3>
            </div>
            {/* document type title */}
            <h1 className="text-3xl mt-10 font-semibold">Testimonial</h1>
          </div>
          {/* header ends here */}
          {/*  student info/admission */}
          <div className="flex md:justify-center items-center gap-10 ">
            {/* info   */}
            <div>
              <ul className=" border-2 border-slate-800 items-center">
                <li className="flex gap-4 border-b-2 border-slate-800 ">
                  <p className=" border-r-2 border-slate-800 w-[130px] px-2">
                    Student#
                  </p>
                  <span className="px-5">{newData?.registration_ID}</span>
                </li>
                <li className="flex gap-4 border-b-2 border-slate-800">
                  <p className=" border-r-2 border-slate-800 w-[130px] px-2">
                    Full Name
                  </p>
                  <span className="px-5">{newData?.name}</span>
                </li>
                <li className="flex gap-4 border-b-2 border-slate-800">
                  <p className=" border-r-2 border-slate-800 w-[130px] px-2">
                    Parent
                  </p>{" "}
                  <span className="px-5">{`${newData?.parent_guardian_name}(${newData?.relationship_to_applicant})`}</span>
                </li>
                <li className="flex gap-4 border-slate-800">
                  <p className=" border-r-2 border-slate-800 w-[130px] px-2">
                    Birth Date
                  </p>{" "}
                  <span className="px-5">{newData?.date_of_birth}</span>
                </li>
              </ul>
            </div>
            {/* admission   */}
            <div>
              <ul className=" border-2 border-slate-800">
                <li className="flex gap-4 border-b-2 border-slate-800">
                  <p className=" border-r-2 border-slate-800 w-[130px] px-2">
                    Admission
                  </p>{" "}
                  <span className="px-5">{admissionDate}</span>
                </li>
                <li className="flex gap-4  border-slate-800">
                  <p className=" border-r-2 border-slate-800 w-[130px] px-2">
                    Completion
                  </p>
                  <span className="px-5">{graduationDate}</span>
                </li>
              </ul>
            </div>
            {/* profile */}
            <div className="">
              <Image
                src={newData?.userImg ? newData?.userImg : imgSrc}
                alt="user avatar"
                className=" w-[175px] h-[200px] rounded-lg mb-2 object-contain"
                width={120}
                height={150}
                // fill={true}
              />
            </div>
          </div>
          {/*  student info tables ends here*/}

          {/* subjects attempted  */}
          <div className="mt-10 ">
            <h1 className="font-bold text-xl mb-4">Attempted Subjects</h1>
            <ol className=" list-decimal  flex flex-wrap w-full gap-8 ml-5 italic">
              {newData?.subjects?.map((subject, index) => (
                <li key={index}>{subject}</li>
              ))}
            </ol>
          </div>
          {/* subjects attempted ends hre */}

          {/* other info */}
          <div className="mt-12 flex gap-3 flex-col">
            <div>
              <div className="flex justify-between items-center">
                <p className="font-semibold">Examination</p>
                <LuFileEdit
                  size={30}
                  onClick={() => {
                    setModalTitle("Examination");
                    setModalName("examination");
                    setModalPlaceHolder("examination details");
                    onOpen();
                  }}
                  className=" cursor-pointer"
                  color="#666"
                />
              </div>

              <br />
              <span>{newData?.testimonial?.examination}</span>
              <hr />
            </div>
            <div>
              <div className="flex justify-between items-center">
                <p className="font-semibold">Index Number</p>
                <LuFileEdit
                  size={30}
                  onClick={() => {
                    setModalTitle("Index Number");
                    setModalName("indexNumber");

                    setModalPlaceHolder("index number details");
                    onOpen();
                  }}
                  className=" cursor-pointer"
                  color="#666"
                />
              </div>
              <br />
              <span>{newData?.testimonial?.indexNumber}</span>
              <hr />
            </div>
            <div>
              <div className="flex justify-between items-center">
                <p className="font-semibold">Responsibilty</p>
                <LuFileEdit
                  size={30}
                  onClick={() => {
                    setModalTitle("Responsibilty");
                    setModalName("responsibilty");

                    setModalPlaceHolder("responsibility details");
                    onOpen();
                  }}
                  className=" cursor-pointer"
                  color="#666"
                />
              </div>
              <br />
              <span>{newData?.testimonial?.responsibilty}</span>
              <hr />
            </div>
            <div>
              <div className="flex justify-between items-center">
                <p className="font-semibold">ExtraCurricular Activities</p>
                <LuFileEdit
                  size={30}
                  onClick={() => {
                    setModalTitle("ExtraCurricular Activities");
                    setModalName("extraActivities");

                    setModalPlaceHolder("extraCurricular Activities details");
                    onOpen();
                  }}
                  className=" cursor-pointer"
                  color="#666"
                />
              </div>
              <br />
              <span>{newData?.testimonial?.extraActivities}</span>
              <hr />
            </div>
          </div>
          {/* other info ends here*/}

          {/* remarks */}
          <div className="mt-12">
            <div className="flex justify-between items-center">
              <p className="font-semibold">Remarks</p>
              <LuFileEdit
                size={30}
                onClick={() => {
                  setModalTitle("Remarks");
                  setModalName("remarks");
                  setModalPlaceHolder("student remarks");
                  onOpen();
                }}
                className=" cursor-pointer"
                color="#666"
              />
            </div>
            <br />
            <span>{newData?.testimonial?.remarks}</span>
            <hr />
          </div>
          {/* remarks end here*/}
          <div className="mt-12">
            <p>-------------------------------</p>
            <br />
            <p className="font-semibold">Principal</p>
          </div>
        </div>
      </div>
      <EditTestimonialModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        updateStudentData={updateStudentData}
        setNewData={setNewData}
        newData={newData}
        updating={updating}
        name={modalName}
        modalTitle={modalTitle}
        modalPlaceHolder={modalPlaceHolder}
      />
    </>
  );
};

export default StudentTestimonialTab;
