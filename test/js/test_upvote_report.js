/**
 * Lead Author: Harihar
 */
(function() {
  var test = function(callback) {
    // First make a report.
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
    $.post("/report", request_data).done(function(data) {
      // Now upvote the report.
      data = JSON.parse(data);
      var report_id = data.result.report_id;
      var request = "PUT /report/upvote/"+report_id;
      $.ajax({
        "url": "/report/upvote/"+report_id,
        "method": "PUT"
      }).done(function(data) {
        callback(request, data);
      });
    });
  };
  Global.tests["Upvote a Report"] = test;
})();

