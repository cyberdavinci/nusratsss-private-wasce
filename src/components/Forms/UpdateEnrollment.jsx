import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

const UpdateEnrollment = ({ data, closeModal, mutate }) => {
  const [enrollmentID, setEnrollmentID] = useState(data?.enrollmentID);
  const [status, setStatus] = useState(data?.status);
  const [studentIdPrefix, setStudentIdPrefix] = useState(data?.studentIdPrefix);
  const [submitting, setSubmitting] = useState(false);
  // console.log(data);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEnrollment = { enrollmentID, status, studentIdPrefix };
    console.log(newEnrollment);

    setSubmitting(true);
    try {
      const response = await fetch(`/api/others/enrollments/${data?._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newEnrollment, _id: data?._id }),
      });
      response?.status == 200 ? closeModal() : null;
      mutate("/api/others/enrollments");
      //   console.log(response);
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
        label={"Select Enrollment Status"}
        defaultSelectedKeys={[status]}
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
        label={"   Student ID Prefix"}
        description="Note: Student Prefix must be exactly 2 characters"
        placeholder="Add new student ID prefix"
        value={studentIdPrefix}
        maxLength={2}
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
        Update
      </Button>
    </form>
  );
};

export default UpdateEnrollment;
