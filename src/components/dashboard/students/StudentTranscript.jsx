import React, { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
} from "@nextui-org/react";
const StudentTranscript = () => {
  const [readOnly, setReadOnly] = useState(true);
  // const handleInputState = () => {
  //   setReadOnly(false);
  // };
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
          >
            Save
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
      <TableBody>
        <TableRow key="1">
          <TableCell className="text-center">Math</TableCell>
          {/*  */}
          <TableCell>
            <input
              value={90}
              readOnly={readOnly}
              // variant={!readOnly ? `bordered` : "faded"}
              className={`${
                readOnly ? "bg-transparent" : null
              } p-2  rounded-lg`}
              // color="transparent"
            />
          </TableCell>
          <TableCell>
            <input
              value={87}
              readOnly={readOnly}
              className={`${
                readOnly ? "bg-transparent" : null
              } p-2  rounded-lg`}
              // variant={!readOnly ? `bordered` : "faded"}
            />
          </TableCell>
          <TableCell>
            <input
              value={80}
              readOnly={readOnly}
              className={`${
                readOnly ? "bg-transparent" : null
              } p-2  rounded-lg`}
              // variant={!readOnly ? `bordered` : "faded"}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default StudentTranscript;
