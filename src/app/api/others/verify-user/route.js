import connect from "@/utils/db";
import User from "@/models/User";
import sendEmail from "@/utils/mailer";

import { NextResponse } from "next/server";

export const POST = async (request) => {
  //   const { id } = params;
  await connect();
  const { email } = await request.json();
  const generateToken = async () => {
    const characters = "0123456789";
    const tokenLength = 6;

    let token = "";
    for (let i = 0; i < tokenLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
    return token;
  };
  try {
    const resetToken = await generateToken();
    const student = await User.findOneAndUpdate(
      { email },
      { resetToken: resetToken },
      { new: true }
    );
    if (student) {
      // console.log(student);
      sendEmail(email, resetToken);
      return new NextResponse(`verification pin sent to  ${email}`, {
        status: 200,
      });
    } else {
      return new NextResponse("error email not found!", { status: 404 });
    }
  } catch (error) {
    return new NextResponse("Error reseting password, server error", {
      status: 500,
    });
  }
};
