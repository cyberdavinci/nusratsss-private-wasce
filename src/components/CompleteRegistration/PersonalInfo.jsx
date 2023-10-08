"use client";
import React from "react";
// import Select from "react-select";
import makeAnimated from "react-select/animated";
// import { useSession } from "next-auth/react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";

const PersonalInfo = ({
  handleInputChange,
  info,

  handleNext,
  currentForm,

  handlePrevious,
  isFormValid,
}) => {
  const { address, date_of_birth, nationality, gender, mobile, ethnicity } =
    info;

  const isValidForm = isFormValid({
    address,
    date_of_birth,
    nationality,
    gender,
    mobile,
    ethnicity,
  });
  const animatedComponents = makeAnimated();

  return (
    <div className="flex flex-col items-center w-full justify-center h-screen">
      <h1 className=" text-4xl font-extrabold p-3">Personal Info</h1>

      <form className="flex flex-col  gap-4 w-full  ">
        <div className="flex gap-3 flex-col md:flex-row w-full justify-center dark">
          <div className="flex flex-col">
            {/* <label htmlFor="">Date of Birth</label> */}
            <Input
              type="text"
              label="Date of birth"
              // className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none md:w-[200px] w-full"
              // placeholder="Date of birth"
              variant="bordered"
              // color="success"
              className="md:w-[200px] w-full"
              isRequired
              name="date_of_birth"
              value={date_of_birth}
              onChange={handleInputChange}
              color={date_of_birth ? "success" : null}
            />
          </div>
          <div className="flex flex-col">
            {/* <label htmlFor="">Nationality</label> */}
            <Select
              name="nationality"
              label="Select nationality"
              color={nationality ? "success" : null}
              // placeholder="Select an animal"
              value={nationality}
              className="md:w-[200px] w-full"
              onChange={handleInputChange}
              isRequired
            >
              {/* <option value="">Nationality</option> */}

              <SelectItem key={"Gambian"}>Gambian</SelectItem>
              <SelectItem key={"Non-Gambian"}>Non-Gambian</SelectItem>
            </Select>
          </div>

          <div className="flex flex-col">
            {/* <label htmlFor="">Gender</label> */}
            <Select
              name="gender"
              value={gender}
              label="Select Gender"
              className="md:w-[200px] w-full dark"
              // id=""
              // className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none md:w-[200px] w-full"
              isRequired
              onChange={handleInputChange}
              color={gender ? "success" : null}
            >
              {/* <option value="" className=" text-center">
                Select gender
              </option> */}
              {/* <option value="Male">Male</option>
              <option value="Female">Female</option> */}
              <SelectItem key={"Male"}>Male</SelectItem>
              <SelectItem key={"Female"}>Female</SelectItem>
            </Select>
          </div>
        </div>
        {/* divider */}
        <div className="flex gap-3 flex-col md:flex-row w-full justify-center">
          <div className="flex flex-col">
            {/* <label htmlFor="">Address</label> */}
            <Input
              type="text"
              variant="bordered"
              // className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none md:w-[200px] w-full"
              // placeholder="address"
              label={"Address"}
              className="md:w-[200px] w-full"
              isRequired
              name="address"
              value={address}
              onChange={handleInputChange}
              color={address ? "success" : null}
            />
          </div>
          <div className="flex flex-col">
            {/* <label htmlFor="">Mobile</label> */}
            <Input
              type="number"
              // className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md  md:w-[200px] w-full"
              // placeholder="Phone number
              className="md:w-[200px] w-full"
              label={"Phone number"}
              // required
              variant="bordered"
              isRequired
              name="mobile"
              value={mobile}
              onChange={handleInputChange}
              color={mobile ? "success" : null}
            />
          </div>
          <div className="flex flex-col">
            {/* <label htmlFor="">Ethnicity</label> */}

            <Select
              name="ethnicity"
              variant="flat"
              value={ethnicity}
              className="md:w-[200px] w-full  text-slate-900"
              color={ethnicity ? "success" : null}
              label="Select ethnicity"
              isRequired
              onChange={handleInputChange}
            >
              <SelectItem key={"gambian"}>Jola</SelectItem>
              <SelectItem key={"fula"}>Fula</SelectItem>
              <SelectItem key={"mandinka"}>Mandinka</SelectItem>
              <SelectItem key={"wolof"}>Wolof</SelectItem>
              <SelectItem key={"manjago"}>Manjago</SelectItem>
              <SelectItem key={"balanta"}>Balanta</SelectItem>
              <SelectItem key={"serer"}>Serer</SelectItem>
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

export default PersonalInfo;
