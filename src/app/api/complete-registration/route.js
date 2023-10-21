import connect from "@/utils/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const PATCH = async (request) => {
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
  } = await request.json();

  await connect();
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
      },
      { new: true }
    );
    // console.log(updatedUser);
    return new NextResponse("registration complete", { status: 200 });
  } catch (err) {
    return new NextResponse(err, { status: 500, data: err });
  }
};
