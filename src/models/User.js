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
      default: "student",
    },
    token: {
      type: Number,
      default: 0,
    },
    subjects: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
