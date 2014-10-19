(function() {
  var test = function(callback) {
    var request = "DELETE /auth/logout"; 
    $.ajax({
      "url": "/auth/logout",
      "method": "DELETE"
    }).done(function(data) {
      callback(request, data);
    });
  };
  Global.tests["Logout"] = test;
})();
