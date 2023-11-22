"use client";
import { Card, CardBody } from "@nextui-org/react";
const MyCard = ({ icon, text, text2, bg, colspan }) => {
  return (
    // max-w-[250px] w-[375px]
    <Card
      className={`card ${bg} ${colspan} w-full   md:px-6 px-3 rounded-xl h-[175px] text-white font-bold`}
    >
      <CardBody className="md:py-10 py-5">
        <div>
          <div className="flex flex-col md:flex-row">
            {icon}
            <p>{text}</p>
          </div>
          <p className=" md:text-3xl text-xl">{text2}</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default MyCard;
