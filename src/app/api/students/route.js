import connect from "@/utils/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
export const GET = async (request, { params }) => {
  await connect();
  const page =
    request.nextUrl.searchParams.get("page") < 1
      ? 1
      : request.nextUrl.searchParams.get("page");
  const search = request.nextUrl.searchParams.get("search");
  const limit = request.nextUrl.searchParams.get("limit");
  // console.log(page, limit, search);
  const query = { role: "student" };
  if (search) {
    query.$or = [
      { name: { $regex: new RegExp(search, "i") } },
      { email: { $regex: new RegExp(search, "i") } },
    ];
  }
  try {
    const students = await User.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .select("-password -role");
    // console.log(students);
    return new NextResponse(JSON.stringify(students), { status: 200 });
  } catch (err) {
    return new NextResponse("failed to fetch students", { status: 500 });
  }
};
