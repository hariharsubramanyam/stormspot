(function() {
  var ReportMarkerCtrl = function(map, report) {
    var lat = parseFloat(report.posted_from.coordinates[1]);
    var lon = parseFloat(report.posted_from.coordinates[0]);
    var icon = get_icon_for_storm(report);
    var isUpvoter = contains(report.upvoters, Global.auth.username);
    var isDownvoter = contains(report.downvoters, Global.auth.username);
    var marker = L.marker([lat, lon], {"icon": icon}).addTo(map);
    var html = Handlebars.templates.report_popup({
      "report": report,
      "isUpvoter": isUpvoter,
      "isDownvoter": isDownvoter
    });

    var popup_html = $(html);
    var upvote_selector = "#" + report.report_id + " .btn_upvote";
    var downvote_selector = "#" + report.report_id + " .btn_downvote"; 
    
    marker.on("popupopen", function() {
      $(upvote_selector).click(upvote_handler);
      $(downvote_selector).click(downvote_handler);
    });

    var upvote_handler = function() {
      console.log("upvote");
    };

    var downvote_handler = function() {
      console.log("downvote");
    };

    marker.bindPopup(html);
  };


  var contains = function(arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === val) {
        return true;
      }
    }
    return false;
  };

  var get_icon_for_storm = function(report) {
    var icon = null;
    if (report.storm_type === "TORNADO") {
      icon = L.MakiMarkers.icon({icon: "circle", color: "#FF2A68", size: "l"});
    } else if (report.storm_type === "HAIL") {
      icon = L.MakiMarkers.icon({icon: "circle", color: "#0BD318", size: "m"});
    } else if (report.storm_type === "WIND") {
      icon = L.MakiMarkers.icon({icon: "circle", color: "#1AD6FD", size: "m"});
    } else {
      icon = L.MakiMarkers.icon({icon: "circle", color: "#FFCC00", size: "m"});
    }
    return icon;
  };

  Global.ReportMarkerCtrl = ReportMarkerCtrl;
})();
