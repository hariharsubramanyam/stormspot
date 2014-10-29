/**
 * Lead Author: Harihar
 */
(function() {
  var test = function(callback) {
    var storm_type = "TORNADO";
    var severity_level = "SEVERE";
    var content = "This is report content";
    var lat = "42";
    var lon = "-72";
    var request_data = {
      "storm_type": storm_type,
      "severity_level": severity_level,
      "content": content,
      "lat": lat,
      "lon": lon
    };
    var request = "POST /report with " + JSON.stringify(request_data);
    $.post("/report", request_data).done(function(data) {
      callback(request, data);
    });
  };
  Global.tests["Make a Report"] = test;
})();

