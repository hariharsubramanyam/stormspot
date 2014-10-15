/**
 * This file defines the User model. There is exactly one User document for each user.
 *
 * Each User contains a username and a hash of their password.
 */

var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  username: {type: String, index: true, unique: true},
  hash_password: String
});
var User = mongoose.model("User", UserSchema);

module.exports.User = User;
