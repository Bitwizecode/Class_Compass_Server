const { Schema, model } = require("mongoose");

const teacherSchema = new Schema(
  {
    school_id: {
      type: String,
      required: false,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    blood_group: {
      type: String,
      required: false,
    },
    aadhar_no: {
      type: String,
      required: false,
    },
    classes: {
      type: [{}],
      required: false,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    pin_code: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Enable virtual fields to be included in JSON output
  }
);

const Teacher = model("Teacher", teacherSchema);

module.exports = Teacher;
