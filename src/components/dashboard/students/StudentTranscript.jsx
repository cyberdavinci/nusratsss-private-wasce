import React, { useEffect, useMemo, useState } from "react";
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
} from "@nextui-org/react";
const StudentTranscript = ({
  data,
  isLoading,
  updateAssessmentTable,
  updatingTable,
  mutate,
  id,
}) => {
  const [readOnly, setReadOnly] = useState(true);
  const [updating, setUpdating] = useState(false);
  const initialValue = data?.subjects?.map((subject) => ({
    subject,
    test_1_score: 0,
    test_2_score: 0,
    mock: 0,
    mean_score: 0,
    grade: "",
    total_marks_obtained: 0,
  }));
  const [asessments, setUpdateAsessments] = useState(
    data?.assessments?.length === initialValue?.length
      ? data?.assessments
      : initialValue
  );
  const computeMeanScores = (index) => {
    const total_marks_obtained =
      Number(asessments[index]?.test_1_score) +
      Number(asessments[index]?.test_2_score) +
      Number(asessments[index]?.mock);
    const mean_score = Math.floor(total_marks_obtained / 3);

    setUpdateAsessments((prevAsess) => {
      const newAsess = [...prevAsess];
      newAsess[index]["total_marks_obtained"] = total_marks_obtained;
      newAsess[index]["mean_score"] = mean_score;
      return newAsess;
    });
    console.log(total_marks_obtained, mean_score);
    console.log(asessments);
  };
  // console.log(initialValue);
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

      newAsess[index]["total_marks_obtained"] = total_marks_obtained;
      newAsess[index]["mean_score"] = mean_score;

      return newAsess;
    });
  };
  // console.log(asessments);
  const handleUpdate = async () => {
    setUpdating(true);
    await updateAssessmentTable(asessments);
    setUpdating(false);
    mutate(`/api/students/${id}`);
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
          return <p></p>;

        default:
          null;
      }
    },
    [readOnly]
  );

  const topContent = useMemo(() => {
    return (
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
    );
  }, [readOnly]);

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
        emptyContent={"No data!!"}
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
          <TableCell>124</TableCell>
          <TableCell>465</TableCell>
          <TableCell>568</TableCell>
          <TableCell>{""}</TableCell>
          <TableCell>{""}</TableCell>
          {/* <TableCell>{""} </TableCell> */}
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default StudentTranscript;
