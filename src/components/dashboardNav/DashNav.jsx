import React from "react";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
const DashNav = () => {
  return (
    <Tabs.Group
      aria-label="Tabs with underlin"
      style="underline"
      className="dark"
    >
      <Tabs.Item active icon={HiUserCircle} title="Profile"></Tabs.Item>
      <Tabs.Item icon={MdDashboard} title="Dashboard"></Tabs.Item>
      <Tabs.Item icon={HiAdjustments} title="Settings"></Tabs.Item>
      <Tabs.Item icon={HiClipboardList} title="Contacts"></Tabs.Item>
    </Tabs.Group>
  );
};

export default DashNav;
