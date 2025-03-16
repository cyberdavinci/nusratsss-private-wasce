import mongoose from "mongoose";
import { Enrollment } from "./Enrollment";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "subscriber", "student"],
      default: "student",
    },
    route: {
      type: String,
    },
    token: {
      type: String,
      default: null,
      unique: false,
    },
    subjects: [
      {
        type: String,
      },
    ],
    userImg: {
      type: String,
      default: null,
    },
    enrollment: { type: mongoose.Schema.Types.ObjectId, ref: "Enrollment" },
    booksSelected: [
      {
        bookName: String,
        price: Number,
      },
    ],
    resetToken: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: "",
    },
    occupation: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    phone: {
      type: Number,
      default: "",
    },
    registrationStatus: {
      type: String,
      enum: ["complete", "incomplete"],
      default: "incomplete",
    },
    status: {
      type: String,
      default: function () {
        return this.registrationStatus === "complete" ? "Approved" : "Pending";
      },
      // default: "Pending",
    },

    nationality: {
      type: String,
      default: "",
    },
    date_of_birth: {
      type: String,
      default: "",
    },
    ethnicity: {
      type: String,
      default: "",
    },
    highest_level_of_education: {
      type: String,
      default: "",
    },
    year_of_completion: {
      type: String,
      default: "",
    },
    duration_of_study: {
      type: String,
      default: "",
    },
    marital_status: {
      type: String,
      default: "",
    },
    parent_guardian_name: {
      type: String,
      default: "",
    },
    relationship_to_applicant: {
      type: String,
      default: "",
    },
    contact_of_parent: {
      type: String,
      default: "",
    },
    nationality_of_parent: {
      type: String,
      default: "",
    },
    parent_guardian_name_2: {
      type: String,
      default: "",
    },
    relationship_to_applicant_2: {
      type: String,
      default: "",
    },
    contact_of_parent_2: {
      type: String,
      default: "",
    },
    nationality_of_parent_2: {
      type: String,
      default: "",
    },
    registration_ID: {
      type: String,
      // required: true,
    },
    booksSelected: [
      {
        bookName: String,
        price: Number,
      },
    ],
    assessments: {
      type: Array,
      default: [
        {
          subject: "",
          test_1_score: 0,
          test_2_score: 0,
          mock: 0,
          mean_score: 0,
          grade: "",
          total_marks_obtained: 0,
        },
      ],
    },
    total_test_1_score: {
      type: Number,
      default: 0,
    },
    total_test_2_score: {
      type: Number,
      default: 0,
    },
    total_mock_score: { type: Number },
    internalExamFee: {
      type: Number,
      default: 0,
    },
    studyFee: {
      type: Number,
      default: 0,
    },
    totalFee: {
      type: String,
      default: 0,
    },
    previousSchool: {
      type: String,
      default: "",
    },
    testimonial: {
      examination: { type: String },
      indexNumber: { type: String },
      responsibility: { type: String },
      extraActivities: { type: String },
      remarks: { type: String },
    },
    conduct: { type: String, default: "Very Good" },
    punctuality: { type: String, default: "Regular" },
    responsibility: { type: String, default: "Nil" },
    attitude: { type: String, default: "Postive" },
  },

  { timestamps: true },
  { createdAt: Date.now }
);

//hold here
// userSchema.pre("save", async function (next) {
//   // console.log(this.isNew);
//   if (this?.$isNew) {
//     try {
//       const lastUser = await this?.constructor.findOne(
//         {},
//         { registration_ID: 1 },
//         { sort: { _id: -1 } }
//       );
//       // console.log(lastUser);
//       const lastId = lastUser
//         ? parseInt(lastUser.registration_ID.substring(2), 10)
//         : 0;
//       // console.log(lastId);
//       const newId = (lastId + 1).toString().padStart(6, "0");
//       // console.log("New ID:" + newId);
//       this.registration_ID = `PW${newId}`;
//       this.isNew = true;
//     } catch (error) {
//       console.error("Error in pre-save hook:", error);
//       return next(error);
//     }
//   }
//   next();
// });

// userSchema.pre("save", async function (next) {
//   if (this.isNew) {
//     try {
//       // Get the current enrollment based on the year or other criteria
//       const enrollment = await Enrollment.findOne(
//         { status: "Opened" }, // Use 'Opened' enrollment as current active
//         // { enrollmentID: 1 },   // Only fetch the enrollmentID field
//         { sort: { enrollmentDate: -1 } } // Sort to get the latest enrollment if there are multiple 'Opened' enrollments
//       );

//       if (!enrollment) {
//         console.log(enrollment);
//         throw new Error("No active enrollment found");
//       }

//       // Fetch the last registered student for the given enrollment
//       const lastUser = await this.constructor.findOne(
//         { registration_ID: { $regex: `^${enrollment._id}` } }, // Match students from the same enrollment
//         { registration_ID: 1 },
//         { sort: { _id: -1 } } // Sort by _id to get the last inserted student
//       );

//       // Extract last registration ID number, or start from 0 if none found
//       const lastId = lastUser
//         ? parseInt(lastUser.registration_ID.split("-")[1], 10)
//         : 0;

//       // Create a new registration ID
//       const newId = (lastId + 1).toString().padStart(5, "0"); // 5-digit ID
//       // use the enrollment prefix field value from enrollment!
//       this.registration_ID = `${enrollment.enrollmentID}-${enrollment?.studentIdPrefix}${newId}`;
//     } catch (error) {
//       console.error("Error in pre-save hook:", error);
//       return next(error);
//     }
//   }
//   next();
// });

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
