import connect from "@/utils/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
export const GET = async (request, { params }) => {
  await connect();
  const { id } = params;
  //   console.log(id);

  try {
    const student = await User.findById(id).select("-password");
    // console.log(students);
    return new NextResponse(JSON.stringify(student), { status: 200 });
  } catch (err) {
    return new NextResponse("failed to fetch student", { status: 500 });
  }
};
