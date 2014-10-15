var NORMAL = "NORMAL";
var SEVERE = "SEVERE";
var DESTRUCTIVE = "DESTRUCTIVE";

module.exports.NORMAL = NORMAL;
module.exports.SEVERE = SEVERE;
module.exports.DESTRUCTIVE = DESTRUCTIVE;
module.exports.SeverityLevel = {type: String, enum: [NORMAL, SEVERE, DESTRUCTIVE]};
