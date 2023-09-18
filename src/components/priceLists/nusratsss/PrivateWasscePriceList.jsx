import React from "react";
const price_lists = [
  {
    oneYear: [
      { value: 4500, number_of_sub: 1 },
      { value: 5000, number_of_sub: 2 },
      { value: 6500, number_of_sub: 3 },
      { value: 7000, number_of_sub: 4 },
      { value: 7500, number_of_sub: 5 },
      { value: 8000, number_of_sub: 6 },
      { value: 8500, number_of_sub: 7 },
      { value: 9000, number_of_sub: 8 },
    ],
    twoYear: [
      { value: 9000, number_of_sub: 3 },
      { value: 9500, number_of_sub: 4 },
      { value: 10000, number_of_sub: 5 },
      { value: 11000, number_of_sub: 6 },
      { value: 11500, number_of_sub: 7 },
      { value: 12000, number_of_sub: 8 },
    ],
  },
];
const { oneYear, twoYear } = price_lists[0];
const PrivateWasscePriceList = () => {
  return (
    <div>
      <h1 className="text-center text-3xl font-medium">
        Private Studies Wassce Price List Nusrat
      </h1>
      <div className="flex gap-6 justify-around mt-7 ">
        <div>
          <h2 className="mb-2 font-semibold text-xl">One year Program</h2>
          <ul className="flex flex-wrap gap-5">
            {oneYear.map((price, index) => {
              return (
                <li
                  className="bg-[#1a1a24] w-[200px] h-[150px] items-center justify-center flex flex-col rounded-lg gap-3"
                  key={index}
                >
                  <span className=" text-xl font-extrabold">
                    D{price.value}
                  </span>
                  for
                  <span className=" text-xl font-extrabold">
                    {price.number_of_sub}{" "}
                    {price.value < 5000 ? "subject" : "subjects"}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        {/* <div>
          <h2 className="mb-2 font-semibold text-xl">Two year Program</h2>
          <ul className="flex  flex-wrap gap-5">
            {twoYear.map((price, index) => {
              return (
                <li className="bg-[#1a1a24] w-[200px] h-[150px] items-center justify-center flex flex-col rounded-lg gap-3">
                  <span className=" text-xl font-extrabold">
                    D{price.value}
                  </span>
                  for
                  <span className=" text-xl font-extrabold">
                    {price.number_of_sub}{" "}
                    {price.value < 5000 ? "subject" : "subjects"}
                  </span>
                </li>
              );
            })}
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default PrivateWasscePriceList;
