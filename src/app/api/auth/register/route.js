import connect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { name, email, password } = await request.json();
  // console.log(name, email, password);
  await connect();
  console.log("connected!");
  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    console.log("user created");
    return new NextResponse("user created", { status: 201 });
  } catch (err) {
    console.log("user not created");
    return new NextResponse("server error, please try again", { status: 500 });
  }
};
