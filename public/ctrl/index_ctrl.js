/**
 * This file defines the controller for index.html
 */
(function() {
  $(document).ready(function() {

    // Create the map
    var map_ctrl = Global.MapCtrl("map").initialize();
    var html = Handlebars.templates.login();
    console.log(html);
    $("#login-background").addClass("active");
    $("#login-background").html(html);
  });
})();
