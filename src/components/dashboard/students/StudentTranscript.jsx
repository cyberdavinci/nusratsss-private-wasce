import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Spinner,
  Progress,
  useDisclosure,
} from "@nextui-org/react";
import TranscriptModal from "./TranscriptModal";
const StudentTranscript = ({
  newData,
  setNewData,
  isLoading,
  updateAssessmentTable,
  updatingTable,
  mutate,
  id,
  handleRemarksUpdate,
}) => {
  const [readOnly, setReadOnly] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(10);
  const [btnState, setBtnState] = useState("save");
  const [remarks, setRemarks] = useState({
    conduct: newData?.conduct,
    punctuality: newData?.punctuality,
    responsibility: newData?.responsibility,
    attitude: newData?.attitude,
  });
  const initialValue = newData?.subjects?.map((subject) => ({
    subject,
    test_1_score: 0,
    test_2_score: 0,
    mock: 0,
    mean_score: 0,
    grade: "",
    total_marks_obtained: 0,
  }));
  const [asessments, setUpdateAsessments] = useState(
    newData?.assessments?.length === initialValue?.length
      ? newData?.assessments
      : initialValue
  );

  useEffect(() => {
    totalTestsScores();
  }, []);
  useEffect(() => {
    // totalTestsScores();
  }, [btnState]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // console.log(newData);
  //

  const handleInputChange = (e, index) => {
    // const inputId = e.target.id;
    const fieldName = e.target.name;
    const inputValue = e.target.value;

    // computeMeanScores(index);

    //
    setUpdateAsessments((prevAsess) => {
      const newAsess = [...prevAsess];
      newAsess[index][fieldName] = inputValue;

      const total_marks_obtained =
        Number(newAsess[index]?.test_1_score) +
        Number(newAsess[index]?.test_2_score) +
        Number(newAsess[index]?.mock);
      const mean_score = Math.ceil(total_marks_obtained / 3);

      newAsess[index]["mean_score"] = mean_score;
      newAsess[index]["grade"] = renderGrade(mean_score);
      return newAsess;
    });
    // totalTestsScores();
  };
  // remarks
  const handleUpdateRemarks = (event) => {
    setRemarks((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };
  const updateRemarks = () => {
    const { conduct, attitude, punctuality, responsibility } = remarks;
    setNewData((prev) => {
      prev["conduct"] = conduct;
      prev["attitude"] = attitude;
      prev["punctuality"] = punctuality;
      prev["responsibility"] = responsibility;
      return prev;
    });
  };
  // total test score
  const totalTestsScores = () => {
    // const upData = { ...newData };
    let total_test_1_sum = 0;
    let total_test_2_sum = 0;
    let total_mock_sum = 0;
    // if (!isLoading) {
    // let { total_test_1_score, total_test_2_score, total_mock_score } = newData;

    for (let i = 0; i < asessments?.length; i++) {
      total_test_1_sum += parseInt(asessments[i]?.test_1_score);
      total_test_2_sum += parseInt(asessments[i]?.test_2_score);
      total_mock_sum += parseInt(asessments[i]?.mock);
      // asessments[i]["grade"] = renderGrade(asessments[i]["mean_score"]);
    }
    // console.log(renderGrade(asessments[i]["mean_score"]));
    setNewData((prevData) => {
      //
      prevData["total_test_1_score"] = total_test_1_sum;
      prevData["total_test_2_score"] = total_test_2_sum;
      prevData["total_mock_score"] = total_mock_sum;

      return prevData;
    });
  };
  // console.log(remarks);

  const handleUpdate = async () => {
    setShowProgress(true);
    setProgress(30);
    totalTestsScores();
    // handleUpdateRemarks();
    setProgress(50);
    setUpdating(true);
    // updateRemarks();
    setProgress(70);
    await updateAssessmentTable(asessments, remarks);
    setProgress(90);
    setUpdating(false);
    mutate(`/api/students/${id}`);
    setProgress(100);
    setShowProgress(false);
    setBtnState("save");
  };

  //
  const renderGrade = (mean_score) => {
    if (mean_score > 75) {
      return "A";
    }
    if (mean_score > 65 && mean_score < 76) {
      return "B";
    }
    if (mean_score > 55 && mean_score < 66) {
      return "C";
    }
    if (mean_score >= 45 && mean_score <= 55) {
      return "D";
    }
    if (mean_score > 39 && mean_score <= 44) {
      return "E";
    }
    if (mean_score < 40) {
      return "F";
    }
  };
  const renderCell = React.useCallback(
    (item, columnKey) => {
      const index = asessments?.indexOf(item);
      // console.log(item[columnKey]);
      switch (columnKey) {
        case "subjects":
          return (
            <>
              <p>{item?.subject}</p>{" "}
            </>
          );
        case "test_1":
          return (
            <input
              value={item?.test_1_score}
              readOnly={readOnly}
              className={`${
                readOnly ? "bg-transparent" : null
              } p-2  rounded-lg w-20`}
              onChange={(e) => handleInputChange(e, index)}
              name={`test_1_score`}
              id={item?.subject}
            />
          );
        case "test_2":
          return (
            <input
              value={item?.test_2_score}
              readOnly={readOnly}
              className={`${
                readOnly ? "bg-transparent" : null
              } p-2  rounded-lg w-20`}
              onChange={(e) => handleInputChange(e, index)}
              name={`test_2_score`}
              id={item?.subject}
            />
          );
        case "mock":
          return (
            <input
              value={item?.mock}
              readOnly={readOnly}
              className={`${
                readOnly ? "bg-transparent" : null
              } p-2  rounded-lg w-20`}
              onChange={(e) => handleInputChange(e, index)}
              name={`mock`}
              id={item?.subject}
            />
          );
        case "mean_score":
          return <p>{item?.mean_score}</p>;
        case "grade":
          return <p>{renderGrade(item, item?.mean_score, index)}</p>;

        default:
          null;
      }
    },
    [readOnly]
  );
  // console.log(btnState);
  const topContent = useMemo(() => {
    return (
      <>
        <div className="flex justify-between items-center">
          <Button onClick={() => onOpen()}>Download Transcript</Button>
          <div className="flex gap-4  float-right justify-end">
            <Button
              // isDisabled={pages === 1}
              size="lg"
              variant="ghost"
              // onPress={onPreviousPage}
              color="primary"
              onPress={() => setReadOnly(false)}
            >
              edit
            </Button>
            <Button
              // isDisabled={pages === 1}
              size="lg"
              variant="flat"
              color={btnState === "save" ? "default" : "success"}
              // onPress={onNextPage}
              onPress={() => {
                // setBtnState("update");
                setReadOnly(true);
              }}
              isLoading={updating}
              onClick={async () => {
                if (btnState === "update") {
                  updateRemarks();
                  await handleUpdate();
                } else {
                  updateRemarks();
                  setBtnState("update");
                }

                // btnState === "update" ? await handleUpdate() : null;
              }}
            >
              {updating ? "updating..." : `${btnState}`}
            </Button>
          </div>
        </div>
        {showProgress ? (
          <Progress
            label="updating..."
            value={progress}
            className="w-full"
            size="sm"
            color="success"
          />
        ) : (
          <p className="w-full"></p>
        )}
      </>
    );
  }, [readOnly, showProgress, btnState]);
  return (
    <>
      <Table
        aria-label="Example static collection table"
        topContent={topContent}
        topContentPlacement="outside"
        bottomContentPlacement="outside"
        // bottomContent={bottomContent}
        classNames={{ th: "border-0", td: "border-0" }}
      >
        <TableHeader>
          <TableColumn align="center" key={"subjects"}>
            SUBJECTS
          </TableColumn>
          <TableColumn align="center" key={"test_1"}>
            TEST 1
          </TableColumn>
          <TableColumn align="center" key={"test_2"}>
            TEST 2
          </TableColumn>
          <TableColumn align="center" key={"mock"}>
            MOCK
          </TableColumn>
          <TableColumn align="center" key={"mean_score"}>
            MEAN SCORE
          </TableColumn>
          <TableColumn align="center" key={"grade"}>
            GRADE
          </TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"No newData!!"}
          items={asessments ?? []}
          isLoading={isLoading}
          loadingContent={<Spinner label="loading..." />}
        >
          {asessments?.map((item, index) => (
            <TableRow key={index}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          ))}
          <TableRow>
            <TableCell>Total Marks Obtained</TableCell>
            <TableCell>
              <p className="p-2"> {newData?.total_test_1_score}</p>
            </TableCell>
            <TableCell>
              <p className="p-2">{newData?.total_test_2_score} </p>
            </TableCell>
            <TableCell>
              <p className="p-2">{newData?.total_mock_score} </p>
            </TableCell>
            <TableCell>{"-"} </TableCell>
            <TableCell>{"-"} </TableCell>
            {/* <TableCell>{""} </TableCell> */}
          </TableRow>
        </TableBody>
      </Table>
      <ul className="flex flex-col gap-2 justify-center bg-[#202020] w-[350px]  rounded-lg px-2 mt-4">
        <li className="border-b w-full p-2">
          <span>Conduct: </span>

          <input
            type="text"
            placeholder="conduct remarks"
            value={remarks?.conduct}
            name="conduct"
            onChange={(event) => handleUpdateRemarks(event)}
            className="bg-transparent border border-b-3 border-b-slate-400 w-[200px]"
          />
        </li>
        <li className="border-b w-full p-2">
          <span>Puntuality: </span>
          <input
            placeholder="puntuality remarks"
            className="bg-transparent border border-b-3 border-b-slate-400 w-[200px]"
            type="text"
            value={remarks?.punctuality}
            name="punctuality"
            onChange={(event) => handleUpdateRemarks(event)}
          />
        </li>
        <li className="border-b w-full p-2">
          <span>Responsibility: </span>
          <input
            placeholder="responsibility remarks"
            className="bg-transparent border border-b-3 border-b-slate-400 w-[200px]"
            type="text"
            value={remarks?.responsibility}
            name="responsibility"
            onChange={(event) => handleUpdateRemarks(event)}
          />
        </li>
        <li className=" w-full p-2">
          <span>Attitude: </span>
          <input
            placeholder="attitude remarks"
            className="bg-transparent border border-b-3 border-b-slate-400 w-[200px]"
            type="text"
            value={remarks?.attitude}
            name="attitude"
            onChange={(event) => handleUpdateRemarks(event)}
          />
        </li>
      </ul>
      <TranscriptModal
        onOpen={onOpen}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        transcript={newData}
        asessments={asessments}
        renderGrade={renderGrade}
      />
    </>
  );
};

export default StudentTranscript;
