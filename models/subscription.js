/**
 * This file defines the Subscription model.
 *
 * A user can subscribe to receive text messages when there are severe storms near them.
 */

var mongoose = require("mongoose");

// Include the SeverityLevel type.
var SeverityLevel = require("./severity_level").SeverityLevel;

/**
 * The schema consists of:
 *
 * user: The _id of the User object which represents the user who has made this subscription.
 * phone_number: The phone_number to text.
 * severity_level: We only text this user about storms with a severity level >= severity_level
 * location: This is the user's location (as GeoJSON). 
 *           We text the user if there are storms near this location.
 */
var SubscriptionSchema = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  phone_number: String,
  severity_level: SeverityLevel,
  location: {type: Object, index: '2dsphere'}
});
var Subscription = mongoose.model("Subscription", SubscriptionSchema);

module.exports.Subscription = Subscription;
