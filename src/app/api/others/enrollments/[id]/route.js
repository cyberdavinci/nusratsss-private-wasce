import connect from "@/utils/db";
import { Enrollment } from "@/models/Enrollment";
import { NextResponse } from "next/server";

export const PATCH = async (req, res) => {
  const { _id, enrollmentDate, enrollmentID, status, studentIdPrefix, year } =
    await req.json();
  await connect();

  try {
    const existingEnrollment = await Enrollment.findByIdAndUpdate(
      _id,
      {
        enrollmentDate,
        enrollmentID,
        status,
        studentIdPrefix,
        year,
      },
      { new: true }
    );
    console.log(existingEnrollment);
    // await existingEnrollment.save();
    return new NextResponse(
      JSON.stringify({ status: 200, message: "Enrollment updated!" })
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        status: 400,
        message: "Error updating enrollment",
        error: err,
      })
    );
  }
};

export const GET = async (req) => {
  const id = await req.nextUrl.searchParams.get("id");
};
