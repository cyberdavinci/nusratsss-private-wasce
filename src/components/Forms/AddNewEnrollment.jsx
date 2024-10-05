import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

const AddNewEnrollment = ({ closeModal }) => {
  const [enrollmentID, setEnrollmentID] = useState("");
  const [status, setStatus] = useState("Closed");
  const [studentIdPrefix, setStudentIdPrefix] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEnrollment = { enrollmentID, status, studentIdPrefix };

    setSubmitting(true);
    try {
      const response = await fetch("/api/others/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEnrollment),
      });
      response?.status == 201 ? closeModal() : null;
      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col min-w-[400px] gap-4">
      <Input
        isRequired
        labelPlacement="outside"
        label="Enrollment name"
        description="example PW2010"
        placeholder="Enter enrollment name"
        value={enrollmentID}
        onChange={(e) => setEnrollmentID(e.target.value?.toUpperCase()?.trim())}
        required
      />
      <Select
        isRequired
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        labelPlacement="outside"
        label={"Set Status"}
        placeholder="Set enrollment status"
      >
        <SelectItem value="Opened" key={"Opened"}>
          Opened
        </SelectItem>
        <SelectItem value="Closed" key={"Closed"}>
          Closed
        </SelectItem>
      </Select>

      <Input
        isRequired
        labelPlacement="outside"
        maxLength={2}
        description="Note:Student Prefix must be exactly 2 characters"
        label={"   Student ID Prefix"}
        placeholder="Add new student ID prefix"
        value={studentIdPrefix}
        onChange={(e) =>
          setStudentIdPrefix(e.target.value?.toUpperCase()?.trim())
        }
        required
      />
      <Button
        type="submit"
        variant="flat"
        color="success"
        isLoading={submitting}
        isDisabled={submitting}
      >
        Add Enrollment
      </Button>
    </form>
  );
};

export default AddNewEnrollment;
