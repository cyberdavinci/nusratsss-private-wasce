import connect from "@/utils/db";
import User from "@/models/User";
import Token from "@/models/Token";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { token } = await request.json();
  await connect();

  const newUser = new User({
    token,
  });
  try {
    return NextResponse("", { status: 500 });
  } catch (error) {
    return NextResponse("", { status: 500 });
  }
};
