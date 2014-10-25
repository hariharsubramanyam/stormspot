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
    Global.LoginCtrl("login-div", function() {});
  };
})();
