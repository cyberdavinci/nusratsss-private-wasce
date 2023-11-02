import React from "react";
import { Input, Select, Button, SelectItem } from "@nextui-org/react";
const FamilyInfo = ({
  handleInputChange,
  info,
  handleNext,
  currentForm,
  handlePrevious,
  isFormValid,
}) => {
  const {
    parent_guardian_name,
    relationship_to_applicant,
    contact_of_parent,
    nationality_of_parent,
    parent_guardian_name_2,
    relationship_to_applicant_2,
    contact_of_parent_2,
    nationality_of_parent_2,
  } = info;
  const isValidForm = isFormValid({
    parent_guardian_name,
    relationship_to_applicant,
    contact_of_parent,
    nationality_of_parent,
  });
  return (
    <div className="flex flex-col items-center  h-screen justify-center w-full">
      <h1 className=" text-4xl font-extrabold p-3">Parent or Guardian Info</h1>

      <form className="flex  gap-6 items-center flex-col w-full">
        <span className="text-[#bbb]  font-semibold uppercase italic">
          parent or guardian 1
        </span>
        <div className="flex gap-3 flex-col md:flex-row w-full justify-center dark">
          <div className="flex flex-col">
            <Input
              type="text"
              variant="bordered"
              label={"Parent or guardian name"}
              className="md:w-[200px] w-full"
              isRequired
              name="parent_guardian_name"
              value={parent_guardian_name}
              onChange={handleInputChange}
              color={parent_guardian_name ? "success" : null}
            />
          </div>
          <div className="flex flex-col  ">
            <Select
              name="relationship_to_applicant"
              value={relationship_to_applicant}
              label="Select relationship"
              className="md:w-[200px] w-full dark"
              isRequired
              onChange={handleInputChange}
              color={relationship_to_applicant ? "success" : null}
            >
              <SelectItem key={"father"}>Father</SelectItem>
              <SelectItem key={"mother"}>Mother</SelectItem>
              <SelectItem key={"aunt"}>Aunt</SelectItem>
              <SelectItem key={"uncle"}>Uncle</SelectItem>
              <SelectItem key={"other"}>Other</SelectItem>
            </Select>
          </div>

          <div className="flex flex-col ">
            <Input
              type="text"
              variant="bordered"
              // className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none md:w-[200px] w-full"
              // placeholder="address"
              label={"Contact of parent"}
              className="md:w-[200px] w-full"
              isRequired
              name="contact_of_parent"
              value={contact_of_parent}
              onChange={handleInputChange}
              color={contact_of_parent ? "success" : null}
            />
          </div>
          <div className="flex flex-col  ">
            <Select
              name="nationality_of_parent"
              value={nationality_of_parent}
              label="Nationality of parent"
              className="md:w-[200px] w-full dark"
              // id=""
              // className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none md:w-[200px] w-full"
              isRequired
              onChange={handleInputChange}
              color={nationality_of_parent ? "success" : null}
            >
              <SelectItem key={"gambian"}>Gambian</SelectItem>
              <SelectItem key={"non-gambian"}>Non-Gambian</SelectItem>
            </Select>
          </div>
        </div>
        <hr />
        {/* divider */}
        <span className="text-[#bbb]  font-semibold uppercase italic">
          parent or guardian 2
        </span>
        <div className="flex gap-3 flex-col md:flex-row w-full justify-center dark">
          <div className="flex flex-col  ">
            <Input
              type="text"
              variant="bordered"
              // className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none md:w-[200px] w-full"
              // placeholder="address"
              label={"Parent or Guardian name 2"}
              className="md:w-[200px] w-full"
              name="parent_guardian_name_2"
              value={parent_guardian_name_2}
              onChange={handleInputChange}
              color={parent_guardian_name_2 ? "success" : null}
            />
          </div>
          <div className="flex flex-col  ">
            <Select
              name="relationship_to_applicant_2"
              value={relationship_to_applicant_2}
              label="Select relationship"
              className="md:w-[200px] w-full dark"
              // id=""
              // className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none md:w-[200px] w-full"

              onChange={handleInputChange}
              color={relationship_to_applicant_2 ? "success" : null}
            >
              <SelectItem key={"father"}>Father</SelectItem>
              <SelectItem key={"mother"}>Mother</SelectItem>
              <SelectItem key={"aunt"}>Aunt</SelectItem>
              <SelectItem key={"uncle"}>Uncle</SelectItem>
              <SelectItem key={"other"}>Other</SelectItem>
            </Select>
          </div>

          <div className="flex flex-col  ">
            <Input
              type="text"
              variant="bordered"
              // className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none md:w-[200px] w-full"
              // placeholder="address"
              label={"Contact of parent"}
              className="md:w-[200px] w-full"
              name="contact_of_parent_2"
              value={contact_of_parent_2}
              onChange={handleInputChange}
              color={contact_of_parent_2 ? "success" : null}
            />
          </div>
          <div className="flex flex-col  ">
            <Select
              name="nationality_of_parent_2"
              value={nationality_of_parent_2}
              label="Nationality of parent"
              className="md:w-[200px] w-full dark"
              // id=""
              // className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none md:w-[200px] w-full"

              onChange={handleInputChange}
              color={nationality_of_parent_2 ? "success" : null}
            >
              <SelectItem key={"gambian"}>Gambian</SelectItem>
              <SelectItem key={"non-gambian"}>Non-Gambian</SelectItem>
            </Select>
          </div>
        </div>
        <div className="flex w-full py-10 gap-4 justify-evenly">
          <Button
            variant="flat"
            color="success"
            size="lg"
            // className={`  ${
            //   currentForm === 1 ? " bg-slate-400" : "bg-teal-700"
            // } rounded-md py-3 md:w-[200px] w-full`}
            disabled={currentForm === 1}
            onClick={() => handlePrevious()}
          >
            Previous
          </Button>
          <Button
            variant="flat"
            color="success"
            size="lg"
            // className={` bg-teal-700 rounded-md py-3 md:w-[200px] w-full`}
            // disabled={currentForm === 5}
            onClick={() => (isValidForm ? handleNext() : null)}
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FamilyInfo;
