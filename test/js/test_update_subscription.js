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
      // Now update the subscription
      data = JSON.parse(data);
      var subscription_id = data.result.subscription_id;
      var severity_level = "NORMAL";
      var lat = "40";
      var lon = "-70";
      var carrier = "txt.att.net";
      var phone_number = "111111111";
      var request_data = {
        "severity_level": severity_level,
        "lat": lat,
        "lon": lon,
        "carrier": carrier,
        "phone_number": phone_number
      };
      var request = "PUT /subscribe/" + subscription_id;
      $.ajax({
        "url": "/subscribe/" + subscription_id,
        "method": "PUT",
        "data": request_data
      }).done(function(data) {
        callback(request, data);
      });
    });
  };
  Global.tests["Update a subscription"] = test;
})();



