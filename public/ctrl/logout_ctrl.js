/**
 * This files defines the controller for the logout button.
 */
(function() {
  /**
   * Setup the logout controller.
   *
   * @param logout_div_id - The id of the div which will contain the logout button.
   * @param callback - Executed as callback() when the user logs out.
   */
  var LogoutCtrl = function(logout_div_id, callback) {
    // Add the logout button (from template) to div.
    var div = $("#"+logout_div_id);
    var html = $(Handlebars.templates.logout());
    div.html(html);

    // Set up handler for logout button.
    var  btn_logout = div.find("button");
    btn_logout.click(function() {
      Global.auth.logout(function(data) {
        if (data !== null && data.error === null) {
          div.html("");
          callback();
        }
      });
    });
  };

  Global.LogoutCtrl = LogoutCtrl;
})();
