import connect from "@/utils/db";
import { Enrollment } from "@/models/Enrollment";
import { NextResponse } from "next/server";
import User from "@/models/User";

export async function updateStudentsWithEnrollmentID(id) {
  try {
    // Filter students based on the year, e.g., by checking the studentId
    const students = await User.find({ role: "student" }); // Assuming studentId starts with STU2023

    if (students.length === 0) {
      console.log("No students found for 2023.");
      return;
    }

    // Update each student with the enrollmentID 'PW2023'
    const bulkOps = students.map((student) => ({
      updateOne: {
        filter: { _id: student._id },
        update: { $set: { enrollment: id } },
      },
    }));

    // Execute bulk update
    await User.bulkWrite(bulkOps);

    console.log(`${students.length} students updated with enrollmentID ${id}.`);
  } catch (error) {
    console.error("Failed to update students:", error);
  }
}

export const POST = async (req, res) => {
  const enrollomentData = await req.json();
  await connect();

  try {
    const newEnrollment = new Enrollment(enrollomentData);
    // console.log(newEnrollment);
    await newEnrollment.save();
    return new NextResponse(
      JSON.stringify({ status: 201, message: "Enrollment added!" })
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        status: 400,
        message: "Error creating enrollment",
        error: err,
      })
    );
  }
};

// export const PUT = async (request, { params }) => {
//   const { status } = await request.json();
//   const { enrollmentId } = params;

//   try {
//     await connect();
//     const enrollment = await Enrollment.findByIdAndUpdate(
//       enrollmentId,
//       { status },
//       { new: true }
//     );

//     if (!enrollment) {
//       return new NextResponse("Enrollment not found", { status: 404 });
//     }

//     return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
//   } catch (err) {
//     return new NextResponse("Error updating enrollment", { status: 500 });
//   }
// };

export const GET = async (req) => {
  const id = await req.nextUrl.searchParams.get("id");
  await connect();
  try {
    const enrollments = await Enrollment.find({});

    if (!enrollments) {
      return new NextResponse("No enrollments found!", {
        status: 404,
        data: "no enrollments",
      });
    }

    return new NextResponse(JSON.stringify(enrollments), { status: 200 });
  } catch (err) {
    return new NextResponse("error getting enrollments", {
      status: 400,
      errorMessage: err,
    });
  }
};
