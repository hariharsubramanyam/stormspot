/**
 * Lead Author: Harihar
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
 * report_id: The id of the report (should be a randomly generated UUID)
 * poster: The ObjectId of the User who posted this report.
 * posted: The Date when this report was posted.
 * posted_from: The location (as GeoJSON) where this report was posted from.
 * upvoters: An array of ObjectIds of the Users who upvoted this report.
 * downvoters: An array of ObjectIds of the Users who downvoted this report.
 * storm_type: The type of the storm (see ./storm_type.js)
 * severity_level: The type of the storm (see ./severity_level.js)
 * content: The text content of the report.
 */
var ReportSchema = mongoose.Schema({
  report_id: {type: String, index: true, unique: true},
  poster: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  posted: {type: Date, default: Date.now},
  posted_from: {type: Object, index: '2dsphere'},
  upvoters: [String],
  downvoters: [String],
  storm_type: StormType,
  severity_level: SeverityLevel,
  content: String
});
var Report = mongoose.model("Report", ReportSchema);

module.exports.Report = Report;
