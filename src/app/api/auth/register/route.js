import connect from "@/utils/db";
import User from "@/models/User";
import Token from "@/models/Token";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { name, email, password, token, role } = await request.json();

  // console.log(request);
  await connect();

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    route: "register",
    token,
    role,
  });

  try {
    const isTokenValid = await Token.findOne({
      token,
      status: "unused",
    });
    if (!isTokenValid) {
      return new NextResponse("Invalid token", { status: 400 });
    }

    await newUser.save();

    isTokenValid.status = "used";
    await isTokenValid.save();

    // console.log("user created");
    return new NextResponse("user created", { status: 201 });
  } catch (err) {
    console.log(err);
    return new NextResponse("server error, please try again", { status: 500 });
  }
};
