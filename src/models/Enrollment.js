import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  enrollmentID: { type: String, unique: true }, // e.g., PW2024
  enrollmentDate: { type: Date, default: Date.now },
  year: { type: String, default: new Date().getFullYear().toString() }, // Enrollment year
  status: { type: String, enum: ["Opened", "Closed"], default: "Closed" },
  studentIdPrefix: { type: String, required: true }, // New field for student ID prefix
});

export const Enrollment =
  mongoose.models.Enrollment || mongoose.model("Enrollment", enrollmentSchema);
