/**
 * This file defines the routes for subscriptions.
 *
 * (POST) /subscribe - Makes a subscription.
 * (DELETE) /subscribe/:subscription_id - Deletes a subscription.
 * (PUT) /subscribe/:subscription_id - Updates a subscription.
 * (GET) /subscribe - Returns all the subscriptions for a given user.
 */

var express = require("express");
var async = require("async");
var route_helper = require("./route_helper");
var mailer = require("../util/mailer");
var uuid = require("node-uuid");
var Subscription = require("../models/subscription").Subscription;
var send_error = route_helper.send_error;
var get_post_args = route_helper.get_post_args;
var send_response = route_helper.send_response;
var authenticate = route_helper.authenticate;
var router = express.Router();
var mongoose;

/**
 * Creates a subscription for the given user.
 *
 * The request must be a POST, and the body must contain:
 *
 * lat: The latitude of the location to monitor for the subscription.
 * lon: The longitude of the location to monitor for the subscription.
 * severity_level: Only notify the user about storms with severity >= severity_level
 * carrier: The email domain of the carrier of the user's phone (see ../models/carrier.js)
 * phone_number: The 10 digit phone number for the user.
 *
 * The session_id must be a cookie.
 *
 * The response is of the form:
 * {
 *  error: An error message, or null if there is no error,
 *  result: The object that represents the subscription.
 * }
 */
router.post("/", function(req, res) {
  async.waterfall([
    // Step 1: Authenticate the user.
    function(callback) {
      authenticate(req, res, callback);
    },
    //Step 2: Extract parameters form the POST body.
    function(user_id, callback) {
      get_post_args(req, res, ["phone_number",
        "carrier", 
        "severity_level",
        "lat", "lon"], 
        function(err, args) {
          if (err) {
            send_error(res, err);
            callback(err);
          } else {
            callback(null, args, user_id);
          }
      });
    },
    //Step 3: Convert the lat/lon to numbers. If a subscription with the same
    //user and location exists, then don't create another.
    function(args, user_id, callback){
      var error = null;
      try {
        args.lat = parseFloat(args.lat, 10);
        args.lon = parseFloat(args.lon, 10);
      } catch (err) {
        error = "The lat and lon parameters of the POST body must be numbers.";
        send_error(res, error);
      }
      if (!error) {
        Subscription.findOne({
          "user": user_id,
          "location.type": "Point",
          "location.coordinates": [args.lon, args.lat]
        }, function(err, result) {
            if (err) {
              send_error(res, err);
              callback(err);
            } else if(result) {
              error = "You already have a subscription in this location!";
              send_error(res, error);
              callback(error);
            } else {
              callback(null, args, user_id);
            }
        }) 
      }
    },
    //Step 4: Create a new subscription
    function(args, user_id, callback) {
      var subscription = new Subscription({
        "subscription_id": uuid.v4(),
        "user": user_id,
        "phone_number": args.phone_number,
        "carrier": args.carrier,
        "severity_level": args.severity_level,
        "location": {
          "type": "Point",
          "coordinates": [args.lon, args.lat]
        }
      });

      subscription.save(function(err, result) {
        if(err) {
          send_error(res, err);
          callback(err);
        } else {
          send_response(res, result);
          callback(null, args);
        }
      });
    },
    //Step 5: Send confirmation message of the subscription
    function(args, callback) {
      var to = args.phone_number + "@" + args.carrier;
      var subject = "Confirmation";
      var text = "You have succesfully subscribed to receive alerts of "
        + "weather conditions of severity level of at least " + args.severity_level
        + " near the location ( " + args.lat + ","
        + args.lon + ").";
      mailer.mail(to, subject, text);
      callback(null);
    }
  ]);
});

/**
 * Updates a subscription for the given user.
 *
 * The request must be a PUT, and the body must contain:
 *
 * subscription_id: The subscription id we aim to update.
 * lat: The latitude of the location to monitor for the subscription.
 * lon: The longitude of the location to monitor for the subscription.
 * severity_level: Only notify the user about storms with severity >= severity_level
 * carrier: The email domain of the carrier of the user's phone (see ../models/carrier.js)
 * phone_number: The 10 digit phone number for the user.
 *
 * The session_id must be a cookie.
 *
 * The response is of the form:
 * {
 *  error: An error message, or null if there is no error,
 *  result: true (if no error occured)
 * }
 */
router.put("/:subscription_id", function(req, res){
  async.waterfall([
    // Step 1: Authenticate the user.
    function(callback) {
      authenticate(req, res, callback);
    },
    // Step 2: Extract parameters from the POST body.
    function(user_id, callback) {
      get_post_args(req, res, ["phone_number",
        "carrier",
        "severity_level",
        "lat", "lon"],
        function(err, args) {
          var subscription_id = req.params.subscription_id;
          if (subscription_id === null || subscription_id === undefined) {
            err = "The URL must be of the form /subscribe/subscription_id";
          }
          args.subscription_id = subscription_id;
          if(err) {
            send_error(res, err);
            callback(err);
          } else {
            callback(null, args, user_id);
          }
      })
    },
    // Step 3: Find the subscription if it exists and update its
    // parameters
    function(args, user_id, callback){
      var error = null;
      try {
        args.lat = parseFloat(args.lat, 10);
        args.lon = parseFloat(args.lon, 10);
      } catch (err) {
        error = "The lat and lon parameters of the POST body must be numbers.";
        send_error(res, error);
        callback(error);
      }

      if (!error) {
        Subscription.update({"user": user_id, "subscription_id": args.subscription_id},
        {"phone_number": args.phone_number,
        "carrier": args.carrier,
        "severity_level": args.severity_level},
        function(err, numAffected) {
          if (err) {
            send_error(err);
            callback(err);
          } else {
            send_response(res, true);
            callback(null, args);
          }
        });
      }
    },
    // Step 4: Send confirmation message of a successful update
    function(args, callback) {
      var to = args.phone_number + "@" + args.carrier;
      var subject = "Confirmation";
      var text = "You have succesfully updated you subscription to receive alerts of "
        + "weather conditions of severity level of at least " + args.severity_level
        + " near the location ( " + args.lat + ","
        + args.lon + ").";
      mailer.mail(to, subject, text);
      callback(null);
    }
  ]);
});

/**
 * Delete the subscription with the given ID.
 *
 * The session_id must be a cookie.
 *
 * The subscription_id must be in the URL.
 *
 * The response is:
 * {
 *  error: An error message, or null if there is no error.
 *  result: true (if there is no error).
 * }
 */
router.delete("/:subscription_id", function(req, res) {
  async.waterfall([
    // Step 1: Authenticate the user.
    function(callback) {
      authenticate(req, res, callback);
    },
    // Step 2: Extract parameters from the POST body.
    function(user_id, callback) {
      var subscription_id = req.params.subscription_id;
      if (subscription_id === undefined || subscription_id === null) {
        var error = "The URL must contain a subscription_id";
        send_error(res, error);
        callback(error);
      } else  {
        callback(null, subscription_id, user_id);
      }
    },
    // Step 3: Find the subscription and send a confirmation message
    // of a successful delete
    function(subscription_id, user_id, callback){
      Subscription.findOne({"user": user_id, "subscription_id": subscription_id}, 
        function(err, subscription){
          if (err) {
            send_error(res, err);
            callback(err);
          } else {
            var to = subscription.phone_number + "@" + subscription.carrier;
            var subject = "Confirm delete"
            var text = "You have successfully deleted your subscription to "
              + subscription.phone_number + " at the location: (" 
              + subscription.location.coordinates[0] + ','
              + subscription.location.coordinates[1] + ').';
            mailer.mail(to, subject, text);
            callback(null, subscription_id, user_id);
          }
      });
    },
    // Step 4: Delete the report.
    function(subscription_id, user_id, callback) {
      Subscription.remove({"user": user_id, "subscription_id": subscription_id}, 
      function(err) {
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
 * Gets all the subscriptions for the current user.
 *
 * The session_id must be a cookie.
 *
 * The response is:
 * {
 *  error: An error message, or null if there is no error.
 *  result: [...] (an array of the subscriptions).
 * }
 */
router.get("/", function(req, res) {
  async.waterfall([
    // Step 1: Authenticate the user.
    function(callback) {
      authenticate(req, res, callback);
    },
    // Step 2: Return all the subscriptions for the current user.
    function(user_id, callback) {
      Subscription.find({"user": user_id}, function(err, results) {
        if (err) {
          send_error(res, err);
          callback(err);
        } else {
          send_response(res, results);
          callback(null);
        }
      });
    }
  ])
});

module.exports.initialize = function(_mongoose) {
  mongoose = _mongoose;
  return router;
}
