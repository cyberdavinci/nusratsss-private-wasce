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
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
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

  const componentRef = useRef(null);
  const handleDownloadPDF = async () => {
    const element = componentRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 }); // Higher scale for better quality
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`${transcript?.name}-transcript.pdf`);
  };
  // const router = useRouter();
  const handlePrint = useReactToPrint({
    content: () => componentRef?.current,
    documentTitle: `${transcript?.name}-transcript`,
    // onAfterPrint: () => ,
    onBeforeGetContent: () => {},
  });
  //   <Image
  //   src={transcript?.userImg ? transcript?.userImg : imgSrc}
  //   alt="user avatar"
  //   className=" rounded-lg mb-2 object-contain"
  //   width={120}
  //   height={150}
  //   // fill={true}
  // />
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
                <div className="min-h-screen bg-gray-100 p-8">
                  <div
                    ref={componentRef}
                    className="max-w-[1000px] mx-auto bg-white shadow-lg rounded-lg p-8"
                  >
                    {/* Header Section */}
                    <div className="grid grid-cols-3 gap-8 mb-8">
                      {/* Student Photo */}
                      <div className="space-y-4">
                        <div className="w-32 h-40  rounded-lg flex items-center justify-center">
                          <Image
                            src={
                              transcript?.userImg ? transcript?.userImg : imgSrc
                            }
                            alt="user avatar"
                            className=" rounded-lg mb-2 object-contain"
                            width={120}
                            height={150}
                            // fill={true}
                          />
                        </div>
                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="font-semibold">Student ID</span>{" "}
                            {transcript?.registration_ID}
                          </p>
                          <p>
                            <span className="font-semibold">Name:</span>{" "}
                            {transcript?.name}
                          </p>
                          <p>
                            <span className="font-semibold">Parent:</span>{" "}
                            {transcript?.parent_guardian_name}
                          </p>
                          <p>
                            <span className="font-semibold">DOB:</span>{" "}
                            {transcript?.date_of_birth}
                          </p>
                          <p>
                            <span className="font-semibold">Enrollment:</span>{" "}
                            {transcript?.enrollment_date}
                          </p>
                          <p>
                            <span className="font-semibold">Completion:</span>{" "}
                            {transcript?.date_of_completion}
                          </p>
                        </div>
                      </div>

                      {/* School Info */}
                      <div className="text-center space-y-4">
                        <div className="italic text-gray-600">
                          <p>In the name of God, the gracious the merciful</p>
                          <p>
                            He who purifies himself shall prosper (Al-Quran)
                          </p>
                        </div>
                        <div className="mt-6">
                          <h1 className="text-xl font-bold">
                            NUSRAT INSTITUTE OF PROFESSIONAL STUDIES
                          </h1>
                          <p className="text-sm mt-2">
                            (REMEDIAL CLASSES FOR THE WASSCE PROGRAM)
                          </p>
                          <p className="text-xs mt-4">
                            P.O.Box 603, Banjul, The Gambia, West Africa
                          </p>
                          <p className="text-xs">
                            Tel.: (220)4396683 | Email: info@nusratsss.com
                          </p>
                        </div>
                        <h2 className="text-xl font-bold mt-8">
                          STUDENT'S TRANSCRIPT
                        </h2>
                      </div>

                      {/* School Logo */}
                      <div className="flex justify-end ">
                        <div className="w-[300px] h-[300px]   rounded-full flex items-center justify-center">
                          <Image
                            src={"/nmatc.png"}
                            alt="user avatar"
                            className=" rounded-lg mb-2 object-contain ml-28 mb-28"
                            width={270}
                            height={300}
                            // fill={true
                          />
                        </div>
                      </div>
                    </div>

                    {/* Transcript Body */}
                    <div className="flex gap-6">
                      {/* Main Grades Table */}
                      <div className="flex-1">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border px-4 py-2 text-left">
                                Subjects
                              </th>
                              <th className="border px-4 py-2">Test 1</th>
                              <th className="border px-4 py-2">Test 2</th>
                              <th className="border px-4 py-2">Mock</th>
                              <th className="border px-4 py-2">Mean</th>
                              <th className="border px-4 py-2">Grade</th>
                            </tr>
                          </thead>
                          <tbody>
                            {asessments.map((assessment, index) => (
                              <tr
                                key={index}
                                className={index % 2 === 0 ? "bg-gray-50" : ""}
                              >
                                <td className="border px-4 py-2">
                                  {assessment.subject}
                                </td>
                                <td className="border px-4 py-2 text-center">
                                  {assessment.test_1_score}
                                </td>
                                <td className="border px-4 py-2 text-center">
                                  {assessment.test_2_score}
                                </td>
                                <td className="border px-4 py-2 text-center">
                                  {assessment.mock}
                                </td>
                                <td className="border px-4 py-2 text-center">
                                  {assessment.mean_score.toFixed(2)}
                                </td>
                                <td className="border px-4 py-2 text-center font-semibold">
                                  {renderGrade(assessment.mean_score)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Grade Scale */}
                      <div className="w-64">
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr>
                              <th
                                className="border px-2 py-1 bg-gray-50"
                                colSpan={4}
                              >
                                Interpretation
                              </th>
                            </tr>
                            <tr className="bg-gray-50">
                              <th className="border px-2 py-1">Grade</th>
                              <th className="border px-2 py-1">Range%</th>
                              <th className="border px-2 py-1">Remarks</th>
                              <th className="border px-2 py-1">Result</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ["A", ">75", "Excellent", "Credit"],
                              ["B", "66-75", "V.Good", "Good"],
                              ["C", "56-65", "Good", "Credit"],
                              ["D", "45-55", "Average", "Pass"],
                              ["E", "40-44", "Week", "Pass"],
                              ["F", "<40", "Fail", "Fail"],
                            ].map(([grade, range, remarks, result], index) => (
                              <tr
                                key={index}
                                className={index % 2 === 0 ? "bg-gray-50" : ""}
                              >
                                <td className="border px-2 py-1 text-center">
                                  {grade}
                                </td>
                                <td className="border px-2 py-1 text-center">
                                  {range}
                                </td>
                                <td className="border px-2 py-1 text-center">
                                  {remarks}
                                </td>
                                <td className="border px-2 py-1 text-center">
                                  {result}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 flex justify-between">
                      <table className="border-collapse text-sm">
                        <tbody>
                          {[
                            ["Conduct", transcript?.conduct],
                            ["Punctuality", transcript?.punctuality],
                            ["Responsibility", transcript?.responsibility],
                            ["Attitude", transcript?.attitude],
                          ].map(([label, value], index) => (
                            <tr
                              key={index}
                              className={index % 2 === 0 ? "bg-gray-50" : ""}
                            >
                              <td className="border px-4 py-2 font-semibold">
                                {label}
                              </td>
                              <td className="border px-4 py-2">{value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className="w-64 flex flex-col justify-end">
                        <div className="space-y-4">
                          <p className="font-semibold">
                            Principal's Signature:
                          </p>
                          <div className="border-b-2 border-black w-full"></div>
                          <p className="font-semibold">
                            Date: {new Date().toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-center mt-8 text-gray-600">
                      A genuine transcript must bear the seal of the Principal
                      and a recent photograph of the student
                    </p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>

                <Button color="primary" onPress={handleDownloadPDF}>
                  Save
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
