/**
 * This file defines the controller for index.html
 */
(function() {
  var map;
  $(document).ready(function() {
    map = Global.MapCtrl("map");
    Global.LoginCtrl("login-div", setup_after_login);
  });

  var setup_after_login = function() {
    Global.LogoutCtrl("logout-div", logged_out);
  };

  var logged_out = function() {
    Global.LoginCtrl("login-div", setup_after_login);
  };

})();
