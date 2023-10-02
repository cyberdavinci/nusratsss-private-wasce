"use client";
import React from "react";

import { Tabs, Tab, Card, CardBody, Input } from "@nextui-org/react";
// import { GalleryIcon } from "./GalleryIcon";
// import { MusicIcon } from "./MusicIcon";
// import { VideoIcon } from "./VideoIcon";
import Image from "next/image";
import { Button } from "flowbite-react";
import Link from "next/link";
// import { Input } from "postcss";

export default function AccountTab() {
  const [selected, setSelected] = React.useState("account");
  return (
    <div className="flex w-full flex-col">
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
            <div className="flex items-center space-x-2">
              {/* <GalleryIcon/> */}
              <Image
                width={30}
                height={30}
                src={"/icons/account/accsettings.svg"}
              />
              <span>Account</span>
            </div>
          }
        >
          <div>
            <form className="flex flex-col gap-4">
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
              {/* <Input
                isRequired
                label="Location"
                placeholder="Enter your password"
                type="text"
              />
              <Input
                isRequired
                label="Location"
                placeholder="Enter your password"
                type="text"
              /> */}

              <div className="flex gap-2 justify-end">
                <Button fullWidth color="primary">
                  Save Changes
                </Button>
                <Button fullWidth color="primary">
                  Reset
                </Button>
              </div>
            </form>
          </div>
        </Tab>

        <Tab
          key="security"
          title={
            <div className="flex items-center space-x-2">
              <Image
                width={30}
                height={30}
                src={"/icons/account/security.svg"}
              />
              {/* <MusicIcon/> */}
              <span>Security</span>
            </div>
          }
        >
          <div>
            <form className="flex flex-col gap-4">
              <Input
                isRequired
                label="Current password"
                placeholder="Current password"
                type="password"
              />
              <Input
                isRequired
                label="New password"
                placeholder="New password"
                type="password"
              />
              <Input
                isRequired
                label="Password"
                placeholder="Confirm password"
                type="password"
              />

              <div className="flex gap-2 justify-end">
                <Button fullWidth color="primary">
                  Save Changes
                </Button>
                <Button fullWidth color="primary">
                  Reset
                </Button>
              </div>
            </form>
          </div>
        </Tab>

        <Tab
          key="info"
          title={
            <div className="flex items-center space-x-2">
              {/* <VideoIcon/> */}
              <Image width={30} height={30} src={"/icons/account/info.svg"} />
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
