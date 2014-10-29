/**
 * Lead Author: Harihar
 */
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
    // First make a subscription.
    $.post("/subscribe", request_data).done(function(data) {
      // Now get all subscriptions.
      data = JSON.parse(data);
      var request = "GET /subscribe";
      $.get("/subscribe", function(data) {
        callback(request, data);
      });
    });
  };
  Global.tests["Get all my subscriptions"] = test;
})();



