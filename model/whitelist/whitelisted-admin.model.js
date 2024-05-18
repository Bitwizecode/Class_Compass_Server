const { Schema, model } = require("mongoose");

const whitelistedAdmin = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    trust_name: {
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

const WHITELISTED_ADMIN = model("whitelistedAdmin", whitelistedAdmin);

module.exports = WHITELISTED_ADMIN;
