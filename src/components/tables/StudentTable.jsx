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
      <div className=" overflow-x-scroll rounded-lg">
        <Table hoverable className="dark">
          <Table.Head className="">
            <Table.HeadCell className="p-4">
              <Checkbox onClick={() => setCheckAll((prev) => !prev)} />
            </Table.HeadCell>
            <Table.HeadCell>name</Table.HeadCell>
            <Table.HeadCell>email</Table.HeadCell>
            <Table.HeadCell>gender</Table.HeadCell>
            <Table.HeadCell>status</Table.HeadCell>
            <Table.HeadCell>Subjects</Table.HeadCell>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Action</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {search === ""
              ? datas.map((student, index) => {
                  return (
                    <Table.Row
                      className=" dark:border-gray-700 dark:bg-gray-800"
                      key={student.id}
                    >
                      <Table.Cell className="p-4">
                        <Checkbox />
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {student.name}
                      </Table.Cell>
                      <Table.Cell>{student.email}</Table.Cell>
                      <Table.Cell>{student.gender}</Table.Cell>
                      <Table.Cell>{student.status}</Table.Cell>
                      <Table.Cell>
                        <ul>
                          {student.subjects.map((subject, index) => {
                            return <li key={index}>{subject}</li>;
                          })}
                        </ul>
                      </Table.Cell>
                      <Table.Cell>#{student.studentID}</Table.Cell>
                      <Table.Cell>
                        <div
                          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 relative cursor-pointer"
                          onClick={() => toggleOptions(index)}
                        >
                          <p>Action</p>
                          {optionsVisibility[index] && (
                            <div
                              className={`flex gap-2 flex-col  mt-2 absolute  left-[-4px] bg-slate-400 font-semibold  rounded-lg text-center`}
                            >
                              <p
                                className=" text-green-600 font-semibold hover:bg-green-900 hover:text-green-300 p-2 rounded-t-lg"
                                onClick={() => {
                                  console.log("Approve");
                                }}
                              >
                                Approve
                              </p>
                              <p
                                className=" text-red-500 font-semibold p-2 hover:bg-red-700 hover:text-red-300 rounded-b-lg"
                                onClick={() => {
                                  console.log("Approve");
                                }}
                              >
                                Deny
                              </p>
                            </div>
                          )}
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              : studentsList.map((student, index) => {
                  return (
                    <Table.Row
                      className=" dark:border-gray-700 dark:bg-gray-800"
                      key={student.id}
                    >
                      <Table.Cell className="p-4">
                        <Checkbox />
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {student.name}
                      </Table.Cell>
                      <Table.Cell>{student.email}</Table.Cell>
                      <Table.Cell>{student.gender}</Table.Cell>
                      <Table.Cell>{student.status}</Table.Cell>
                      <Table.Cell>
                        <ul>
                          {student.subjects.map((subject, index) => {
                            return <li key={index}>{subject}</li>;
                          })}
                        </ul>
                      </Table.Cell>
                      <Table.Cell>#{student.studentID}</Table.Cell>
                      <Table.Cell>
                        <div
                          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 relative cursor-pointer"
                          onClick={() => toggleOptions(index)}
                        >
                          <p>Action</p>
                          {optionsVisibility[index] && (
                            <div
                              className={`flex gap-2 flex-col  mt-2 absolute  left-[-4px] bg-slate-400 font-semibold  rounded-lg text-center`}
                            >
                              <p
                                className=" text-green-600 font-semibold hover:bg-green-900 hover:text-green-300 p-2 rounded-t-lg"
                                onClick={() => {
                                  console.log("Approve");
                                }}
                              >
                                Approve
                              </p>
                              <p
                                className=" text-red-500 font-semibold p-2 hover:bg-red-700 hover:text-red-300 rounded-b-lg"
                                onClick={() => {
                                  console.log("Approve");
                                }}
                              >
                                Deny
                              </p>
                            </div>
                          )}
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
export default StudentTable;
