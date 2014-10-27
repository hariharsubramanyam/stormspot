/**
 * Lead Author: Harihar.
 * This file defines the controller for the login view.
 */
(function() {
  
  /**
   * Displays the login view.
   *
   * @param login_div_name - The id of the div which will contain the login view.
   * @param callback - The callback to execute (as callback()) after the user is logged in or
   *                   registered.
   */
  var LoginCtrl = function(login_div_name, callback) {
    // Find the div and create the template.
    var div = $("#"+login_div_name);
    var html = $(Handlebars.templates.login());

    // Bind to the DOM elements.
    var btn_login = html.find("#btn_login");
    var btn_register = html.find("#btn_register");
    var txt_reg_username = html.find("#txt_reg_username");
    var txt_reg_password = html.find("#txt_reg_password");
    var txt_reg_confirm = html.find("#txt_reg_confirm");
    var txt_log_username = html.find("#txt_log_username");
    var txt_log_password = html.find("#txt_log_password");
    var alert_timeout = null;
    var alert_div = html.find(".alert");
    var alert_p = alert_div.find("p");

    // Function which displays an alert for 3 seconds.
    var show_alert = function(message) {
      clearTimeout(alert_timeout);
      alert_p.text(message);
      alert_div.addClass("displayed");
      alert_timeout = setTimeout(function() {
        alert_div.removeClass("displayed");
      }, 3000);
    };

    // Trigger the callback and remove the view after successful authentication.
    var successful_auth = function() {
      div.removeClass("active");
      div.html("");
      callback();
    };

    // Log the user in.
    btn_login.click(function() {
      var username = txt_log_username.val();
      var password = txt_log_password.val();
      Global.auth.login(username, password, function(data) {
        if (data === null) {
          show_alert("Error logging in");
        } else if (data.error !== null) {
          show_alert(data.error);
        } else {
          successful_auth();
        }
      });
    });

    // Register a new user.
    btn_register.click(function() {
      var username = txt_reg_username.val();
      var password = txt_reg_password.val();
      var confirm_password = txt_reg_confirm.val();
      if (username.length < 5) {
        show_alert("Username must be at least 5 letters long");
      } else if (password !== confirm_password) {
        show_alert("Passwords don't match");
      } else {
        Global.auth.register(username, password, function(data) {
          if (data === null) {
            show_alert("Error registering");
          } else if (data.error !== null) {
            show_alert(data.error);
          } else {
            successful_auth();
          }
        });
      }
    });

    // Add the html to the div and make it active (i.e. tints background elements black).
    div.html(html);
    div.addClass("active");
  };

  // Only display the login control if the user has not authenticated.
  Global.LoginCtrl = function(login_div_name, callback) {
    Global.auth.validate(function(data) {
      if (data === null || data.error !== null) {
        LoginCtrl(login_div_name, callback);
      } else {
        callback();
      }
    });
  }
})();
