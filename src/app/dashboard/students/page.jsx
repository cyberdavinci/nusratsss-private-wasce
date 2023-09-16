import React from "react";

const Students = () => {
  return (
    <div className="mt-[30px]">
      {/* filter criteria, maybe think of more to add */}
      <div className="flex justify-between items-center text-xl font-semibold">
        <div>
          <input
            type="text"
            placeholder="search"
            className=" rounded-xl p-2 w-[300px]"
          />
        </div>
        <div className=" ">
          <select
            name=""
            id=""
            className="w-[300px] p-2 rounded-xl cursor-pointer"
          >
            <option value="">Math</option>
            <option value="">English</option>
            <option value="">Chemistry</option>
            <option value="">Physics</option>
            <option value="">Biology</option>
          </select>
        </div>
      </div>
      {/* filter criteria ends */}

      {/* Student table */}
      <div></div>
    </div>
  );
};

export default Students;
