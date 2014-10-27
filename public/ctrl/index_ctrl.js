/**
 * This file defines the controller for index.html
 */
(function() {
  var map_ctrl;

  $(document).ready(function() {
    // Set up the map.
    map_ctrl = Global.MapCtrl("map");

    // Ensure that the user is logged in.
    Global.LoginCtrl("login-div", setup_after_login);
  });

  var setup_after_login = function() {
    // After login, display the logout button.
    Global.LogoutCtrl("logout-div", logged_out);

    // Setup the user's subscriptions and reports.
    Global.MySubscriptionsCtrl("my-subscriptions-div", function(){});
    Global.MyReportsCtrl("my-reports-div", function(){});
  };

  // When the user logs out, hide popups on the map and display the login view again.
  var logged_out = function() {
    map_ctrl.hidePopups();
    Global.LoginCtrl("login-div", setup_after_login);
  };

})();
