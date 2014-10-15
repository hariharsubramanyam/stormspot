/**
 * This file defines the SeverityLevel, which we can use in our Mongoose schemas.
 *
 * A SeverityLevel is simply a String which takes on one of the following values:
 *
 * "NORMAL", "SEVERE", "DESTRUCTIVE"
 */

// Define constants for each of the severity levels.
var NORMAL = "NORMAL";
var SEVERE = "SEVERE";
var DESTRUCTIVE = "DESTRUCTIVE";

// Export the constants so the rest of the app can use them.
module.exports.NORMAL = NORMAL;
module.exports.SEVERE = SEVERE;
module.exports.DESTRUCTIVE = DESTRUCTIVE;

// Define the severity level to be a String in the enum [NORMAL, SEVERE, DESTRUCTIVE]
module.exports.SeverityLevel = {type: String, enum: [NORMAL, SEVERE, DESTRUCTIVE]};
