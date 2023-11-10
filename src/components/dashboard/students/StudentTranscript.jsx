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
}) => {
  const [readOnly, setReadOnly] = useState(true);
  const [updating, setUpdating] = useState(false);
  const initialValue = data?.subjects?.map((subject) => ({
    subject,
    test_1_score: "",
    subject,
    test_2_score: "",
    subject,
    test_3_score: "",
  }));
  const [asessments, setUpdateAsessments] = useState(
    data?.assessments?.length === initialValue?.length
      ? data?.assessments
      : initialValue
  );

  // console.log(asessments);
  const handleInputChange = (e, index) => {
    // const inputId = e.target.id;
    const fieldName = e.target.name;
    const inputValue = e.target.value;

    setUpdateAsessments((prevAsess) => {
      const newAsess = [...prevAsess];
      newAsess[index][fieldName] = inputValue;
      return newAsess;
    });
  };
  const handleUpdate = async () => {
    setUpdating(true);
    await updateAssessmentTable(asessments);
    setUpdating(false);
    mutate("/api/complete-registration");
  };

  const renderCell = React.useCallback(
    (item, columnKey) => {
      const index = asessments?.indexOf(item);
      // console.log(columnKey);
      const { subject, test_1_score, test_2_score, test_3_score } = item;

      switch (columnKey) {
        case "$.0":
          return <p>{item?.subject}</p>;
        case "$.1":
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
        case "$.2":
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
        case "$.3":
          return (
            <input
              value={item?.test_3_score}
              readOnly={readOnly}
              className={`${
                readOnly ? "bg-transparent" : null
              } p-2  rounded-lg w-20`}
              onChange={(e) => handleInputChange(e, index)}
              name={`test_3_score`}
              id={item?.subject}
            />
          );

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
            onClick={handleUpdate}
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
        <TableColumn align="center">SUBJECTS</TableColumn>
        <TableColumn align="center">TERM 1</TableColumn>
        <TableColumn align="center">TERM 2</TableColumn>
        <TableColumn align="center">MOCK</TableColumn>
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
      </TableBody>
    </Table>
  );
};

export default StudentTranscript;
