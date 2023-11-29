import React, { useRef } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";
const TranscriptModal = ({ isOpen, onOpen, onOpenChange, transcript }) => {
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  const imgSrc =
    transcript?.gender === "Male"
      ? "/avatars/avatar-male.svg"
      : "/avatars/avatar-female.svg";
  const createdAt = new Date(transcript["createdAt"]);
  const updatedAt = new Date(transcript["updatedAt"]);
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
  // console.log(createdAt);

  const componentRef = useRef();
  // const router = useRouter();
  const handlePrint = useReactToPrint({
    content: () => componentRef?.current,
    documentTitle: `${transcript?.name}-transcript`,
    // onAfterPrint: () => router.replace("/dashboard/account"),
    // onBeforeGetContent:()=>
  });
  return (
    <div className="flex flex-col gap-2 w-full">
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={scrollBehavior}
        size="5xl"
        backdrop="blur"
        classNames={{ wrapper: "light text-[#2e3440]" }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1">
                {transcript?.title}
              </ModalHeader> */}
              <ModalBody>
                <div ref={componentRef} className="text-[#000] p-3">
                  {/* transcript header */}
                  <div className="flex justify-between">
                    {/* about */}
                    <div>
                      <div className="flex-2">
                        {" "}
                        <Image
                          src={
                            transcript?.userImg ? transcript?.userImg : imgSrc
                          }
                          alt="user avatar"
                          className=" w-[175px] h-[200px] rounded-lg mb-2 object-contain"
                          width={120}
                          height={150}
                          // fill={true}
                        />
                        <div className="font-semibold">
                          <p>GR. No. {transcript?.registration_ID}</p>
                          <p>Name: {transcript?.name}</p>
                          <p>
                            Name of parent: {transcript?.parent_guardian_name}
                          </p>
                          <p>Date of Birth: {transcript?.date_of_birth}</p>
                          <p>Date of Joining: {admissionDate}</p>
                          <p>Date of Living: {graduationDate}</p>
                        </div>
                      </div>
                    </div>
                    {/* school info */}
                    <div className="flex-3 text-center mt-6">
                      {/* school code */}
                      <div className=" italic">
                        <p>In the name of God, the gracious the merciful</p>
                        <p>He who purifies himself shall prosper (Al-Quran)</p>
                      </div>
                      <br />
                      <br />
                      {/* school name and address */}
                      <div>
                        <h2>NUSRAT MANAGEMENT & ACCOUNTANCY TRAINING CENTRE</h2>
                        <h2>(REMEDIAL CLASSES FOR THE WASSCE PROGRAM)</h2>
                        <p>
                          P.O.Box 603,Banjul, The Gambia, West Africa |
                          Tel.:(220)4396683 | email info@nusratsss.com
                        </p>
                      </div>
                      {/* transcript type title */}
                      <div>
                        <h2>STUDENT'S TRANSCRIPT</h2>
                      </div>
                    </div>
                    {/* logo */}
                    <div className="flex-2 mt-2">
                      <Image
                        src={"/nmatc.png"}
                        alt="logo here"
                        className=" w-[120px] h-[130px] rounded-lg mb-2 object-fit"
                        width={120}
                        height={150}
                        // fill={true}
                      />
                    </div>
                  </div>
                  {/* transcript body*/}
                  <div className="transcript-table mt-6 flex justify-between gap-4">
                    <table className="tra-table w-[85%]">
                      <thead>
                        <tr>
                          <th>Class: Private WASSCE 2023</th>
                          {/* <td>Class: Private WASSCE 2023</td> */}
                          <th>Test 1</th>
                          <th>Test 2</th>
                          <th>Mock</th>
                          <th>Mean Score</th>
                          <th>Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transcript?.assessments?.map((assess) => {
                          return (
                            <>
                              <tr>
                                <td>{assess?.subject}</td>
                                <td>{assess?.test_1_score}</td>
                                <td>{assess?.test_2_score}</td>
                                <td>{assess?.mock}</td>
                                <td>{assess?.mean_score}</td>
                                <td>{assess?.grade}</td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                    {/* // interpretation table */}
                    <table className="tra-table w-[15%]">
                      <thead>
                        <tr className="w-full">
                          <th className="w-full" colspan="4">
                            Interpretation
                          </th>
                        </tr>
                        <tr>
                          <th>Grade</th>
                          <th>%</th>
                          <th>Remarks</th>
                          <th>result</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* transcript footer*/}
                  <div></div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handlePrint}>
                  Print
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
export default TranscriptModal;
