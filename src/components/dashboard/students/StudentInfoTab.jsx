import React from "react";
import { Input, Button, Avatar } from "@nextui-org/react";
import UserAvatar from "/public/icons/avatar.png";
import Image from "next/image";
const StudentInfoTab = ({
  updateStudentData,
  newData,
  setNewData,
  handleInputChange,
  handleImageChange,
  userImg,
  updatingInfo,
  newPassword,
  setNewPassword,
}) => {
  const [readOnly, setReadOnly] = React.useState(true);
  const [initialSubjects, setInitialSubjects] = React.useState(
    newData?.subjects
  );
  const [newSub, setNewSub] = React.useState("");
  // console.log(newData);
  const handleSubjectInputChange = (e) => {
    setNewSub(e.target.value);
  };
  const updateSubjects = () => {
    setNewData((prev) => ({ ...prev, subjects: [...prev?.subjects, newSub] }));
    // console.log(newSub);
    setNewSub("");
  };
  // console.log(newData?.subjects);
  return (
    <div>
      <div>
        <Image
          src={newData?.userImg ? newData?.userImg : UserAvatar}
          alt="user avatar"
          className=" w-[175px] h-[200px] rounded-lg mb-2 object-contain"
          width={120}
          height={150}
          // fill={true}
        />

        <Button
          variant="flat"
          color="success"
          radius="none"
          className={"w-[175px]"}
        >
          <input
            type="file"
            name=""
            id="uploadData"
            onChange={(event) => handleImageChange(event)}
            className="w-0 opacity-0"
            accept="image/*"
          />
          <label htmlFor="uploadData" className="cursor-pointer">
            Upload New Photo
          </label>
        </Button>
      </div>
      <div className="flex items-center w-full mt-5">
        <form
          action=""
          className="flex flex-col  w-full md:items-start items-center"
          onSubmit={updateStudentData}
        >
          {/* left */}
          <div className="w-full ">
            <div className="flex md:flex-row flex-col gap-3 w-full justify-between ">
              <div className="flex flex-col gap-2 w-full">
                <Input
                  label={"Full name"}
                  placeholder="Enter full name"
                  radius="md"
                  variant={`${readOnly ? "flat" : "bordered"}`}
                  value={newData?.name}
                  onChange={(event) => handleInputChange(event)}
                  name="name"
                  isReadOnly={readOnly}
                />
                {/* <Input
                label={"Email"}
                placeholder="Enter email"
                radius="md"
                variant={`${readOnly ? "flat" : "bordered"}`}
                value={newData?.email}
                onChange={(event) => handleInputChange(event)}
                name="email"
                isReadOnly={readOnly}

                // className=" bg-black"
              /> */}
                <Input
                  label={"Phone"}
                  placeholder="Enter phone"
                  radius="md"
                  variant={`${readOnly ? "flat" : "bordered"}`}
                  value={newData?.phone}
                  onChange={(event) => handleInputChange(event)}
                  name="phone"
                  isReadOnly={readOnly}
                />
                <Input
                  label={"Address"}
                  placeholder="Enter address"
                  radius="md"
                  variant={`${readOnly ? "flat" : "bordered"}`}
                  value={newData?.address}
                  onChange={(event) => handleInputChange(event)}
                  name="address"
                  isReadOnly={readOnly}
                />
                <Input
                  label={"Date of birth"}
                  placeholder="Enter date of birth"
                  radius="md"
                  variant={`${readOnly ? "flat" : "bordered"}`}
                  value={newData?.date_of_birth}
                  onChange={(event) => handleInputChange(event)}
                  name="date_of_birth"
                  isReadOnly={readOnly}
                />
                <Input
                  label={"Marital status"}
                  placeholder="Enter marital status"
                  radius="md"
                  variant={`${readOnly ? "flat" : "bordered"}`}
                  value={newData?.marital_status}
                  onChange={(event) => handleInputChange(event)}
                  name="marital_status"
                  isReadOnly={readOnly}
                />
                <Input
                  label={"Occupation"}
                  placeholder="Enter occupation"
                  radius="md"
                  variant={`${readOnly ? "flat" : "bordered"}`}
                  value={newData?.occupation}
                  onChange={(event) => handleInputChange(event)}
                  name="occupation"
                  isReadOnly={readOnly}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                {/* <div>
                <Input
                  label={"New password"}
                  placeholder="Enter new password"
                  radius="md"
                  variant={`${readOnly ? "flat" : "bordered"}`}
                  // value={newData?.ethnicity}
                  onChange={(event) => handleInputChange(event)}
                  name="password"
                  isReadOnly={readOnly}
                />
                <p className="font-semibold ">{newData?.password}</p>
              </div> */}
                <Input
                  label={"Ethnicity"}
                  placeholder="Enter ethnicity"
                  radius="md"
                  variant={`${readOnly ? "flat" : "bordered"}`}
                  value={newData?.ethnicity}
                  onChange={(event) => handleInputChange(event)}
                  name="ethnicity"
                  isReadOnly={readOnly}
                />
                <Input
                  label={"Previous school"}
                  placeholder="Enter previous school"
                  radius="md"
                  variant={`${readOnly ? "flat" : "bordered"}`}
                  value={newData?.previousSchool}
                  onChange={(event) => handleInputChange(event)}
                  name="previousSchool"
                  isReadOnly={readOnly}
                />
                <Input
                  label={"Nationality"}
                  placeholder="Enter nationality"
                  radius="md"
                  variant={`${readOnly ? "flat" : "bordered"}`}
                  value={newData?.nationality}
                  onChange={(event) => handleInputChange(event)}
                  name="nationality"
                  isReadOnly={readOnly}
                />
                <Input
                  label={"Level of education"}
                  placeholder="Enter level education"
                  radius="md"
                  variant={`${readOnly ? "flat" : "bordered"}`}
                  value={newData?.highest_level_of_education}
                  onChange={(event) => handleInputChange(event)}
                  name="highest_level_of_education"
                  isReadOnly={readOnly}
                />
                <Input
                  label={"Year of completion"}
                  placeholder="Enter year of completion"
                  radius="md"
                  variant={`${readOnly ? "flat" : "bordered"}`}
                  value={newData?.year_of_completion}
                  onChange={(event) => handleInputChange(event)}
                  name="year_of_completion"
                  isReadOnly={readOnly}
                />
                <Input
                  label={"Contact of parent"}
                  placeholder="Enter contact of parent"
                  radius="md"
                  variant={`${readOnly ? "flat" : "bordered"}`}
                  value={newData?.contact_of_parent}
                  onChange={(event) => handleInputChange(event)}
                  name="contact_of_parent"
                  isReadOnly={readOnly}
                />
              </div>
            </div>
            <div className="mt-4">
              <h1 className="text-lg uppercase font-semibold">Subjects</h1>
              <ul className="flex gap-2 items-center flex-wrap">
                {newData?.subjects?.map((subject, index) => {
                  return (
                    <li
                      className="subCard rounded-lg text-center h-[50px] bg-slate-900 font-semibold flex items-center px-2"
                      key={index}
                    >
                      {subject}
                    </li>
                  );
                })}
                <Input
                  placeholder="add new subject"
                  radius="none"
                  value={newSub}
                  onChange={handleSubjectInputChange}
                  // label={"New subject"}
                  className="w-[280px] relative "
                  classNames={{
                    input: [
                      "bg-transparent",
                      "text-black/130 dark:text-white/90",
                      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    // innerWrapper: "h-[50px]",
                    innerWrapper: ["bg-transparent"],
                    inputWrapper: [
                      "shadow-xl",
                      "bg-default-200/50",
                      "dark:bg-default/60",
                      "backdrop-blur-xl",
                      "backdrop-saturate-200",
                      "hover:bg-default-200/70",
                      "dark:hover:bg-default/70",
                      "group-data-[focused=true]:bg-default-200/50",
                      "dark:group-data-[focused=true]:bg-default/60",
                      "!cursor-text",
                      "h-[50px]",
                      "rounded-sm",
                    ],
                  }}
                  labelPlacement="outside"
                  endContent={
                    <div
                      className="rtext-[30px] h-full w-[50px] bg-blue-900 text-white  flex items-center justify-center text-center cursor-pointer absolute right-0"
                      onClick={() => updateSubjects()}
                    >
                      <span>+</span>
                    </div>
                  }
                />
              </ul>
            </div>
          </div>
          <div className="mt-5 flex  gap-2 md:w-[50%] w-full md:flex-row flex-col">
            <Button
              color="success"
              className="w-full"
              radius="md"
              variant="bordered"
              type="submit"
              isLoading={updatingInfo}
              // onClick={() => {
              //   console.log(newData?.password);
              // }}
            >
              {updatingInfo ? "Updating..." : "Update"}
            </Button>
            <Button
              className="w-full"
              radius="md"
              variant="bordered"
              color="warning"
              onClick={() => setReadOnly(false)}
            >
              Edit
            </Button>
          </div>
          {/* rigth */}
        </form>
      </div>
    </div>
  );
};

export default StudentInfoTab;
