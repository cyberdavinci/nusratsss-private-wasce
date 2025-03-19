import connect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const PATCH = async (request) => {
  // WHY DID I DO THISSSSSSSSS!
  const {
    _id,
    address,
    nationality,
    subjects,
    date_of_birth,
    gender,
    ethnicity,
    mobile,
    highest_level_of_education,
    year_of_completion,
    duration_of_study,
    occupation,
    marital_status,
    parent_guardian_name,
    relationship_to_applicant,
    contact_of_parent,
    nationality_of_parent,
    parent_guardian_name_2,
    relationship_to_applicant_2,
    contact_of_parent_2,
    nationality_of_parent_2,
    registrationStatus,
    assessments,
    totalFee,
    previousSchool,
    studyFee,
    internalExamFee,
    userImg,
    name,
    total_test_1_score,
    total_test_2_score,
    total_mock_score,
    conduct,
    punctuality,
    responsibility,
    attitude,
    testimonial,
    enrollment_date,
    date_of_completion,
    // email,
    // password,
  } = await request.json();

  // const assessments = subjects?.map((subject) => ({
  //   subject,
  //   test_1_score: "",
  //   test_2_score: "",
  //   test_3_score: "",
  // }));
  // console.log(
  //   total_test_1_score,
  //   total_test_2_score,
  //   total_mock_score,
  //   conduct
  // );
  await connect();
  // const updatedPassword = await bcrypt.hash(password, 5);
  // console.log(`Plain passs ${password} updated-hashed ${updatedPassword}`);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        address,
        nationality,
        subjects,
        date_of_birth,
        gender,
        ethnicity,
        phone: mobile,
        highest_level_of_education,
        year_of_completion,
        duration_of_study,
        occupation,
        marital_status,
        parent_guardian_name,
        relationship_to_applicant,
        contact_of_parent,
        nationality_of_parent,
        registrationStatus,
        parent_guardian_name_2,
        relationship_to_applicant_2,
        contact_of_parent_2,
        nationality_of_parent_2,
        assessments,
        totalFee,
        studyFee,
        internalExamFee,
        previousSchool,
        userImg,
        name,
        total_test_1_score,
        total_test_2_score,
        total_mock_score,
        conduct,
        punctuality,
        responsibility,
        attitude,
        enrollment_date,
        date_of_completion,
        testimonial,
        // email,
        // password: updatedPassword,
      },
      { new: true }
    );
    // console.log(updatedUser);
    return new NextResponse(
      JSON.stringify({ message: "success", data: updatedUser }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new NextResponse(err, { status: 500, data: err });
  }
};
