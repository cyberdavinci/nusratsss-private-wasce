import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// fetch user
export const GET = async (request) => {
  await connect();

  try {
    const users = await User.find({}).select("-password");
    return new NextResponse(users, { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};

// add new user
export const POST = async (request) => {
  const { name, email, password, role } = await request.json();
  await connect();
  const hashedPassword = await bcrypt.hash(password, 5);
  const generateToken = async () => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const tokenLength = 9;

    let token = "";
    for (let i = 0; i < tokenLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
    return token;
  };
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    route: "create-user",
    role,
    token: await generateToken(),
  });

  try {
    await newUser.save();
    return new NextResponse("user created", { status: 201 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
