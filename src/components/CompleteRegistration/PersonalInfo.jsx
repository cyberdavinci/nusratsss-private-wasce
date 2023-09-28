"use client";
import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useSession } from "next-auth/react";
// const session = useSession();

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
    <div className="flex flex-col items-center w-full">
      <h1 className=" text-4xl font-extrabold p-3">Personal Info</h1>

      <form className="flex flex-col  gap-4 w-full">
        <div className="flex gap-3 flex-col md:flex-row w-full justify-center">
          <div className="flex flex-col">
            <label htmlFor="">Date of Birth</label>
            <input
              type="date"
              className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none md:w-[200px] w-full"
              placeholder="Date of birth"
              required
              name="date_of_birth"
              value={date_of_birth}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Nationality</label>
            <select
              name="nationality"
              value={nationality}
              id=""
              className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none md:w-[200px] w-full"
              onChange={handleInputChange}
            >
              <option value="">Nationality</option>
              <option value="Gambian">Gambian</option>
              <option value="Non-Gambian">Non-Gambian</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">Gender</label>
            <select
              name="gender"
              value={gender}
              id=""
              className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none md:w-[200px] w-full"
              onChange={handleInputChange}
            >
              <option value="" className=" text-center">
                Select gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        {/* divider */}
        <div className="flex gap-3 flex-col md:flex-row w-full justify-center">
          <div className="flex flex-col">
            <label htmlFor="">Address</label>
            <input
              type="text"
              className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none md:w-[200px] w-full"
              placeholder="address"
              required
              name="address"
              value={address}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Mobile</label>
            <input
              type="number"
              className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md  md:w-[200px] w-full"
              placeholder="Mobile"
              required
              name="mobile"
              value={mobile}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Ethnicity</label>

            <select
              name="ethnicity"
              value={ethnicity}
              id=""
              className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none md:w-[200px] w-full"
              onChange={handleInputChange}
            >
              <option value="">Ethnicity</option>
              <option value="Fula">Fula</option>
              <option value="Mandinka">Mandinka</option>
            </select>
          </div>
        </div>
        <div className="flex w-full py-10 gap-4 justify-evenly">
          <button
            className={`  ${
              currentForm === 1 ? " bg-slate-400" : "bg-teal-700"
            } rounded-md py-3 md:w-[200px] w-full`}
            disabled={currentForm === 1}
            onClick={() => handlePrevious()}
          >
            Previous
          </button>
          <button
            className={` bg-teal-700 rounded-md py-3 md:w-[200px] w-full`}
            // disabled={currentForm === 5}
            onClick={() => (isValidForm ? handleNext() : null)}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
