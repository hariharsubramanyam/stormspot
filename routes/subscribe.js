/**
 * This file defines the routes for subscriptions.
 *
 * make - Makes a subscription.
 * delete - Deletes a subscription.
 * update - Updates a subscription.
 * mine - Returns all the subscriptions for a given user.
 * near - Returns all subscriptions near a given location.
 */

var express = require("express");
var async = require("async");
var route_helper = require("./route_helper");
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
 * session_id: The session id of the user making the report.
 * lat: The latitude of the location to monitor for the subscription.
 * lon: The longitude of the location to monitor for the subscription.
 * severity_level: Only notify the user about storms with severity >= severity_level
 * carrier: The email domain of the carrier of the user's phone (see ../models/carrier.js)
 * phone_number: The 10 digit phone number for the user.
 *
 * The response is of the form:
 * {
 *  error: An error message, or null if there is no error,
 *  result: The object that represents the subscription.
 * }
 */
router.post("/make", function(req, res) {
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
          callback(null);
        }
      });
    }
  ]);
});

/**
 * Updates a subscription for the given user.
 *
 * The request must be a POST, and the body must contain:
 *
 * session_id: The session id of the user making the report.
 * subscription_id: The subscription id we aim to update.
 * lat: The latitude of the location to monitor for the subscription.
 * lon: The longitude of the location to monitor for the subscription.
 * severity_level: Only notify the user about storms with severity >= severity_level
 * carrier: The email domain of the carrier of the user's phone (see ../models/carrier.js)
 * phone_number: The 10 digit phone number for the user.
 *
 * The response is of the form:
 * {
 *  error: An error message, or null if there is no error,
 *  result: true (if no error occured)
 * }
 */
router.post("/update", function(req, res){
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
        "subscription_id",
        "lat", "lon"],
        function(err, args) {
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
            callback(null);
          }
        });
      }
    }
  ]);
});

module.exports.initialize = function(_mongoose) {
  mongoose = _mongoose;
  return router;
}
