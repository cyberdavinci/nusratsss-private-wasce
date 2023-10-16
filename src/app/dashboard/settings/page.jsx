"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import SettingsModal from "@/components/dashboard/settings/SettingsModal";
const Settings = () => {
  return (
    <div>
      <SettingsModal />
      <div className=" mt-10">
        <ul>
          <li className="flex flex-col gap-5 items-center bg-slate-900 rounded-md w-[220px] p-8">
            <div className=" w-16 h-16 rounded-full bg-slate-400 flex items-center justify-center font-semibold text-xl text-slate-600">
              <h2>ET</h2>
            </div>
            <div>
              <div className="flex items-center justify-between gap-[6px] flex-wrap">
                <h2>Ebrima Touray</h2>

                <p>admin</p>
              </div>
              <p>ebrimaa2ray@gmail.com</p>
            </div>
            <div className="flex gap-[8px] flex-wrap justify-between w-full">
              <Button color="success" variant="ghost" size="sm">
                Edit
              </Button>
              <Button color="danger" variant="flat" size="sm">
                Delete
              </Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Settings;
