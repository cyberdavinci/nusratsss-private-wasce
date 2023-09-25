import React from "react";

const Education = ({ handleInputChange, info }) => {
  return (
    <div className="flex flex-col items-center flex-1">
      <h1 className=" text-4xl font-extrabold p-3">Education</h1>

      {/* <span className="text-[#ff261b] pb-2 font-semibold">{errMsg}</span> */}
      <form className="flex  gap-6 justify-center flex-wrap w-full">
        <div className="flex flex-col ">
          <label htmlFor="">Occupation</label>
          <input
            type="text"
            className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none md:w-[250px] w-[300px]"
            placeholder="occupation"
            required
            name="occupation"
            value={info.occupation}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col   ">
          <label htmlFor="">Highes Level of Education</label>
          <select
            name="highest_level_of_education"
            value={info.highest_level_of_education}
            onChange={handleInputChange}
            id=""
            className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none  md:w-[250px] w-[300px]"
          >
            <option value="">Select a level of education</option>
            <option value="Gambian">Primary</option>
            <option value="Non-Gambian">Junior</option>
            <option value="Non-Gambian">Secondary</option>
          </select>
        </div>

        <div className="flex flex-col  ">
          <label htmlFor="">Year of completion</label>
          <input
            type="date"
            className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none md:w-[250px] w-[300px]"
            placeholder="Place of birth"
            required
            name="year_of_completion"
            value={info.year_of_completion}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="">Duration of Study</label>
          <select
            name="duration_of_study"
            value={info.duration_of_study}
            onChange={handleInputChange}
            id=""
            className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none  md:w-[250px] w-[300px]"
          >
            <option value="">Select duration of study</option>
            <option value="Gambian">4 years</option>
            <option value="Non-Gambian">5 years</option>
            <option value="Non-Gambian">6 years</option>
          </select>
        </div>

        <div className="flex flex-col  ">
          <label htmlFor="">Marital Status</label>

          <select
            name="marital_status"
            value={info.marital_status}
            onChange={handleInputChange}
            id=""
            className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none  md:w-[250px] w-[300px]"
          >
            <option value="">Select Marital Status</option>
            <option value="Fula">Single</option>
            <option value="Mandinka">Married</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Education;
