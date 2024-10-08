import { Input, SelectItem, Select, Button } from "@nextui-org/react";
import React, { useState } from "react";

const Education = ({
  handleInputChange,
  info,
  currentForm,
  handlePrevious,

  handleNext,
  isFormValid,
}) => {
  const [err, setError] = useState("");
  const {
    occupation,
    highest_level_of_education,
    year_of_completion,
    duration_of_study,
    marital_status,
    previousSchool,
  } = info;
  const isValidForm = isFormValid({
    occupation,
    highest_level_of_education,
    year_of_completion,
    previousSchool,
    marital_status,
  });

  return (
    <div className="flex flex-col items-center  h-screen  w-full ">
      <h1 className=" text-4xl font-extrabold p-3">Education</h1>

      <span className="text-[#ff261b] pb-2 font-semibold">
        {/* {!isValidForm && "Please fill all the inputs!"} */}
      </span>

      <form className="flex gap-3 flex-col w-full  md:items-center ">
        <div className="flex md:flex-row flex-col   gap-3">
          <div className="flex flex-col ">
            <Input
              type="text"
              label={"Previous School"}
              className="md:w-[200px] w-full"
              isRequired
              name="previousSchool"
              value={previousSchool}
              onChange={handleInputChange}
              color={previousSchool ? "success" : null}
            />
          </div>
          <div className="">
            <Select
              name="highest_level_of_education"
              value={highest_level_of_education}
              label="Level of education"
              className="md:w-[200px] w-full dark"
              // id=""
              // className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none md:w-[200px] w-full"
              isRequired
              onChange={handleInputChange}
              color={highest_level_of_education ? "success" : null}
            >
              <SelectItem key={"wassce"}>Wassce</SelectItem>
              <SelectItem key={"gabece"}>Gabece</SelectItem>
              <SelectItem key={"college"}>College</SelectItem>
              <SelectItem key={"university"}>University</SelectItem>
              <SelectItem key={"tertiary"}>Tertiary</SelectItem>
              <SelectItem key={"other"}>Other</SelectItem>
            </Select>
          </div>

          <div className="flex flex-col  ">
            <Input
              type="text"
              // className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none md:w-[200px] w-full"
              // placeholder="address"
              label={"Year of completion"}
              className="md:w-[200px] w-full"
              isRequired
              name="year_of_completion"
              value={year_of_completion}
              onChange={handleInputChange}
              color={year_of_completion ? "success" : null}
            />
          </div>

          {/* <div className="w-full">
            <Select
              name="marital_status"
              value={marital_status}
              label="Select Marital Status"
              className="md:w-[200px] w-full dark"
              // id=""
              // className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none md:w-[200px] w-full"
              isRequired
              onChange={handleInputChange}
              color={marital_status ? "success" : null}
            >
              <SelectItem key={"single"}>Single</SelectItem>
              <SelectItem key={"married"}>Married</SelectItem>
            </Select>
          </div> */}
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
            onClick={() =>
              isValidForm
                ? handleNext()
                : setError(() => "Please fill in all inputs!")
            }
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Education;
