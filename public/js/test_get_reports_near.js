(function() {
  var test = function(callback) {
    var lat = 42;
    var lon = -72;
    var distance = 100;
    var request = "GET /report/near/" + lat + "/" + lon + "/" + distance;
    $.get("/report/near/"+ lat + "/" + lon + "/" + distance, function(data) {
      callback(request, data);
    });
  };
  Global.tests["Get nearby reports"] = test;
})();


