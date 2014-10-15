/**
 * This file defines the UserAuth model. There is exactly one UserAuth document for each user.
 *
 * Each UserAuth contains a username and a hash of their password.
 */

var mongoose = require("mongoose");

var UserAuthSchema = mongoose.Schema({
  username: {type: String, index: true, unique: true},
  hash_password: String
});
var UserAuth = mongoose.model("UserAuth", UserAuthSchema);

module.exports.UserAuth = UserAuth;
