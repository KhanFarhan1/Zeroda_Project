const { model } = require("mongoose");

const { PostionsSchema } = require("../Schema/PostionsSchema");

const PostionsModel = new model("postion", PostionsSchema);

module.exports = { PostionsModel };
