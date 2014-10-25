(function() {
  var LoginCtrl = function(login_div_name) {
    var div = $("#"+login_div_name);
    div.addClass("active");
    div.html(Handlebars.templates.login());

    var that = {};
    return that;
  };

  Global.LoginCtrl = LoginCtrl;
})();
