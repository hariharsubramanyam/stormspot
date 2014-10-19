(function() {
  var test = function(callback) {
    var num_minutes = 100;
    var request = "GET /report/latest/" + num_minutes;
    $.get("/report/latest/" + num_minutes, function(data) {
      callback(request, data);
    });
  };
  Global.tests["Get latest reports"] = test;
})();

