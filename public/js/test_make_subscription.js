(function() {
  var test = function(callback) {
    var severity_level = "SEVERE";
    var lat = "42";
    var lon = "-72";
    var carrier = "txt.att.net";
    var phone_number = "5555555555";
    var request_data = {
      "severity_level": severity_level,
      "lat": lat,
      "lon": lon,
      "carrier": carrier,
      "phone_number": phone_number
    };
    var request = "POST /subscribe with " + JSON.stringify(request_data);
    $.post("/subscribe", request_data).done(function(data) {
      callback(request, data);
    });
  };
  Global.tests["Create a subscription"] = test;
})();


