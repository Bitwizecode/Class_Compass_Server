const { Schema, model } = require("mongoose");

const whitelistedDriver = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    bus_no: {
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

const WHITELISTED_DRIVER = model("whitelistedDriver", whitelistedDriver);

module.exports = WHITELISTED_DRIVER;
