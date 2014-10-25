/**
 * This file defines functions for communicating with the authentication API.
 */
(function() {
  var set_session_id = function(session_id) {
    $.cookie("session_id", session_id, {"path": "/"});
  };
  Global.auth = {};

  Global.auth.register = function(username, password, callback) {
    $.ajax({
      "url": "/auth/register",
      "method": "POST",
      "data": {
        "username": username,
        "password": password
      },
      "success": function(data) {
        data = JSON.parse(data);
        if (data.error === null) {
          set_session_id(data.result);
        }
        Global.auth.validate(callback);
      },
      "error": function() {
        callback(null);
      }
    });
  };

  Global.auth.login = function(username, password, callback) {
    $.ajax({
      "url": "/auth/login",
      "method": "POST",
      "data": {
        "username": username,
        "password": password
      },
      "success": function(data) {
        data = JSON.parse(data);
        if (data.error === null) {
          set_session_id(data.result);
        }
        Global.auth.validate(callback);
      },
      "error": function() {
        callback(null);
      }
    });
  };

  Global.auth.logout = function(callback) {
    $.ajax({
      "url": "/auth/logout",
      "method": "DELETE",
      "success": function(data) {
        data = JSON.parse(data);
        if (data.error === null) {
          $.removeCookie("session_id");
        }
        callback(data);
      },
      "error": function(data) {
        callback(null);
      }
    });
  };

  Global.auth.validate = function(callback) {
    $.ajax({
      "url": "/auth/validate",
      "method": "GET",
      "success": function(data) {
        data = JSON.parse(data);
        Global.auth.username = data.result.username;
        callback(data);
      },
      "error": function(){
        callback(null);
      }
    });
  };
})();
