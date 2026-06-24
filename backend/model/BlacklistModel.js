const { model } = require("mongoose");
const { BlacklistSchema } = require("../Schema/blacklistSchema");
const BlacklistModel = model("blacklist", BlacklistSchema);
module.exports = BlacklistModel;
