import connect from "@/utils/db";
import User from "@/models/User";
import Token from "@/models/Token";
import { Enrollment } from "@/models/Enrollment";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { name, email, password, token, role } = await request.json();

  // console.log(request);
  await connect();

  const isUserExisting = await User.findOne({ email });
  // console.log(isUserExisting?.email);
  if (isUserExisting) {
    return new NextResponse(
      JSON.stringify({
        error: "Email already exist",
        status: 400,
        message: "Email already exist",
      }),
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  // const newUser = new User({
  //   name,
  //   email,
  //   password: hashedPassword,
  //   route: "register",
  //   token,
  //   role,
  // });
  let isTokenValid;
  // console.log(token);
  try {
    const enrollment = await Enrollment.findOne(
      { status: "Opened" }, // Use 'Opened' enrollment as current active
      { enrollmentID: 1, _id: 1, studentIdPrefix: 1 }, // Only fetch the enrollmentID field
      { sort: { enrollmentDate: -1 } } // Sort to get the latest enrollment if there are multiple 'Opened' enrollments
    );

    if (!enrollment) {
      return new NextResponse(
        JSON.stringify({
          message: "Please create a new enrollment",
          error: "Error no opened enrollment!",
          status: 400,
        })
      );
    }
    const lastUser = await User.findOne(
      { registration_ID: { $regex: `^${enrollment.enrollmentID}` } }, // Match students from the same enrollment
      { registration_ID: 1 },
      { sort: { _id: -1 } } // Sort by _id to get the last inserted student
    );
    const lastId = lastUser
      ? parseInt(lastUser.registration_ID.split("-")[1].substring(2), 10) // Extract the numeric part after "STU"
      : 0;
    // Create a new registration ID
    const newId = (lastId + 1).toString().padStart(5, "0"); // 5-digit ID
    // use the enrollment prefix field value from enrollment!
    const registration_ID = `${enrollment.enrollmentID}-${enrollment?.studentIdPrefix}${newId}`;

    // console.log(enrollment);
    // console.log(lastUser);
    // console.log(lastId);
    // console.log(registration_ID);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      route: "register",
      token,
      role,
      registration_ID,
      enrollment: enrollment?._id,
    });

    // console.log(newUser);
    isTokenValid = await Token.findOne({
      token,
      status: "unused",
    });
    // console.log(isTokenValid);

    if (!isTokenValid) {
      return new NextResponse(
        JSON.stringify({
          error: "Token already exist",
          status: 400,
          message: "Token already exist",
        }),
        { status: 400 }
      );
    }

    await newUser.save();
    await Token.findByIdAndUpdate(
      isTokenValid._id,
      { status: "used" },
      { new: true }
    );
    // // console.log(newUser);
    isTokenValid.status = "used";
    await isTokenValid.save();

    // console.log("user created");
    return new NextResponse(
      JSON.stringify({ message: "user created", status: 201 }),
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    // if there is an error during registration user will not be saved but token will be
    // so to avoid that we change the status of the token back to unused
    await Token.findByIdAndUpdate(
      isTokenValid._id,
      { status: "unused" },
      { new: true }
    );
    return new NextResponse(
      JSON.stringify({
        error: err,
        status: 500,
        message: "Error registering please try again or contact admin",
      }),
      { status: 500 }
    );
  }
};
