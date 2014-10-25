/**
 * This file defines functions for communicating with the authentication API.
 */
(function() {
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
        console.log(data);
      }
    });
  };

  Global.auth.login = function(username, password, callback) {
  };

  Global.auth.logout = function(callback) {
  };
})();
