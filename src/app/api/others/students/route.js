import connect from "@/utils/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Enrollment } from "@/models/Enrollment";
// import { updateStudentsWithEnrollmentID } from "../enrollments/route";
//
export const GET = async (request, { params }, res) => {
  const selectedEnrollment = await request.nextUrl.searchParams.get(
    "enrollmentId"
  );
  // console.log(request.nextUrl.searchParams);
  const session = await getServerSession(authOptions);
  // console.log(session);
  await connect();

  if (session) {
    const currentEnrollment = await Enrollment.findOne(
      { status: "Opened" },

      { sort: { _id: -1 } }
    );
    // console.log(currentEnrollment);
    const page = request.nextUrl.searchParams.get("page");

    const search = request.nextUrl.searchParams.get("search") || "";
    const limit = request.nextUrl.searchParams.get("limit") || "";
    // console.log(page, limit, search);
    const query = {
      role: "student",
      enrollment: selectedEnrollment
        ? selectedEnrollment
        : currentEnrollment?._id,
    };
    if (search) {
      query.$or = [
        { name: { $regex: new RegExp(search, "i") } },
        { email: { $regex: new RegExp(search, "i") } },
        { token: { $regex: new RegExp(search, "i") } },
      ];
    }
    try {
      const students = await User.find(query)
        .skip((parseInt(page) - 1) * parseInt(limit))
        // .limit(parseInt(limit))
        .select("-password")
        .sort({ _id: -1 });
      // console.log(students);
      return new NextResponse(JSON.stringify(students), { status: 200 });
    } catch (err) {
      return new NextResponse("failed to fetch students", { status: 500 });
    }
  }
  return new NextResponse("unathorized access", { status: 401 });
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
