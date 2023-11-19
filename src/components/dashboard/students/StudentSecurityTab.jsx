import { Button, Input } from "@nextui-org/react";
import React from "react";

const StudentSecurityTab = ({
  updatingSecurity,
  updateStudentSecurity,
  newData,
}) => {
  const [readOnly, setReadOnly] = React.useState(true);
  const submitData = async (event) => {
    event.preventDefault();
    const password = event.target[0].value;
    const email = event.target[1].value;

    await updateStudentSecurity(email, password);
  };
  return (
    <div>
      <form onSubmit={submitData}>
        <div className="flex gap-4 md:flex-row ">
          <Input
            label={"Update password"}
            placeholder="Enter new password"
            radius="md"
            variant={`${readOnly ? "flat" : "bordered"}`}
            isReadOnly={readOnly}
          />

          <Input
            label={newData?.email}
            placeholder="Enter new email"
            radius="md"
            variant={`${readOnly ? "flat" : "bordered"}`}
            isReadOnly={readOnly}
          />
        </div>

        <div className="mt-5 flex  gap-2 md:w-[50%] w-full md:flex-row">
          <Button
            color="success"
            className="w-full"
            radius="md"
            variant="bordered"
            type="submit"
          >
            {updatingSecurity ? "Updating..." : "Update"}
          </Button>
          <Button
            className="w-full"
            radius="md"
            variant="bordered"
            color="warning"
            onClick={() => setReadOnly(false)}
          >
            Edit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StudentSecurityTab;
