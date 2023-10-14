"use client";
import React from "react";

import { Tabs, Tab, Card, CardBody, Input, Button } from "@nextui-org/react";
// import { GalleryIcon } from "./GalleryIcon";
// import { MusicIcon } from "./MusicIcon";
// import { VideoIcon } from "./VideoIcon";
import Image from "next/image";
import Link from "next/link";
// import { Input } from "postcss";

export default function AccountTab() {
  const [selected, setSelected] = React.useState("account");
  return (
    <div className="flex w-full flex-col max-w-[1000px]">
      <Tabs
        aria-label="Options"
        color="secondary"
        variant="bordered"
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab
          key="account"
          title={
            <div className="flex items-center space-x-1">
              {/* <GalleryIcon/> */}
              <Image
                width={25}
                height={25}
                src={"/icons/account/account.svg"}
              />
              <span>Account</span>
            </div>
          }
        >
          <p className=" float-right uppercase font-extrabold md:text-3xl text-xl">
            Registration Id: #<span>A0</span>
          </p>
          <div className="flex w-full mt-8 gap-5 text-xl flex-wrap">
            <div>
              <div className="flex gap-3 items-center">
                <p className=" font-semibold md:text-2xl">Name:</p>{" "}
                <span>Ebrima Touray</span>
              </div>
              <div className="flex gap-3 items-center">
                <p className=" font-semibold md:text-2xl">Email:</p>{" "}
                <span>ebrimaa2ray@gmail.com</span>
              </div>
            </div>
            <div>
              <div className="flex gap-3 items-center">
                <p className=" font-semibold md:text-2xl">Location:</p>
                <span>Manjai</span>
              </div>
              <div className="flex gap-3 items-center">
                <p className=" font-semibold md:text-2xl">
                  Application Status:
                </p>{" "}
                <span className=" bg-yellow-400 rounded px-2 text-yellow-600">
                  Pending
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
        </Tab>

        <Tab
          key="security"
          title={
            <div className="flex items-center space-x-1">
              <Image
                width={25}
                height={25}
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
              <Image width={25} height={25} src={"/icons/account/info.svg"} />
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
