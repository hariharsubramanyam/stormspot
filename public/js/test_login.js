(function() {
  var test = function(callback) {
    var username = "tester";
    var password = "tester";
    var request = "POST /auth/login with {username: '" + username + "', password: 'tester'}";
    $.post("/auth/login", {"username": username, "password": password}).done(function(data) {
      callback(request, data);
    });
  };
  Global.tests["Login"] = test;
})();
