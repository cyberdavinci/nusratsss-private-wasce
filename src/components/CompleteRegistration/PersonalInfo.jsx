"use client";
import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useSession } from "next-auth/react";
// const session = useSession();

const PersonalInfo = ({ handleInputChange, info, setInfo }) => {
  const { address } = info;
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];
  const subjectOptions = [
    { value: "math", label: "Math" },
    { value: "english", label: "English" },
    { value: "chemistry", label: "Chemistry" },
    { value: "physics", label: "Physics" },
    { value: "biology", label: "Biology" },
    { value: "agricultural science", label: "Agricultural Science" },
    { value: "geography", label: "Geography" },
    { value: "core science", label: "Core Science" },
    { value: "health science", label: "Health Science" },
  ];
  const animatedComponents = makeAnimated();
  // const handleInputChange = (event) => {
  //   setInfo((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  // };
  // console.log(info);

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
              value={info.date_of_birth}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Nationality</label>
            <select
              name="nationality"
              value={info.nationality}
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
              value={info.gender}
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
              value={info.mobile}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Ethnicity</label>

            <select
              name="ethnicity"
              value={info.ethnicity}
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
      </form>
    </div>
  );
};

export default PersonalInfo;
