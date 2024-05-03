const { Schema, model } = require("mongoose");

const studentSchema = new Schema(
  {
    school_id: {
      type: String,
      required: true,
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
      required: true,
    },
    parent_detail: {
      type: [{}],
      required: true,
    },
    aadhar_no: {
      type: String,
      required: true,
    },
    religion: {
      type: String,
      required: false,
    },
    cast: {
      type: String,
      required: false,
    },
    class: {
      type: String,
      required: true,
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

const Teacher = model("Teacher", studentSchema);

module.exports = Teacher;
