import mongoose from "mongoose";

const tokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["used", "unused"],
      default: "unused",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Token || mongoose.model("Token", tokenSchema);
