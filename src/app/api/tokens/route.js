import connect from "@/utils/db";
import Token from "@/models/Token";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const filter = request.nextUrl.searchParams.get("filter");
  await connect();
  // const query = { };

  try {
    const tokens = await Token.find({ status: filter });
    return new NextResponse(JSON.stringify(tokens), { status: 200 });
  } catch (err) {
    return new NextResponse(err, { status: 500 });
  }
};

//
export const POST = async (request) => {
  const { tokenAmount } = await request.json();
  await connect();

  const tokens = Array.from({ length: tokenAmount }, () => ({
    token: generateToken(),
  }));
  try {
    const savedTokens = await Token.create(tokens);
    return new NextResponse(JSON.stringify(savedTokens), { status: 201 });
  } catch (err) {
    return new NextResponse(err, { status: 500 });
  }
};
