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
  // console.log(newUser);
  const newToken = new Token({
    token,
    isUsed: true,
  });
  try {
    // await Token.findOne({ $and: [{ token: token }, { isUsed: false }] }).then(
    //   async (token) => {
    //     if (token) await newToken.save();
    //   }
    // );
    await newToken.save();

    // return new NextResponse("token created", { status: 201 });
  } catch (err) {
    console.log("Invalid Token");
    return new NextResponse("Token is expired please purchase a new one", {
      status: 500,
    });
  }
  try {
    await newUser.save();
    // console.log("user created");
    return new NextResponse("user created", { status: 201 });
  } catch (err) {
    console.log("user not created");
    return new NextResponse("server error, please try again", { status: 500 });
  }
};
