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
      // required: function () {
      //   return this.router === "register";
      // },
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
      default: "PW0",
    },
    // isNew: {
    //   type: Boolean,
    //   default: true,
    // },
    assessments: {
      type: Array,
      default: [
        { subject: "", test_1_score: "", test_2_score: "", test_3_score: "" },
      ],
    },
    totalFee: {
      type: String,
      default: "",
    },
  },

  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  // console.log(this.isNew);
  if (this?.$isNew) {
    try {
      const lastUser = await this?.constructor.findOne(
        {},
        { registration_ID: 1 },
        { sort: { _id: -1 } }
      );
      // console.log(lastUser);
      const lastId = lastUser
        ? parseInt(lastUser.registration_ID.substring(2), 10)
        : 0;
      // console.log(lastId);
      const newId = (lastId + 1).toString().padStart(6, "0");
      // console.log("New ID:" + newId);
      this.registration_ID = `PW${newId}`;
      this.isNew = true;
    } catch (error) {
      console.error("Error in pre-save hook:", error);
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
