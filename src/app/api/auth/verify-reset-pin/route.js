import connect from "@/utils/db";
import User from "@/models/User";

import { NextResponse } from "next/server";

export const POST = async (request) => {
  //   const { id } = params;
  await connect();
  const { verificationPin } = await request.json();

  try {
    const student = await User.findOne({ resetToken: verificationPin });
    if (student) {
      return new NextResponse(student, { status: 200 });
    } else {
      return new NextResponse("error invalid token!", { status: 404 });
    }
  } catch (error) {
    return new NextResponse("Error validating reset code, server error", {
      status: 500,
    });
  }
};
