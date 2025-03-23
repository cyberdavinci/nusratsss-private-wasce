import connect from "@/utils/db";
import Token from "@/models/Token";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
// Get request
export const GET = async (request) => {
  let filter = request.nextUrl.searchParams.get("filter");
  // let filter = "unused";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  await connect();
  const session = await getServerSession(authOptions);
  if (
    session &&
    (session?.user?.role == "admin" || session?.user?.role == "subscriber")
  ) {
    try {
      filter = filter === "all" ? "" : filter;
      // console.log(filter);
      const tokens = await Token.find({}).sort({ _id: -1 });
      // const tokens = await Token.find(
      //   filter !== "" ? { status: filter } : {}
      // ).sort({ _id: -1 });
      return new NextResponse(JSON.stringify(tokens), { status: 200 });
    } catch (err) {
      return new NextResponse(err, { status: 500 });
    }
  } else {
    return new NextResponse(
      JSON.stringify({ message: "Sorry you are not allowed to do that" }),
      { status: 401 }
    );
  }
};

//generate token functions

// Post request
export const POST = async (request) => {
  const { numberOfTokens } = await request.json();
  const generateToken = async () => {
    const characters = "0123456789";
    const tokenLength = 14;

    let token = "";
    for (let i = 0; i < tokenLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
    return token;
  };
  await connect();
  // let newToken = await generateToken();
  const tokenPromises = Array.from({ length: numberOfTokens }, async () => {
    try {
      const token = await generateToken();
      // console.log(token);
      return { token };
    } catch (generateTokenError) {
      // console.error("Error generating token:", generateTokenError);
      throw generateTokenError;
    }
  });
  try {
    const resolvedTokens = await Promise.all(tokenPromises);
    const filteredTokens = resolvedTokens.filter(
      (token) => token !== null && token !== ""
    );
    // console.log(filteredTokens);
    const savedTokens = await Token.create(filteredTokens);
    return new NextResponse(JSON.stringify(savedTokens), { status: 201 });
  } catch (err) {
    return new NextResponse(err, { status: 500 });
  }
};
