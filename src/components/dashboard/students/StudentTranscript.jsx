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
} from "@nextui-org/react";
const StudentTranscript = ({
  newData,
  setNewData,
  isLoading,
  updateAssessmentTable,
  updatingTable,
  mutate,
  id,
}) => {
  const [readOnly, setReadOnly] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(10);
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

  //
  const handleInputChange = (e, index) => {
    // const inputId = e.target.id;
    const fieldName = e.target.name;
    const inputValue = e.target.value;

    // computeMeanScores(index);
    setUpdateAsessments((prevAsess) => {
      const newAsess = [...prevAsess];
      newAsess[index][fieldName] = inputValue;

      const total_marks_obtained =
        Number(newAsess[index]?.test_1_score) +
        Number(newAsess[index]?.test_2_score) +
        Number(newAsess[index]?.mock);
      const mean_score = Math.ceil(total_marks_obtained / 3);

      newAsess[index]["mean_score"] = mean_score;
      return newAsess;
    });
  };
  const totalTestsScores = () => {
    // if (!isLoading) {
    let total_test_1_score = 0;
    let total_test_2_score = 0;
    let total_mock_score = 0;
    for (let i = 0; i < asessments?.length; i++) {
      total_test_1_score += Number(asessments[i]?.test_1_score);
      total_test_2_score += Number(asessments[i]?.test_2_score);
      total_mock_score += Number(asessments[i]?.mock);
    }

    setNewData((prevData) => ({
      ...prevData,
      total_test_1_score,
      total_test_2_score,
      total_mock_score,
    }));

    // }
    // return 0;
  };

  const handleUpdate = async () => {
    setShowProgress(true);
    setProgress(50);
    totalTestsScores();
    setProgress(70);
    setUpdating(true);
    await updateAssessmentTable(asessments);
    setProgress(90);
    setUpdating(false);
    mutate(`/api/students/${id}`);
    setProgress(100);
    setShowProgress(false);
  };

  //
  const renderGrade = (mean_score) => {
    if (mean_score > 75) {
      return <p>A</p>;
    }
    if (mean_score > 65 && mean_score < 76) {
      return <p>B</p>;
    }
    if (mean_score > 55 && mean_score < 66) {
      return <p>C</p>;
    }
    if (mean_score > 44 && mean_score < 54) {
      return <p>D</p>;
    }
    if (mean_score > 39 && mean_score < 43) {
      return <p>E</p>;
    }
    if (mean_score < 40) {
      return <p>F</p>;
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
          return renderGrade(item?.mean_score);

        default:
          null;
      }
    },
    [readOnly]
  );

  const topContent = useMemo(() => {
    return (
      <>
        <div className="flex justify-between items-center">
          <Button>Download Transcript</Button>
          <div className="flex gap-4  float-right justify-end">
            <Button
              // isDisabled={pages === 1}
              size="lg"
              variant="ghost"
              // onPress={onPreviousPage}
              color="primary"
              onPress={() => setReadOnly(false)}
            >
              Edit
            </Button>
            <Button
              // isDisabled={pages === 1}
              size="lg"
              variant="flat"
              color="success"
              // onPress={onNextPage}
              onPress={() => setReadOnly(true)}
              isLoading={updating}
              onClick={async () => await handleUpdate()}
            >
              {updating ? "updating..." : "Save"}
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
  }, [readOnly, showProgress]);

  return (
    <Table
      aria-label="Example static collection table"
      topContent={topContent}
      topContentPlacement="outside"
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
  );
};

export default StudentTranscript;
