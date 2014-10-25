/**
 * This file defines the controller for index.html
 */
(function() {
  $(document).ready(function() {
    setup();
  });

  var setup = function() {
    setup_map();
  };

  var setup_map = function() {
    Global.MapCtrl("map", setup_login);
  };

  var setup_login = function() {
    Global.LoginCtrl("login-div", setup_logout); 
  };

  var setup_logout = function() {
    Global.LogoutCtrl("logout-div", logged_out);
  };

  var logged_out = function() {
    setup_login();
  };

})();
