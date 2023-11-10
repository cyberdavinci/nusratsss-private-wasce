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
}) => {
  // const [readOnly, setReadOnly] = Ract.useState(true);

  // console.log(newData);
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
          <div className="flex md:flex-row flex-col gap-3 w-full justify-between ">
            <div className="flex flex-col gap-2 w-full">
              <Input
                label={"Full name"}
                placeholder="Enter full name"
                radius="none"
                color="success"
                variant="bordered"
                value={newData?.name}
                onChange={(event) => handleInputChange(event)}
                name="name"
              />
              <Input
                label={"Email"}
                placeholder="Enter email"
                radius="none"
                color="success"
                variant="bordered"
                value={newData?.email}
                onChange={(event) => handleInputChange(event)}
                name="email"

                // className=" bg-black"
              />
              <Input
                label={"Phone"}
                placeholder="Enter phone"
                radius="none"
                color="success"
                variant="bordered"
                value={newData?.phone}
                onChange={(event) => handleInputChange(event)}
                name="phone"
              />
              <Input
                label={"Address"}
                placeholder="Enter address"
                radius="none"
                color="success"
                variant="bordered"
                value={newData?.address}
                onChange={(event) => handleInputChange(event)}
                name="address"
              />
              <Input
                label={"Date of birth"}
                placeholder="Enter date of birth"
                radius="none"
                color="success"
                variant="bordered"
                value={newData?.date_of_birth}
                onChange={(event) => handleInputChange(event)}
                name="date_of_birth"
              />
              <Input
                label={"Marital status"}
                placeholder="Enter marital status"
                radius="none"
                color="success"
                variant="bordered"
                value={newData?.marital_status}
                onChange={(event) => handleInputChange(event)}
                name="marital_status"
              />
              <Input
                label={"Occupation"}
                placeholder="Enter occupation"
                radius="none"
                color="success"
                variant="bordered"
                value={newData?.occupation}
                onChange={(event) => handleInputChange(event)}
                name="occupation"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Input
                label={"Ethnicity"}
                placeholder="Enter ethnicity"
                radius="none"
                color="success"
                variant="bordered"
                value={newData?.ethnicity}
                onChange={(event) => handleInputChange(event)}
                name="ethnicity"
              />
              <Input
                label={"Previous school"}
                placeholder="Enter previous school"
                radius="none"
                color="success"
                variant="bordered"
                value={newData?.previousSchool}
                onChange={(event) => handleInputChange(event)}
                name="previousSchool"
              />
              <Input
                label={"Nationality"}
                placeholder="Enter nationality"
                radius="none"
                color="success"
                variant="bordered"
                value={newData?.nationality}
                onChange={(event) => handleInputChange(event)}
                name="nationality"
              />
              <Input
                label={"Level of education"}
                placeholder="Enter level education"
                radius="none"
                color="success"
                variant="bordered"
                value={newData?.highest_level_of_education}
                onChange={(event) => handleInputChange(event)}
                name="highest_level_of_education"
              />
              <Input
                label={"Year of completion"}
                placeholder="Enter year of completion"
                radius="none"
                color="success"
                variant="bordered"
                value={newData?.year_of_completion}
                onChange={(event) => handleInputChange(event)}
                name="year_of_completion"
              />
              <Input
                label={"Contact of parent"}
                placeholder="Enter contact of parent"
                radius="none"
                color="success"
                variant="bordered"
                value={newData?.contact_of_parent}
                onChange={(event) => handleInputChange(event)}
                name="contact_of_parent"
              />
            </div>
          </div>
          <div className="mt-5 flex  gap-2 md:w-[50%] w-full md:flex-row flex-col">
            <Button
              className="w-full"
              radius="none"
              variant="bordered"
              color="success"
              type="submit"
              isLoading={updatingInfo}
            >
              {updatingInfo ? "Updating..." : "Update"}
            </Button>
            <Button
              className="w-full"
              radius="none"
              variant="bordered"
              color="warning"
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
