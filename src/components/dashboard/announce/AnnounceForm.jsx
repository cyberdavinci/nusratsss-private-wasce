"use client";
import React from "react";
import {
  Avatar,
  Button,
  Select,
  SelectItem,
  SelectSection,
  Textarea,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { users } from "./data";
const AnnounceForm = () => {
  return (
    <form className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Send Announcements</h1>
      <Autocomplete
        defaultItems={users}
        // label="Send to"
        placeholder="search and Select user"
        labelPlacement="inside"
        className="w-full"
      >
        {(user) => (
          <AutocompleteItem key={user.id} textValue={user.name.toLowerCase()}>
            <div className="flex gap-2 items-center">
              <Avatar
                alt={user.name}
                className="flex-shrink-0"
                size="sm"
                src={user.avatar}
              />
              <div className="flex flex-col">
                <span className="text-small">{user.name}</span>
                <span className="text-tiny text-default-400">{user.email}</span>
              </div>
            </div>
          </AutocompleteItem>
        )}
      </Autocomplete>
      <Textarea
        label="Message"
        placeholder="Enter your message here"
        className="w-full border-none"
        variant="flat"
        classNames={{ input: "border-none" }}
      />
      <Button color="success" variant="ghost">
        Send
      </Button>
    </form>
  );
};

export default AnnounceForm;
