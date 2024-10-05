"use client";
import React from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import UsersList from "../UsersList";
import Enrollments from "../Enrollments";

const SettingsTabs = () => {
  const [selected, setSelected] = React.useState("users");

  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="settings list"
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab key="users" title="Users">
          <UsersList />
        </Tab>
        <Tab key="enrollments" title="Enrollments">
          <Enrollments />
        </Tab>
      </Tabs>
    </div>
  );
};

export default SettingsTabs;
