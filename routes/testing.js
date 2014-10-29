/**
 * Lead Author: Harihar
 * This file defines one route for testing which drops all the elements in the database.
 *
 * This function is only used for the P3.2 test script. It will be removed for P3.3.
 */
var express = require("express");
var User = require("../models/user").User;
var Session = require("../models/session").Session;
var Report = require("../models/report").Report;
var Subscription = require("../models/subscription").Subscription;
var route_helper = require("./route_helper");
var send_response = route_helper.send_response;
var router = express.Router();
var mongoose;

/**
 * Drop all the data in the database.
 */
router.get("/reset", function(req, res) {
  Report.remove({}, function(err, result) {
    Subscription.remove({}, function(err, result) {
      Session.remove({}, function(err, result) {
        User.remove({}, function(err, result) {
          res.clearCookie("session_id");
          send_response(res, true);
        });
      });
    });
  });
}); 


module.exports.initialize = function(_mongoose) {
  mongoose = _mongoose;
  return router;
}

