(function() {
  var LoginCtrl = function(login_div_name) {
    var div = $("#"+login_div_name);
    var html = $(Handlebars.templates.login());

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

    var show_alert = function(message) {
      clearTimeout(alert_timeout);
      alert_p.text(message);
      alert_div.addClass("displayed");
      alert_timeout = setTimeout(function() {
        alert_div.removeClass("displayed");
      }, 3000);
    };

    var successful_auth = function() {
      div.removeClass("active");
      div.html("");
    };

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

    div.html(html);
    div.addClass("active");
    var that = {};
    return that;
  };

  Global.LoginCtrl = LoginCtrl;
})();
