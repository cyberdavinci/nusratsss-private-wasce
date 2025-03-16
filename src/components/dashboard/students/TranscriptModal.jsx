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
const TranscriptModal = ({
  isOpen,
  onOpen,
  onOpenChange,
  transcript,
  asessments,
  // newData,
  renderGrade,
}) => {
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  React.useEffect(() => {}, [transcript]);
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
        size="full"
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
                    <div className="flex-2 w-fit">
                      <div>
                        {" "}
                        <Image
                          src={
                            transcript?.userImg ? transcript?.userImg : imgSrc
                          }
                          alt="user avatar"
                          className=" w-[100px] h-[125px] rounded-lg mb-2 object-contain"
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
                    <div className="flex-2 text-center mt-6">
                      {/* school code */}
                      <div className=" italic">
                        <p>In the name of God, the gracious the merciful</p>
                        <p>He who purifies himself shall prosper (Al-Quran)</p>
                      </div>
                      <br />
                      <br />
                      {/* school name and address */}
                      <div>
                        <h2 className=" uppercase">
                          Nusrat Institute of Professional Studies
                        </h2>
                        <h2>(REMEDIAL CLASSES FOR THE WASSCE PROGRAM)</h2>
                        <p>
                          P.O.Box 603,Banjul, The Gambia, West Africa |
                          Tel.:(220)4396683 | email info@nusratsss.com
                        </p>
                      </div>
                      {/* transcript type title */}
                      <div className="mt-10 font-semibold text-xl">
                        <h2>STUDENT'S TRANSCRIPT</h2>
                      </div>
                    </div>
                    {/* logo */}
                    <div className="flex-2 w-[300px] flex mt-2">
                      <img
                        src={"/privatewasscelogo.jpeg"}
                        alt="logo here"
                        className="mb-2 w-full"
                        // width={120}
                        // height={150}
                        // fill={true}
                      />
                    </div>
                  </div>
                  {/* transcript body*/}
                  <div className="transcript-table mt-6 flex justify-between gap-4">
                    <table className="tra-table table-main w-[85%]">
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
                        {asessments?.map((assess, index) => {
                          // console.log(renderGrade(assess?.mean_score));
                          return (
                            <>
                              <tr key={index}>
                                <td>{assess?.subject}</td>
                                <td>{assess?.test_1_score}</td>
                                <td>{assess?.test_2_score}</td>
                                <td>{assess?.mock}</td>
                                <td>{assess?.mean_score}</td>
                                {/* <td>{assess?.grade}</td> */}
                                <td>{renderGrade(assess?.mean_score)}</td>
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
                          <th>range%</th>
                          <th>Remarks</th>
                          <th>result</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>A</td>
                          <td>{">75"}</td>
                          <td>Excellent</td>
                          <td>Credit</td>
                        </tr>
                        <tr>
                          <td>B</td>
                          <td>66-75</td>
                          <td>V.Good</td>
                          <td>Good</td>
                        </tr>
                        <tr>
                          <td>C</td>
                          <td>56-65</td>
                          <td>Good</td>
                          <td>Credit</td>
                        </tr>
                        <tr>
                          <td>D</td>
                          <td>45-55</td>
                          <td>Average</td>
                          <td>Pass</td>
                        </tr>
                        <tr>
                          <td>E</td>
                          <td>40-44</td>
                          <td>Week</td>
                          <td>Pass</td>
                        </tr>
                        <tr>
                          <td>F</td>
                          <td>{"<40"}</td>
                          <td>Fail</td>
                          <td>Fail</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* transcript footer*/}
                  <div className="mt-4 flex justify-between">
                    <table className="tra-table">
                      <tbody>
                        <tr>
                          <td>Conduct</td>
                          <td>{transcript?.conduct}</td>
                        </tr>
                        <tr>
                          <td>Punctuality</td>
                          <td>{transcript?.punctuality}</td>
                        </tr>
                        <tr>
                          <td>Responsibility</td>
                          <td>{transcript?.responsibility}</td>
                        </tr>
                        <tr>
                          <td>Attitude</td>
                          <td>{transcript?.attitude}</td>
                        </tr>
                      </tbody>
                    </table>
                    {/* right footer side */}
                    <div className=" flex flex-col justify-between">
                      <p className="font-semibold">Principle's Signature:</p>
                      <hr className=" w-full bg-black h-[2px] " />
                      <p className="font-semibold">Date: </p>
                    </div>
                  </div>
                  <p className="text-sm mt-10 text-center">
                    A genuine transcript must bear the seal of the Principal and
                    a recent photograph of the student
                  </p>
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
