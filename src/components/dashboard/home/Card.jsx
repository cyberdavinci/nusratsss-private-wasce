"use client";
import { Card, CardBody } from "@nextui-org/react";
const MyCard = ({ icon, text, text2, bg, colspan }) => {
  return (
    // max-w-[250px] w-[375px]
    <Card
      className={`card ${bg} ${colspan} w-full   px-6 rounded-xl h-[175px] text-white font-bold`}
    >
      <CardBody className="py-10">
        <div>
          <div>
            {icon}
            <p>{text}</p>
          </div>
          <p className=" text-3xl">{text2}</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default MyCard;
