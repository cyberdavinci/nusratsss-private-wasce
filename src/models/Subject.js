import mongoose from "mongoose";

const subjectSchema = mongoose.Schema({
  subject: {
    type: String,
  },
});
module.exports =
  mongoose.models.Subject || mongoose.model("Subject", subjectSchema);
