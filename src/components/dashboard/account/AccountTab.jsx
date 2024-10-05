"use client";
import React, { useEffect } from "react";

import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Input,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AccountTabInfo from "./AccountTabInfo";
import useSWR from "swr";
// import AssessmentsTable from "./AssessmentsTable";
import ApplicationFormModal from "./ApplicationFormModal";
const fetcher = (...args) =>
  fetch(...args).then(async (res) => await res.json());

//
export default function AccountTab() {
  //
  const session = useSession();
  const router = useRouter();
  const id = session.data?.user?._id;
  const [selected, setSelected] = React.useState("account");

  // console.log(userId);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data, isLoading, isError } = useSWR(
    `/api/others/students/${id}`,
    fetcher
  );
  //
  useEffect(() => {
    if (
      data !== undefined &&
      data !== null &&
      data.registrationStatus === "incomplete" &&
      data?.role === "student"
    )
      router.replace("/complete-registration");
  }, [session.status, router, data]);
  useEffect(() => {
    // onOpen();
    let isSubscribed = true;
    if (isSubscribed) {
      onOpen();
    }
    return () => {
      isSubscribed = false;
    };
  }, []);
  //
  // console.log(data);
  return (
    <>
      <div className="flex w-full flex-col ">
        <Tabs
          aria-label="Options"
          color="success"
          variant="bordered"
          selectedKey={selected}
          onSelectionChange={setSelected}
        >
          <Tab
            key="account"
            title={
              <div className="flex md:items-center items-start md:space-x-1">
                {/* <GalleryIcon/> */}
                <Image
                  width={20}
                  height={20}
                  src={"/icons/account/account.svg"}
                />
                <span>Account</span>
              </div>
            }
          >
            {isLoading ? (
              <div className="w-full flex items-center justify-center">
                <Spinner
                  label="loading your data..."
                  color="success"
                  size="lg"
                />
              </div>
            ) : (
              <>
                <div>
                  <div>
                    <Button
                      onClick={() => onOpen()}
                      className="mb-2"
                      color="success"
                      variant="flat"
                    >
                      View application form
                    </Button>
                    <p className=" uppercase font-extrabold md:text-2xl text-xl">
                      Student Id: #<span>{data?.registration_ID}</span>
                    </p>
                  </div>
                  <div className="flex w-full mt-8 gap-5  flex-wrap">
                    <div>
                      <div className="flex gap-3 items-center">
                        <p className=" font-semibold md:text-2xl ">Name:</p>{" "}
                        <span>{session?.data?.user?.name}</span>
                      </div>
                      <div className="flex gap-3 items-center">
                        <p className=" font-semibold md:text-2xl">Email:</p>{" "}
                        <span>{session?.data?.user?.email}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex gap-3 items-center">
                        <p className=" font-semibold md:text-2xl">Location:</p>
                        <span>{data?.address}</span>
                      </div>
                      <div className="flex gap-3 items-center">
                        <p className=" font-semibold md:text-2xl">
                          Application Status:
                        </p>{" "}
                        <span
                          className={`${
                            data?.registrationStatus === "complete"
                              ? " bg-green-700 text-green-300"
                              : "bg-yellow-400 text-yellow-800"
                          } rounded px-2`}
                        >
                          {data?.registrationStatus}d
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Tab>

          <Tab
            key="info"
            title={
              <div className="flex items-center space-x-1">
                {/* <VideoIcon/> */}
                <Image width={20} height={20} src={"/icons/account/info.svg"} />
                <span>Info</span>
              </div>
            }
          >
            <AccountTabInfo data={data} />
          </Tab>
          <Tab
            key="assessments"
            title={
              <div className="flex items-center space-x-1">
                {/* <VideoIcon/> */}
                {/* <Image width={20} height={20} src={"/icons/account/info.svg"} /> */}
                <span>Assessments</span>
              </div>
            }
          >
            <div className="flex flex-wrap">
              {/* <AssessmentsTable data={data} /> */}
            </div>
          </Tab>
        </Tabs>
        <ApplicationFormModal
          onOpen={onOpen}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isLoading={isLoading}
          data={data}
        />
      </div>
    </>
  );
}
