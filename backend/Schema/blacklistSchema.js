const { Schema } = require("mongoose");
const BlacklistSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = { BlacklistSchema };
