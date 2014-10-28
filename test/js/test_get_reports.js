(function() {
  var test = function(callback) {
    var request = "GET /report";
    $.get("/report", function(data) {
      callback(request, data);
    });
  };
  Global.tests["Get my reports"] = test;
})();

