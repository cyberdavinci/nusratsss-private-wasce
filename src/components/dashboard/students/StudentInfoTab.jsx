import React from "react";
import { Input, Button, Avatar } from "@nextui-org/react";
import UserAvatar from "/public/icons/avatar.png";
import Image from "next/image";
const StudentInfoTab = ({ updateStudentData, newData, setNewData }) => {
  return (
    <div>
      <div>
        <Image
          src={UserAvatar}
          alt="user avatar"
          className=" w-[175px] h-[200px] rounded-lg mb-2"
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
            className="w-0 opacity-0"
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
              />
              <Input
                label={"Full name"}
                placeholder="Enter full name"
                radius="none"
                color="success"
                variant="bordered"
                value={newData?.email}

                // className=" bg-black"
              />
              <Input
                label={"Full name"}
                placeholder="Enter full name"
                radius="none"
                color="success"
                variant="bordered"
                value={newData?.phome}
              />
              <Input
                label={"Full name"}
                placeholder="Enter full name"
                radius="none"
                color="success"
                variant="bordered"
                value={newData?.address}
              />
              <Input
                label={"Full name"}
                placeholder="Enter full name"
                radius="none"
                color="success"
                variant="bordered"
                value={newData?.date_of_birth}
              />
              <Input
                label={"Full name"}
                placeholder="Enter full name"
                radius="none"
                color="success"
                variant="bordered"
                value={newData?.marital_staus}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Input
                label={"Full name"}
                placeholder="Enter full name"
                radius="none"
                color="success"
                variant="bordered"
                value={newData?.occupation}
              />
              <Input
                label={"Full name"}
                placeholder="Enter full name"
                radius="none"
                color="success"
                variant="bordered"
                value={newData?.ethnicity}
              />
              <Input
                label={"Full name"}
                placeholder="Enter full name"
                radius="none"
                color="success"
                variant="bordered"
                value={newData?.previousSchool}
              />
              <Input
                label={"Full name"}
                placeholder="Enter full name"
                radius="none"
                color="success"
                variant="bordered"
                value={newData?.nationality}
              />
              <Input
                label={"Full name"}
                placeholder="Enter full name"
                radius="none"
                color="success"
                variant="bordered"
                value={newData?.highest_level_of_education}
              />
              <Input
                label={"Full name"}
                placeholder="Enter full name"
                radius="none"
                color="success"
                variant="bordered"
                value={newData?.year_of_completion}
              />
              <Input
                label={"Full name"}
                placeholder="Enter full name"
                radius="none"
                color="success"
                variant="bordered"
                value={newData?.contact_of_parent}
              />
            </div>
          </div>
          <div className="mt-5 flex  gap-2 md:w-[50%] w-full md:flex-row flex-col">
            <Button
              className="w-full"
              radius="none"
              variant="bordered"
              color="success"
            >
              Update
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
