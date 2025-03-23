import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
// fetch user
export const GET = async (request) => {
  await connect();
  const session = await getServerSession(authOptions);
  if (
    session &&
    (session?.user?.role == "admin" || session?.user?.role == "subscriber")
  ) {
    try {
      const users = await User.find({
        role: { $in: ["admin", "subscriber"] },
      }).select("-password");
      // console.log(users);
      return new NextResponse(JSON.stringify(users), { status: 200 });
    } catch (error) {
      return new NextResponse(error, { status: 500 });
    }
  } else {
    return new NextResponse(
      JSON.stringify({ message: "Sorry you are not allowed to do that" }),
      { status: 401 }
    );
  }
};

// add new user
export const POST = async (request) => {
  const session = await getServerSession(authOptions);
  const { name, email, password, role } = await request.json();
  await connect();
  if (
    session &&
    (session?.user?.role == "admin" || session?.user?.role == "subscriber")
  ) {
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
  }
  return new NextResponse(
    JSON.stringify({ message: "Sorry you are not allowed to do that" }),
    { status: 401 }
  );
};
export const DELETE = async (request) => {
  await connect();
  const id = await request.nextUrl.searchParams.get("id");

  const session = await getServerSession(authOptions);
  if (
    session &&
    (session?.user?.role == "admin" || session?.user?.role == "subscriber")
  ) {
    try {
      await User.findByIdAndDelete(id);
      return new NextResponse("user deleted successfuly", { status: 200 });
    } catch (err) {
      return new NextResponse("server error! cannot delete user", {
        status: 500,
      });
    }
  } else {
    return new NextResponse(
      JSON.stringify({ message: "Sorry you are not allowed to do that" }),
      { status: 401 }
    );
  }
};
