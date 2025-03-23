import connect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const PATCH = async (request) => {
  const { _id, email, password } = await request.json();

  await connect();
  const session = await getServerSession(authOptions);
  if (
    session &&
    (session?.user?.role == "admin" || session?.user?.role == "subscriber")
  ) {
    const updatedPassword = await bcrypt.hash(password, 5);

    try {
      await User.findByIdAndUpdate(
        _id,
        {
          email,
          password: updatedPassword,
        },
        { new: true }
      );
      // console.log(updatedUser);
      return new NextResponse("registration complete", { status: 200 });
    } catch (err) {
      return new NextResponse(err, { status: 500, data: err });
    }
  } else {
    return new NextResponse(
      JSON.stringify({ message: "Sorry you are not allowed to do that" }),
      { status: 401 }
    );
  }
};
