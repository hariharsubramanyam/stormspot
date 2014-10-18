/**
 * This file defines the routes for authentication.
 *
 * login - Logs the user in.
 * register - Registers a new user.
 * logout - Logs the user out.
 */
var express = require("express");
var async = require("async");
var User = require("../models/user").User;
var Session = require("../models/session").Session;
var constants = require("../models/constants");
var route_helper = require("./route_helper");
var send_error = route_helper.send_error;
var get_post_args = route_helper.get_post_args;
var send_response = route_helper.send_response;
var bcrypt = require("bcrypt");
var uuid = require("node-uuid");
var router = express.Router();
var mongoose;

/**
 * Logs a user in.
 * @param req - POST body must include a 'username' and 'password'.
 * @param res - The result is: 
 * {
 *  error: An error message, or null if there is no error.
 *  result: The session id string (if there is no error).
 * }
 */
router.post("/login", function(req, res) {
  async.waterfall([
    // Step 1: Ensure that the request contains the username and password.
    function(callback) {
      get_post_args(req, res, ["username", "password"], callback);
    },
    // Step 2: Search for the username.
    function(args, callback) {
      var username = args.username;
      var password = args.password;
      User.findOne({"username": username}, function(err, result) {
        if (err) {
          send_error(res, err);
          callback(err);
        } else if (result) {
          callback(null, password, result);
        } else {
          var error = "Username not found";
          send_error(res, error);
          callback(error);
        } 
      }); 
    }, 
    // Step 3: Check if the passwords match.
    function(password, user, callback) {
      bcrypt.compare(password, user.hash_password, function(err, is_match) {
        if (err) {
          send_error(res, err);
          callback(err);
        } else if (is_match) {
          callback(null, user);
        } else {
          var error = "The password is incorrect!";
          send_error(res, error);
        }
      });
    },
    // Step 4: Remove old sessions.
    function(user, callback) {
      Session.remove({"user": user._id}, function(err, result) {
        if (err) {
          send_error(res, err);
          callback(err);
        } else {
          callback(null, user);
        }
      });
    },
    // Step 5: Create a new session.
    function(user, callback) {
      var session = new Session({"user": user._id, "session_id": uuid.v4()});
      res.cookie("session_id", session.session_id);
      session.save(function(err, result) {
        if (err) {
          send_error(res, err);
          callback(err);
        } else {
          send_response(res, result.session_id);
          callback(null);
        }
      });
    }
  ]);
}); 

/**
 * Registers a new user.
 *
 * @param req - The POST body must contain a 'username' and 'password'.
 * @param res - Result is 
 * {
 *  error: An error message (or null if there is no error).
 *  result: The session_id string (if there is no error).
 * }
 */
router.post("/register", function(req, res) {
  async.waterfall([
    // Step 1: Get the username and password from the request.
    function(callback) {
      get_post_args(req, res, ["username", "password"], callback);
    },
    // Step 2: Ensure that the username and password are both over 5 chars long.
    function(args, callback) {
      var username = args.username;
      var password = args.password;
      try {
        if (username.length <= 5 || password.length <= 5) {
          var error = "The username and password must be over 5 chars long";
          send_error(res, error);
          callback(error);
        } else {
          callback(null, username, password);
        }
      } catch(err) {
        var error = "Invalid username or password";
        send_error(res, error);
      }
    },
    // Step 3: Check if the username already exists.
    function(username, password, callback) {
      User.findOne({"username": username}, function(err, result) {
        if (err) {
          send_error(res, err); 
          callback(err);
        } else if (result) {
          var error = "Username already in use!";
          send_error(res, error);
        } else {
          callback(null, username, password);
        } 
      }); 
    }, 
    // Step 4: Create a hashed password.
    function(username, password, callback) {
      bcrypt.hash(password, constants.SALT, function(err, hash_password) {
        if (err) {
          send_error(res, err); 
          callback(err);
        } else {
          callback(null, username, hash_password);
        }
      });
    },
    // Step 5: Add the user.
    function(username, hash_password, callback) {
      var new_user = new User({
        "username": username,
        "hash_password": hash_password
      });

      new_user.save(function(err, result) {
        if (err) {
          send_error(res, err);
          callback(err);
        } else {
          callback(null, result);
        }
      });
    },
    // Step 6: Create a session for the user.
    function(user, callback) {
      var session = new Session({"user": user._id, "session_id": uuid.v4()});
      session.save(function(err, result) {
        if (err) {
          send_error(res, err);
          callback(err);
        } else {
          send_response(res, result.session_id);
          callback(null);
        }
      });
    }
  ]); 
}); 


/**
 * Logs a user out.
 *
 * @param req - The request body must contain a 'session_id'
 * @param res - The result is 
 * {
 *  error: The error message (or null if there is no error)
 *  result: true (if there is no error).
 * }
 */
router.post("/logout", function(req, res) {
  async.waterfall([
    // Step 1: Ensure that session_id is in the POST body.
    function(callback) {
      get_post_args(req, res, ["session_id"], callback);
    },
    // Step 2: Delete the session_id.
    function(args, callback) {
      var session_id = args.session_id;
      try {
        Session.remove({"session_id": session_id}, function(err, result) {
          if (err) {
            send_error(res, err);
            callback(err);
          } else {
            send_response(res, true);
            callback(null);
          }
        });
      } catch(err) {
        var error = "Error in searching for session_id";
        send_error(res, error);
        callback(error);
      }
    }
  ]);
}); 

module.exports.initialize = function(_mongoose) {
  mongoose = _mongoose;
  return router;
}
