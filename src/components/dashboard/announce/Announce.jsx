"use client";
import React from "react";
import Image from "next/image";
import useSWR from "swr";
import BroadCast from "public/icons/broadcast.svg";
import AnnouncedMessages from "./AnnouncedMessages";
import AnnounceForm from "./AnnounceForm";
const Announce = () => {
  return (
    <div className="flex items-start">
      <div className="flex-1">
        <Image
          src={BroadCast}
          className={`w-full h-full`}
          alt="broadcast page image"
        />
      </div>
      <div className="flex-1">
        <AnnounceForm />
        <div className=" overflow-y-auto h-96 mt-6">
          <AnnouncedMessages />
        </div>
      </div>
    </div>
  );
};

export default Announce;
