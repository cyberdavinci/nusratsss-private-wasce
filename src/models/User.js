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
  },
  { timestamps: true }
);
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
