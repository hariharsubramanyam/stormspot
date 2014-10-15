var WIND = "WIND";
var STRONG_THUNDERSTORM = "STRONG_THUNDERSTORM";
var HAIL = "HAIL";
var TORNADO = "TORNADO";
var OTHER = "OTHER";

module.exports.WIND = WIND;
module.exports.STRONG_THUNDERSTORM = STRONG_THUNDERSTORM;
module.exports.HAIL = HAIL;
module.exports.TORNADO = TORNADO;
module.exports.OTHER = OTHER:

module.exports.StormType = {type: String, enum: [WIND, STRONG_THUNDERSTORM, HAIL, TORNADO, OTHER]};
