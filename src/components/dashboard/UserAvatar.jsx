"use client";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
const UserAvatar = () => {
  const { data } = useSession();
  const name = data?.user?.name.split(" ");
  if (!data) return null;
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end" className="dark">
        <DropdownTrigger>
          <Avatar
            as="button"
            // size="lg"
            name={name[1]}
            //   src="https://images.unsplash.com/broken"
            radius="full"
            isBordered
            showFallback
            className={{ base: "float-right" }}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{data?.user?.email}</p>
          </DropdownItem>

          {/* <DropdownItem key="analytics">
          Analytics
        </DropdownItem> */}

          <DropdownItem key="logout" color="danger" onClick={signOut}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default UserAvatar;
