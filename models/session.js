/**
 * Lead Author: Harihar
 * This file creates the Session model, which stores a session for a given user.
 */

var mongoose = require("mongoose");

/**
 * The Session schema consists of a user (which is a pointer to a User model) and a session_id
 * which is a unique string identifying this particular session. The session_id values should
 * be randomly generated.
 */
var SessionSchema = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  session_id: {type: String, index: true, unique: true}
});
var Session = mongoose.model("Session", SessionSchema);
module.exports.Session = Session;
