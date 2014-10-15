// This class creates the UserAuth model, which associates a username with a hashed password.

var mongoose = require("mongoose");
var SeverityLevel = require("./severity_level").SeverityLevel;

var SubscriptionSchema = mongoose.Schema({
  subscriber: {type: String, index: true},
  phone_number: String,
  severity_level: SeverityLevel,
  location: {type: [Number], index: '2dsphere'}
});
var Subscription = mongoose.model("Subscription", SubscriptionSchema);

module.exports.Subscription = Subscription;
