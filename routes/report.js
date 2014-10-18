/**
 * This file defines the routes for reports.
 *
 * make - Makes a report.
 * delete - Deletes a report.
 * mine - Returns the reports for the given user.
 * all - Returns all the reports.
 * latest/:minutes - Returns all the reports at most :minutes minutes old.
 * near/:lat/:lon/:distance - Returns all the reports that are within :distance miles of :lat, :lon
 * view/:id - Return the report with the given ID.
 */

var express = require("express");
var async = require("async");
var route_helper = require("./route_helper");
var mailer = require("./mailer");
var uuid = require("node-uuid");
var Report = require("../models/report").Report;
var Subscription = require("../models/subscription").Subscription;
var constants = require("../models/constants");
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
          if (err) {
            send_error(res, err);
            callback(err);
          } else {
            callback(null, args, user_id);
          }
        });
    },
    // Step 3: Conver the lat/lon to numbers. If a very similar report already exists, 
    // don't create another.
    function(args, user_id, callback) {
      var error = null;
      try {
        args.lat = parseFloat(args.lat, 10);
        args.lon = parseFloat(args.lon, 10);
      } catch (err) {
        error = "The lat and lon parameters of the POST body must be numbers";
        send_error(res, error);
        callback(error);
      }
      if (!error) {
        Report.findOne({
          "posted_from.type": "Point",
          "posted_from.coordinates": [args.lon, args.lat],
          "storm_type": args.storm_type,
          "severity_level": args.severity_level,
          "content": args.content
        }, function(err, result) {
          if (err) {
            send_error(res, err);
            callback(err);
          }
          else if (result) {
            error = "This report already exists!";
            send_error(res, error);
            callback(error);
          }
          else {
            callback(null, args, user_id);
          }
        });
      }
    },
    // Step 4: Create the report. 
    function(args, user_id, callback) {
      var report = new Report({
        "poster": user_id,
        "storm_type": args.storm_type,
        "severity_level": args.severity_level,
        "posted_from": {
          "type": "Point",
          "coordinates": [args.lon, args.lat]
        },
        "upvoters": [],
        "downvoters": [],
        "content": args.content,
        "report_id": uuid.v4()
      });

      report.save(function(err, result) {
        if (err) {
          send_error(res, err);
          callback(err);
        } else {
          send_response(res, result);
          callback(null, report);
        }
      });
    },
    // Step 5: Warn all relevant subscribers about the new report
    function(report, callback){
      Subscription.find({"location": {$near: report.posted_from, $maxDistance: constants.MAX_RADIUS}},
        function(err, subscriptions){
          var emails = [];
          subscriptions.forEach(function(subscription){
            emails.push(subscription.phone_number + "@" + subscription.carrier);
          });
          var to = emails.join(",");
          var subject = "Alert";
          var text = "There has been a report of a storm near (" 
            + report.posted_from.coordinates[0] + "," + report.posted_from.coordinates[1]
            + ") with severity level " + report.severity_level + ".";
          if(emails.length > 0){
            mailer.mail(to, subject, text);
          }
      });
    }
  ]);
});

/**
 * Deletes a report with the given ID.
 *
 * The request is a POST. The body must contain:
 *
 * session_id: The session id of the user making the delete.
 * report_id: The id of the report to delete.
 *
 * The response is:
 * {
 *  error: An error message, or null if there is no error.
 *  result: true (if there is no error).
 * }
 */
router.post("/delete", function(req, res) {
  async.waterfall([
    // Step 1: Authenticate the user.
    function(callback) {
      authenticate(req, res, callback);
    },
    // Step 2: Extract parameters from the POST body.
    function(user_id, callback) {
      get_post_args(req, res, ["report_id"], function(err, args) {
        if (err) {
          send_error(res, err);
          callback(err);
        } else {
          callback(null, args, user_id);
        }
      });
    },
    // Step 3: Delete the report.
    function(args, user_id, callback) {
      Report.remove({"poster": user_id, "report_id": args.report_id}, function(err) {
        if (err) {
          send_error(res, err);
          callback(err);
        } else {
          send_response(res, true);
          callback(null);
        }
      });
    }
  ]);
});

/**
 * Returns the reports for the current user.
 *
 * The request is a POST. The body must contain:
 *
 * session_id: The session id of the user making the delete.
 *
 * The response is:
 * {
 *  error: An error message, or null if there is no error.
 *  result: [...] (array of the reports made by this user)
 * }
 */
router.post("/mine", function(req, res) {
  async.waterfall([
    // Step 1: Authenticate the user.
    function(callback) {
      authenticate(req, res, callback);
    },
    // Step 2: Return all the reports made by the current user.
    function(user_id, callback) {
      Report.find({"poster": user_id}, function(err, results) {
        if (err) {
          send_error(res, err);
          callback(err);
        } else {
          send_response(res, results);
          callback(null);
        }
      });
    }
  ]);
});

/**
 * Get all the reports.
 *
 * The request is a GET.
 *
 * The response is of the form:
 * {
 *  error: An error message, or null if there is no error.
 *  result: [...] (the array of the reports).
 * }
 */
router.get("/all", function(req, res) {
  Report.find({}, function(err, results) {
    if (err) {
      send_error(res, err);
    } else {
      send_response(res, results);
    }
  });
});

/**
 * Gets all the reports which are at most a number of minutes old.
 *
 * The request is a GET. the :minutes argument is the number of minutes to look back (ex. if 
 * minutes is 40, we return all reports which are at most 40 minutes old).
 *
 * The response is of the form:
 * {
 *  error: An error message, or null if there is no error.
 *  result: [...] (the array of the reports).
 * }
 */
router.get("/latest/:minutes", function(req, res) {
  try {
    var minutes = parseInt(req.params.minutes, 10);
    var timestamp = (new Date()).getTime() - minutes * 60 * 1000;
    timestamp = Math.max(0, timestamp);
    var date = new Date(timestamp);
    Report.find({"posted": {"$gte": date}}, function(err, results) {
      if (err) {
        send_error(res, err);
        callback(err);
      } else {
        send_response(res, results);
        callback(null);
      }
    });
  } catch (err) {
    var error = "The minutes must be a number.";
    send_error(res, error);
    callback(error);
  }
});

/**
 * Returns the reports that are within a given distance of a specific latitude and longitude. 
 *
 * The request must have:
 * :lat = latitude
 * :lon = longitude
 * :distance = the distance, in miles.
 *
 * The response is:
 * {
 *  error: An error message, or null if there is no error
 *  result: [...] (the array of reports)
 * }
 */
router.get("/near/:lat/:lon/:distance", function(req, res) {
  try {
    var lat = parseFloat(req.params.lat, 10);
    var lon = parseFloat(req.params.lon, 10);
    var distance = parseFloat(req.params.distance, 10);
    
    // Convert miles to meters.
    var NUM_METERS_IN_MILE = 1609.34;
    distance = distance * NUM_METERS_IN_MILE;
    Report.find({"posted_from": {"$near": {
      "$maxDistance": distance,
      "$geometry": {"type": "Point", "coordinates": [lon, lat] }
    }}}, 
    function(err, results) {
      if (err) {
        send_error(res, err);
      } else {
        send_response(res, results);
      }
    });
  } catch(err) {
    var error = "The latitude, longitude, and distance must be numbers.";
    send_error(res, error);
  }
});

/**
 * View the report with the given ID.
 *
 * The request has an :id part of the URL, which is the report id.
 *
 * The response will take the form:
 * {
 *  error: An error message, or null if there is no error
 *  result: The report.
 * }
 */
router.get("/view/:id", function(req, res) {
  var id = req.params.id;
  Report.find({"report_id": id}, function(err, results) {
    if (err) {
      send_error(res, err);
    } else {
      send_response(res, results);
    }
  }); 
});

module.exports.initialize = function(_mongoose) {
  mongoose = _mongoose;
  return router;
}
