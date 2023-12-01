import connect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  //   const { id } = params;
  const { password, email } = await request.json();
  const updatedPassword = await bcrypt.hash(password, 5);
  await connect();
  try {
    await User.findOneAndUpdate(
      { email },
      {
        password: updatedPassword,
        resetToken: null,
      },
      { new: true }
    );
    return new NextResponse("password reset successfull", { status: 200 });
  } catch (error) {
    return new NextResponse("Error reseting password, server error", {
      status: 500,
    });
  }
};
