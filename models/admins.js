/**
 * This file defines the Admin model.
 *
 * Each Admin document simply contains an ObjectId of the user which is an admin.
 *
 * The API does not support creating, reading, updating, or deleting Admin objects (we don't want
 * users to be able to create Admins). CRUD operations on the Admin collection must be done using
 * the Mongo shell.
 *
 * The purpose of the Admin model is that some of the API calls (ex. seeing all the subscriptions)
 * should only be allowed by an admin.
 */

var mongoose = require("mongoose");

var AdminSchema = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserAuth'},
});

var Admin = mongoose.model("AdminSchema", AdminSchema);

module.exports.Admin = Admin;
