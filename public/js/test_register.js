(function() {
  var test = function(callback) {
    var username = "User" + (new Date()).getTime();
    var password = "tester";
    var request = "POST /auth/register with {username: '" + username + "', password: 'tester'}";
    $.post("/auth/register", {"username": username, "password": password}).done(function(data) {
      callback(request, data);
    });
  };
  Global.tests["Register"] = test;
})();
