const { Schema, model } = require("mongoose");

const whitelistedStudent = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    class_std: {
      type: String,
      required: true,
    },
    school_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Enable virtual fields to be included in JSON output
  }
);

const WHITELISTED_STUDENT = model("whitelistedStudent", whitelistedStudent);

module.exports = WHITELISTED_STUDENT;
