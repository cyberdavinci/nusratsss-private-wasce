import connect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const PATCH = async (request) => {
  const { _id, email, password } = await request.json();

  await connect();
  const updatedPassword = await bcrypt.hash(password, 5);
  //   console.log(
  //     `Plain passs ${password} updated-hashed ${updatedPassword} Email ${email} id ${_id}`
  //   );
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
};
