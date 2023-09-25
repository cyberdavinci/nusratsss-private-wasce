import connect from "@/utils/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const PATCH = async (request) => {
  const { _id, address, occupation, phone, gender, subjects } =
    await request.json();

  await connect();
  try {
    // const updatedUser = await User.findByIdAndUpdate(
    //   _id,
    //   {
    //     address,
    //     occupation,
    //     phone,
    //     gender,
    //   },
    //   { new: true }
    // );
    console.log(_id);
    return new NextResponse("user updated", { status: 200 });
  } catch (err) {
    return new NextResponse(err, { status: 500, data: err });
  }
};
