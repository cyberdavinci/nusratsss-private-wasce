import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Enrollment from "@/models/Enrollment";

export const GET = async (req) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const enrollmentID = searchParams.get("enrollmentID");

    const filter = enrollmentID ? { enrollment: enrollmentID } : {};

    // Fetch user stats
    const totalUsers = await User.countDocuments(filter);
    const adminCount = await User.countDocuments({ ...filter, role: "admin" });
    const subscriberCount = await User.countDocuments({
      ...filter,
      role: "subscriber",
    });
    const studentCount = await User.countDocuments({
      ...filter,
      role: "student",
    });
    const completedRegistrations = await User.countDocuments({
      ...filter,
      registrationStatus: "complete",
    });
    const pendingRegistrations = await User.countDocuments({
      ...filter,
      registrationStatus: "incomplete",
    });

    // Nationality distribution
    const nationalityStats = await User.aggregate([
      { $match: filter },
      { $group: { _id: "$nationality", count: { $sum: 1 } } },
    ]);

    // Gender count
    const maleCount = await User.countDocuments({ ...filter, gender: "male" });
    const femaleCount = await User.countDocuments({
      ...filter,
      gender: "female",
    });

    // Employment status
    const workingCount = await User.countDocuments({
      ...filter,
      occupation: { $ne: "" },
    });

    // Age groups
    const ageGroups = await User.aggregate([
      { $match: filter },
      {
        $project: {
          age: { $subtract: [2025, { $toInt: "$date_of_birth" }] },
        },
      },
      {
        $bucket: {
          groupBy: "$age",
          boundaries: [0, 18, 25, 35, 50, 100],
          default: "Unknown",
          output: { count: { $sum: 1 } },
        },
      },
    ]);

    // Schools distribution
    const schoolStats = await User.aggregate([
      { $match: filter },
      { $group: { _id: "$previousSchool", count: { $sum: 1 } } },
    ]);

    // Monthly enrollments
    const monthlyEnrollments = await Enrollment.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$enrollmentDate" },
            month: { $month: "$enrollmentDate" },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    // Top nationalities
    const topNationalities = await User.aggregate([
      { $match: filter },
      { $group: { _id: "$nationality", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    // Growth trends (new registrations over time)
    const growthTrends = await User.aggregate([
      { $match: filter },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        adminCount,
        subscriberCount,
        studentCount,
        completedRegistrations,
        pendingRegistrations,
        nationalityStats,
        maleCount,
        femaleCount,
        workingCount,
        ageGroups,
        schoolStats,
        monthlyEnrollments,
        topNationalities,
        growthTrends,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching stats", error: error.message },
      { status: 500 }
    );
  }
};
