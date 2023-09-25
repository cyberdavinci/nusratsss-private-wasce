import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "student"],
      // default: "student",
    },
    route: {
      type: String,
    },
    token: {
      type: Number,
      default: null,
      unique: true,
      required: function () {
        return this.router === "register";
      },
    },
    subjects: [
      {
        type: String,
      },
    ],
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
    status: {
      type: String,
      enum: ["Pending", "Approved", "Deny"],
      default: "Pending",
    },
    hasCompletedRegistration: {
      type: Boolean,
      default: false,
    },
    nationality: {
      type: String,
      default: "",
    },
    place_of_birth: {
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
      type: Number,
      default: 0,
    },
  },

  { timestamps: true }
);
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
