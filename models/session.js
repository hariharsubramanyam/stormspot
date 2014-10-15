// This file creates the Session model, which keeps track of usernames and their associated session
// ids.

var mongoose = require("mongoose");

var SessionSchema = mongoose.Schema({
  username: {type: String, index: true, unique: true},
  session_id: {type: String, index: true, unique: true}
});
var Session = mongoose.model("Session", SessionSchema);
module.exports.Session = Session;
