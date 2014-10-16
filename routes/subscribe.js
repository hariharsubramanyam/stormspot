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
          if (err) send_error(res, err);
          callback(null, args, user_id);
      });
    },
    //Step 3: Convert the lat/lon to numbers. If a subscription with the same
    //user and location exists, then don't create another.
    function(args, user_id, callback){
      try {
        args.lat = parseFloat(args.lat, 10);
        args.lon = parseFloat(args.lon, 10);
      } catch (err) {
        send_error(res, "The lat and lon parameters of the POST body must be numbers.");
      }
      Subscription.findOne({
        "user": user_id,
        "location": {
          "type": "Point",
          "coordinates": [args.lon, args.lat]
        }
      }, function(err, result) {
          if (err) send_error(res, err);
          if(result) send_error(res, "You already have a subscription in this location!");
          else callback(null, args, user_id);
      }) 
    },
    //Step 4: Create a new subscription
    function(args, user_id, callback) {
      var subscription = new Subscription({
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
        if(err) send_error(res, err);
        send_response(res, result);
      });
    }
  ]);
});

router.post("/update", function(req, res){
  async.waterfall([
    // Step 1: Authenticate the user.
    function(callback) {
      authenticate(req, res, callback);
    },
    // Step 2: Extract parameters from the POST body.
    function(user_id, callback) {
      get_post_args(res, res, ["phone_number",
        "carrier",
        "severity_level",
        "lat", "lon"],
        function(err, args) {
          if(err) send_err(res, err);
          callback(null, args, user_id);
      })
    },
    // Step 3: Find the subscription if it exists and update its
    // parameters
    function(args, user_id, callback){
      try {
        args.lat = parseFloat(args.lat, 10);
        args.lon = parseFloat(args.lon, 10);
      } catch (err) {
        send_error(res, "The lat and lon parameters of the POST body must be numbers.");
      }
      Subscription.findOne({
        "user": user_id,
        "location": {
          "type": "Point",
          "coordinates": [args.lon, args.lat]
        }
      }, function(err, result) {
          if (err) send_error(res, err);
          if(result) {
            result.phone_number = args.phone_number;
            result.carrier = args.carrier;
            result.severity_level = args.severity_level;
            result.save();
          } else {
            send_error(res, "No subscription exists with the given user and location");
          }
      }) 
    }
  ]);
});

module.exports.initialize = function(_mongoose) {
  mongoose = _mongoose;
  return router;
}
