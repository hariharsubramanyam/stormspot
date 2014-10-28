(function() {
  var test = function(callback) {
    var request = "GET /report/all";
    $.get("/report/all", function(data) {
      callback(request, data);
    });
  };
  Global.tests["Get all reports"] = test;
})();

