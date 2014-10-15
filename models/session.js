// This file creates the Session model, which keeps track of usernames and their associated session
// ids.

var mongoose = require("mongoose");

var SessionSchema = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserAuth'},
  session_id: {type: String, index: true, unique: true}
});
var Session = mongoose.model("Session", SessionSchema);
module.exports.Session = Session;
