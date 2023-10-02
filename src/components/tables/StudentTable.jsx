"use client";
import { Checkbox, Table } from "flowbite-react";
import { useState } from "react";
const StudentTable = () => {
  const data = [
    {
      id: 1,
      name: "Ebrahim",
      email: "ebrima@gmail.com",
      gender: "Male",
      status: "Approved",

      studentID: "000001",
      subjects: ["English", "Maths", "Chemistry", "Physics", "General S"],
    },
    {
      id: 2,
      name: "Kinneh",
      email: "kinneh@gmail.com",
      gender: "Female",
      status: "Pending",

      studentID: "000002",
      subjects: ["Arts", "Geography", "Chemistry", "Biology"],
    },
    {
      id: 3,
      name: "Halima",
      email: "halima@gmail.com",
      gender: "Female",
      status: "Pending",
      studentID: "000003",
      subjects: ["English", "Maths", "Biology"],
    },
    {
      id: 4,
      name: "Faal",
      email: "me@ousfaal.com",
      gender: "Male",
      status: "Pending",

      studentID: "000004",
      subjects: ["English", "Maths", "Physics", "Chemistry"],
    },
    {
      id: 5,
      name: "Samba",
      email: "samba@gmail.com",
      gender: "Male",
      status: "Pending",

      studentID: "000005",
      subjects: ["Government", "Geography", "Chemistry"],
    },
    {
      id: 6,
      name: "Fatima",
      email: "fatima@gmail.com",
      gender: "Female",
      status: "Approved",

      studentID: "000006",
      subjects: ["English", "Maths", "Biology"],
    },
    {
      id: 7,
      name: "Lena",
      email: "lena@gmail.com",
      gender: "Female",
      status: "Approved",

      studentID: "000007",
      subjects: ["English", "Maths", "Chemistry", "Geography"],
    },
  ];
  const [search, setSearch] = useState("");
  const [datas, setDatas] = useState(data);
  const [studentsList, setStudentsList] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isDropDown, setIsDropDown] = useState(false);
  const options = [
    { id: 1, label: "Maths" },
    { id: 2, label: "English" },
    { id: 3, label: "Biology" },
    { id: 4, label: "Chemistry" },
  ];

  const handleCheckboxChange = (optionId, optionValue) => {
    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(
        selectedOptions.filter((item) => {
          // console.log(item, optionId);
          return item !== optionId;
        })
      );
    } else {
      setSelectedOptions([...selectedOptions, optionId]);
    }
    // console.log(option?.label);
    const filterBySubjects = data.filter((student, index) =>
      student.subjects.includes(optionValue)
    );
    setDatas([...filterBySubjects]);
    console.log(optionValue);
  };
  const handleDropDown = () => {
    setIsDropDown((prev) => !prev);
  };
  const [optionsVisibility, setOptionsVisibility] = useState({});

  const toggleOptions = (studentId) => {
    // Toggle the visibility for the clicked student
    setOptionsVisibility((prevState) => ({
      ...prevState,
      [studentId]: !prevState[studentId] || false,
    }));
  };
  const handleSearch = (e) => {
    setSearch((prev) => e.target.value);
    const searchResults = data.filter(
      (student) =>
        student.name?.toLowerCase()?.includes(e.target.value) ||
        student.subjects.includes(e.target.value)
    );
    setStudentsList((prev) => [...searchResults]);
    // console.log(searchResults);
  };

  // console.log(optionsVisibility);

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        {/*  */}
        <div>
          <form action="" className="flex items-center gap-2">
            <input
              type="text"
              placeholder="search user"
              className="rounded-lg border-green-700 border-[3px] bg-transparent outline-[none]"
              value={search}
              onChange={(e) => handleSearch(e)}
            />
            <button className="bg-green-700 w-[200px] py-3 rounded-lg">
              Search
            </button>
          </form>
        </div>
        <div className="w-[200px] transition-all">
          <div className="dropdown relative w-full">
            <button
              className="dropdown-toggle bg-[#1F2937] w-[200px] py-3 rounded-lg"
              onClick={() => handleDropDown()}
            >
              Filter students
            </button>
            <div
              className={`dropdown-content absolute z-50 flex flex-col gap-3 bg-black w-full  rounded-lg  mt-2 ${
                isDropDown ? "block transition-all" : "hidden"
              }`}
            >
              <div>
                <button
                  onClick={() => {
                    setDatas([...data]);
                    setIsChecked(false);
                  }}
                  className="text-red-200 text-center w-full bg-red-700 rounded-t-lg"
                >
                  Reset filter
                </button>
                {options.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center gap-5 hover:bg-[#bbb] hover:text-[#1A1A24]  cursor-pointer p-2"
                  >
                    <input
                      type="checkbox"
                      value={option.label}
                      checked={selectedOptions.includes(option.id)}
                      onChange={(e) =>
                        search === ""
                          ? handleCheckboxChange(option.id, e.target.value)
                          : null
                      }
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
    </div>
  );
};
export default StudentTable;
