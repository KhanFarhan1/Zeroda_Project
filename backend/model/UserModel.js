const { model } = require("mongoose");

const { UserSchema } = require("../Schema/UserSchema");

const UserModel = model("user", UserSchema);

module.exports = { UserModel };
