/**
 * This file defines the controller for index.html
 */
(function() {
  var map_ctrl;
  $(document).ready(function() {
    map_ctrl = Global.MapCtrl("map");
    Global.LoginCtrl("login-div", setup_after_login);
  });

  var setup_after_login = function() {
    Global.LogoutCtrl("logout-div", logged_out);
    Global.MySubscriptionsCtrl("my-subscriptions-div", function(){});
    Global.MyReportsCtrl("my-reports-div", function(){});
  };

  var logged_out = function() {
    map_ctrl.hidePopups();
    Global.LoginCtrl("login-div", setup_after_login);
  };

})();
