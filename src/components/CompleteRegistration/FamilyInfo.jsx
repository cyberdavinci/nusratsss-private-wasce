import React from "react";

const FamilyInfo = ({ handleInputChange, info }) => {
  return (
    <div className="flex flex-col items-center flex-1">
      <h1 className=" text-4xl font-extrabold p-3">Parent/Guardian Info</h1>

      <form className="flex  gap-6 items-center flex-col w-full">
        <span className="text-[#bbb]  font-semibold uppercase italic">
          parent or guardian 1
        </span>
        <div className="flex flex-wrap w-full gap-3 justify-center">
          <div className="flex flex-col">
            <label htmlFor="">Name</label>
            <input
              type="text"
              className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none md:w-[250px] w-full"
              placeholder="parent or guardian"
              name="parent_guardian_name"
              required
              value={info.parent_guardian_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col  ">
            <label htmlFor="">Relationship to applicant</label>
            <select
              name="relationship_to_applicant"
              onChange={handleInputChange}
              value={info.relationship_to_applicant}
              id=""
              className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none  md:w-[250px] w-full"
              required
            >
              <option value="">Select relationship</option>
              <option value="Gambian">Father</option>
              <option value="Non-Gambian">Mother</option>
              <option value="Non-Gambian">Uncle</option>
            </select>
          </div>

          <div className="flex flex-col ">
            <label htmlFor="">Contact</label>
            <input
              type=""
              className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none md:w-[250px] w-full"
              placeholder="Contact"
              required
              name="contact_of_parent"
              value={info.contact_of_parent}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col  ">
            <label htmlFor="">Nationality</label>
            <select
              name="nationality_of_parent"
              onChange={handleInputChange}
              value={info.nationality_of_parent}
              id=""
              className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none  md:w-[250px] w-full"
              required
            >
              <option value="">Select nationality</option>
              {/* <option value="Gambian">4 years</option> */}
              <option value="Non-Gambian">Gambian</option>
              <option value="Non-Gambian">Non-Gambian</option>
            </select>
          </div>
        </div>
        <hr />
        {/* divider */}
        <span className="text-[#bbb]  font-semibold uppercase italic">
          parent or guardian 2
        </span>
        <div className="flex flex-wrap w-full gap-3 justify-center">
          <div className="flex flex-col  ">
            <label htmlFor="">Name of parent or guardian 2</label>
            <input
              type="text"
              className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none md:w-[250px] w-full"
              placeholder="parent or guardian 2"
              required
              name="parent_guardian_name_2"
              onChange={handleInputChange}
              value={info.parent_guardian_name_2}
            />
          </div>
          <div className="flex flex-col  ">
            <label htmlFor="">Relationship to applicant 2</label>
            <select
              name="relationship_to_applicant_2"
              onChange={handleInputChange}
              value={info.relationship_to_applicant_2}
              id=""
              className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none  md:w-[250px] w-full"
            >
              <option value="">Select relationship</option>
              <option value="Gambian">Father</option>
              <option value="Non-Gambian">Mother</option>
              <option value="Non-Gambian">Uncle</option>
            </select>
          </div>

          <div className="flex flex-col  ">
            <label htmlFor="">Contact</label>
            <input
              type=""
              className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none md:w-[250px] w-full"
              placeholder="Contact"
              required
              name="contact_of_parent_2"
              onChange={handleInputChange}
              value={info.contact_of_parent_2}
            />
          </div>
          <div className="flex flex-col  ">
            <label htmlFor="">Nationality</label>
            <select
              name="nationality_of_parent_2"
              onChange={handleInputChange}
              value={info.nationality_of_parent_2}
              id=""
              className=" bg-transparent text-[#bbb] font-extrabold border-teal-700 border-[2px] p-3 rounded-md outline-none  md:w-[250px] w-full"
            >
              <option value="">Select nationality</option>
              {/* <option value="Gambian">4 years</option> */}
              <option value="Non-Gambian">Gambian</option>
              <option value="Non-Gambian">Non-Gambian</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FamilyInfo;
