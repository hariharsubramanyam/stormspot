/**
 * This file defines the Report model.
 *
 * A report is made about a storm event.
 */

var mongoose = require("mongoose");

// Include the SeverityLevel type.
var SeverityLevel = require("./severity_level").SeverityLevel;

// Include the StormType type.
var StormType = require("./storm_type").StormType;

/**
 * The schema consists of:
 *
 * poster: The ObjectId of the User who posted this report.
 * posted: The Date when this report was posted.
 * posted_from: The location where this report was posted from.
 * upvoters: An array of ObjectIds of the Users who upvoted this report.
 * downvoters: An array of ObjectIds of the Users who downvoted this report.
 * storm_type: The type of the storm (see ./storm_type.js)
 * severity_level: The type of the storm (see ./severity_level.js)
 * content: The text content of the report.
 */
var ReportSchema = mongoose.Schema({
  poster: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  posted: {type: Date, default: Date.now},
  posted_from: location: {type: [Number], index: '2dsphere'},
  upvoters: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
  downvoters: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
  storm_type: StormType,
  severity_level: SeverityLevel,
  content: String
});
var Report = mongoose.model("Report", ReportSchema);

module.exports.Report = Report;
