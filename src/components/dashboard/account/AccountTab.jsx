"use client";
import React, { useEffect } from "react";

import { Tabs, Tab, Card, CardBody, Input, Button } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const fetcher = (...args) =>
  fetch(...args).then(async (res) => await res.json());
import useSWR from "swr";

//
export default function AccountTab() {
  //
  const session = useSession();
  const router = useRouter();
  const id = session.data?.user?._id;
  const [selected, setSelected] = React.useState("account");
  // console.log(userId);
  const { data, isLoading, isError } = useSWR(`/api/students/${id}`, fetcher);
  //
  useEffect(() => {
    if (
      data !== undefined &&
      data.registrationStatus === "incomplete" &&
      data?.role === "student"
    )
      router.replace("/complete-registration");
  }, [session.status, router, data]);

  //
  // console.log(data);
  return (
    <div className="flex w-full flex-col max-w-[1000px]">
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
              <Spinner label="loading your data..." color="success" size="lg" />
            </div>
          ) : (
            <>
              {" "}
              <p className=" uppercase font-extrabold md:text-2xl text-xl">
                Registration Id: #<span>{data?.registration_ID}</span>
              </p>
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
                    <span className=" bg-yellow-400 rounded px-2 text-yellow-600">
                      {data?.status}
                    </span>
                  </div>
                </div>
                {/* <form className="flex flex-col gap-4">
            <Input
              isRequired
              label="Email"
              placeholder="Enter your email"
              type="email"
            />
            <Input
              isRequired
              label="Location"
              placeholder="Location"
              type="text"
            />
         

            <div className="flex gap-2 justify-end">
              <Button fullWidth color="primary">
                Save Changes
              </Button>
              <Button fullWidth color="primary">
                Reset
              </Button>
            </div>
          </form> */}
              </div>
            </>
          )}
        </Tab>

        <Tab
          key="security"
          title={
            <div className="flex items-center space-x-1">
              <Image
                width={20}
                height={20}
                src={"/icons/account/security.svg"}
              />
              {/* <MusicIcon/> */}
              <span>Security</span>
            </div>
          }
        >
          <div>
            <form className="flex flex-col gap-4">
              <Input isRequired label="Current password" type="password" />
              <Input isRequired label="New password" type="password" />
              <Input isRequired label="Confirm password" type="password" />

              <div className="flex gap-3 justify-end">
                <Button color="success">Save Changes</Button>
                <Button color="danger" variant="flat">
                  Reset
                </Button>
              </div>
            </form>
          </div>
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
          <div>Info Tab</div>
        </Tab>
      </Tabs>
    </div>
  );
}
