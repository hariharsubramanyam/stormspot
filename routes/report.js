/**
 * This file defines the routes for reports.
 *
 * make - Makes a report.
 * delete - Deletes a report.
 * mine - Returns the reports for the given user.
 * all - Returns all the reports.
 * range - Returns all the reports for a given starting timestamp and ending timestamp.
 * since - Returns all the reports since a given timestamp
 * before - Returns all the reports before a given timestamp
 */

var express = require("express");
var async = require("async");
var route_helper = require("./route_helper");
var Report = require("../models/report").Report;
var send_error = route_helper.send_error;
var get_post_args = route_helper.get_post_args;
var send_response = route_helper.send_response;
var authenticate = route_helper.authenticate;
var router = express.Router();
var mongoose;

/**
 * Creates a report for the given user.
 *
 * The request must be a POST, and the body must contain:
 *
 * session_id: The session id of the user making the report.
 * lat: The latitude of the location of the report.
 * lon: The longitude of the location of the report.
 * severity_level: Must be one of the constants defined in ../models/severity_level.js
 * storm_type: Must be one of the constants defined in ../models/storm_type.js
 * content: The text content of the report.
 *
 * The response is of the form:
 * {
 *  error: An error message, or null if there is no error,
 *  result: The object that represents the report.
 * }
 */
router.post("/make", function(req, res) {
  async.waterfall([
    // Step 1: Authenticate the user.
    function(callback) {
      authenticate(req, res, callback);
    },
    // Step 2: Extract parameters from the POST body.
    function(user_id, callback) {
      get_post_args(req, res, ["lat", 
        "lon", 
        "storm_type", 
        "severity_level", 
        "content"], function(err, args) {
          if (err) send_error(res, err);
          callback(null, args, user_id);
        });
    },
    // Step 3: If a very similar report already exists, don't create another.
    function(args, user_id, callback) {
      Report.findOne({
        "lat": args.lat,
        "lon": args.lon,
        "storm_type": args.storm_type,
        "severity_level": args.severity_level,
        "content": args.content
      }, function(err, result) {
        if (err) send_error(res, err);
        if (result) send_error(res, "This report already exists!");
        else callback(null, args, user_id);
      });
    },
    // Step 4: Create the report. 
    function(args, user_id, callback) {
      var report = new Report({
        "poster": user_id,
        "storm_type": args.storm_type,
        "severity_level": args.severity_level,
        "location": [args.lon, args.lat],
        "upvoters": [],
        "downvoters": [],
        "content": args.content
      });

      report.save(function(err, result) {
        if (err) send_error(res, err);
        send_response(res, result);
      });
    }
  ]);
});

module.exports.initialize = function(_mongoose) {
  mongoose = _mongoose;
  return router;
}
