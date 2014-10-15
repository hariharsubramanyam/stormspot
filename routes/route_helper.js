/**
 * This file defines some helper functions that routes can use.
 *
 * send_err: Sends an error response to the client.
 * send_response: Sends a non-error response to the client.
 * get_post_args: Extracts arguments from the POST body.
 * is_authenticated: Checks whether the user is authenticated.
 */

var Session = require("../models/session").Session;
var async = require("async");

/**
 * Returns a JSON response to the res of the form:
 * {
*   error: the error
 * }
 */
var send_error = function(res, error) {
  res.end(JSON.stringify({
    "error": error
  }));
};

/**
 * Returns a JSON response to the res of the form:
 * {
 *  error: null,
 *  result: the result
 * }
 */
var send_response = function(res, result) {
  res.end(JSON.stringify({
    "error": null,
    "result": result
  }));
};

/**
 * Checks the POST body of the request for the given parameters.
 *
 * @param req - The request object.
 * @param res - The result object. If one of the parameters is not in the request body, then 
 * a response will be sent of the form:
 * {
 *  error: "The POST body must contain a <parameter> parameter", (<parameter> is the name of
 *  the parameter that is missing)
 * }
 *
 * @param params - The parameters that should appear in the POST body. This should be an array
 *                 of strings. For instance, if we want the POST body to contain "username" and
 *                 "password" parameters, then params should be ["username", "password"]
 * @param callback - Executed as callback(err, args) where err is the error message (or null if
 *                   there is no error). args is an object of the form:
 *                   {
 *                    "param1": value of param1,
 *                    "param2": value of param2,
 *                    ...
 *                   }
 *                   where "param1", "param2", ... are the elements of the params array which is
 *                   an argument to this function.
 */
var get_post_args = function(req, res, params, callback) {
  var param_name;
  var args = {};
  for (var i = 0; i < params.length; i++) {
    param_name = params[i];
    if (req.body[param_name] === undefined) {
      send_error(res, "The POST body must contain a '" + param_name + "' parameter");
    }
    args[param_name] = req.body[param_name];
  }
  callback(null, args);
};

/**
 * Helper function to authenticate a user.
 *
 * @param req - The request. The body of the request must contain a session_id parameter.
 * @param res - The response. If the session_id is not valid, then server responds to the user with
 * {
 *  error: "The session_id is not valid" (or "The POST body must contain a 'session_id' parameter")
 * }
 * @param cb - The callback function, which is executed as cb(err, user_id) where err is an
 *                   error message, or null if there is no error. The user_id is the ObjectId
 *                   of the User who is associated with this session. 
 *
 */
var authenticate = function(req, res, cb) {
  async.waterfall([
    // Step 1: Ensure that session_id is in the POST body.
    function(callback) {
      get_post_args(req, res, ["session_id"], callback);
    },
    // Step 2: Ensure that the session_id is valid.
    function(args, callback) {
      Session.findOne({"session_id": args.session_id}, function(err, result) {
        if (err) send_error(res, err);
        if (result) {
          cb(null, result);
        } else {
          send_error(res, "The session_id is not valid");
        }
      });
    }
  ]);
}

module.exports.send_error = send_error;
module.exports.send_response = send_response;
module.exports.get_post_args = get_post_args;
module.exports.authenticate = authenticate;
