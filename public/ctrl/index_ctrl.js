/**
 * This file defines the controller for index.html
 */
(function() {
  $(document).ready(function() {

    // Create the map
    var map_ctrl = Global.MapCtrl("map").initialize();
    var login_ctrl = Global.LoginCtrl("login-div");
  });
})();
