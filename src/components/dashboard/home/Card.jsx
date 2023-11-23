"use client";

import React from "react";
import { Card, CardBody, Skeleton } from "@nextui-org/react";
import { useSession } from "next-auth/react";
const MyCard = ({ icon, text, text2, bg, colspan }) => {
  const session = useSession();
  // React.useEffect(() => {}, [
  //   router,
  //   session.status,
  //   session.data?.user?.role,
  //   expand,
  // ]);

  return (
    // max-w-[250px] w-[375px]
    <Card
      className={`card ${bg} ${colspan} w-full   md:px-6 px-3 rounded-xl h-[175px] text-white font-bold`}
    >
      {session.status === "loading" || session.status === "unauthenticated" ? (
        <Skeleton className="rounded-lg">
          <div className="md:py-10 py-5 rounded-lg bg-default-300"></div>
        </Skeleton>
      ) : (
        <CardBody className="md:py-10 py-5">
          <div>
            <div className="flex flex-col md:flex-row">
              {icon}
              <p>{text}</p>
            </div>
            <p className=" md:text-3xl text-xl">{text2}</p>
          </div>
        </CardBody>
      )}
    </Card>
  );
};

export default MyCard;
