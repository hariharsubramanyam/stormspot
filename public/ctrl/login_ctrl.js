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

    btn_login.click(function() {
      var username = txt_log_username.text();
      var password = txt_log_password.text();
      Global.auth.login(username, password, function(data) {

      });
    });

    div.html(html);
    div.addClass("active");
    var that = {};
    return that;
  };

  Global.LoginCtrl = LoginCtrl;
})();
