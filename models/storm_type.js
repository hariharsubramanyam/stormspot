/**
 * This file defines the StormType, which we can use in our Mongoose schemas.
 *
 * A StormType is simply a String which takes on one of the following values:
 *
 * "WIND", "STRONG_THUNDERSTORM", "HAIL", "TORNADO", "OTHER"
 */

// Define constants for each of the storm types.
var WIND = "WIND";
var STRONG_THUNDERSTORM = "STRONG_THUNDERSTORM";
var HAIL = "HAIL";
var TORNADO = "TORNADO";
var OTHER = "OTHER";

// Export the constants so the rest of the app can use them.
module.exports.WIND = WIND;
module.exports.STRONG_THUNDERSTORM = STRONG_THUNDERSTORM;
module.exports.HAIL = HAIL;
module.exports.TORNADO = TORNADO;
module.exports.OTHER = OTHER:

// Define the storm type to be a String in the enum [[WIND, STRONG_THUNDERSTORM, HAIL, TORNADO, 
// OTHER]
module.exports.StormType = {type: String, enum: [WIND, STRONG_THUNDERSTORM, HAIL, TORNADO, OTHER]};
