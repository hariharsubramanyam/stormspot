(function() {
  var ReportMarkerCtrl = function(map, report) {
    var lat = parseFloat(report.posted_from.coordinates[1]);
    var lon = parseFloat(report.posted_from.coordinates[0]);
    var icon = get_icon_for_storm(report);
    var marker = L.marker([lat, lon], {"icon": icon}).addTo(map);
    var html = Handlebars.templates.report_popup({"report": report});

    var upvote_selector = "#" + report.report_id + " .btn_upvote";
    var downvote_selector = "#" + report.report_id + " .btn_downvote"; 
    
    marker.on("popupopen", function() {
      $(upvote_selector).click(upvote_handler);
      $(downvote_selector).click(downvote_handler);
      update_buttons(function(report_id, callback) {
        callback({error: null});
      });
    });

    var upvote_handler = function() {
      var btn_upvote = $(upvote_selector);
      var btn_downvote = $(downvote_selector);
      var update_func;
      if (voted(btn_upvote)) {
        update_func = Global.report.novote;
      } else {
        update_func = Global.report.upvote;
      }
      update_buttons(update_func);
    };

    var downvote_handler = function() {
      var btn_upvote = $(upvote_selector);
      var btn_downvote = $(downvote_selector);
      var update_func;
      if (voted(btn_downvote)) {
        update_func = Global.report.novote;
      } else {
        update_func = Global.report.downvote;
      }
      update_buttons(update_func);
    };

    var update_buttons = function(update_func) {
      var btn_upvote = $(upvote_selector);
      var btn_downvote = $(downvote_selector);
      update_func(report.report_id, function(data) {
        if (data !== null && data.error === null) {
          Global.report.getReport(report.report_id, function(data) {
            if (data !== null && data.error === null) {
              report = data.result[0];
              if (contains(report.upvoters, Global.auth.username)) {
                btn_upvote.addClass("yellow-btn");
              } else {
                btn_upvote.removeClass("yellow-btn");
              }
              if (contains(report.downvoters, Global.auth.username)) {
                btn_downvote.addClass("yellow-btn");
              } else {
                btn_downvote.removeClass("yellow-btn");
              }
              btn_upvote.text(report.upvoters.length + " upvotes");
              btn_downvote.text(report.downvoters.length + " downvotes");
            }
          });
        }
      });
    };

    marker.bindPopup(html);
    return marker;
  };

  var voted = function(btn) {
    return btn.hasClass("yellow-btn");
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
    var color;
    var size;

    if (report.severity_level === "NORMAL") {
      size = "s";
    } else if (report.severity_level === "SEVERE") {
      size = "m";
    } else {
      size = "l";
    }

    if (report.storm_type === "TORNADO") {
      color = "#FF2A68";
    } else if (report.storm_type === "HAIL") {
      color = "#0BD318";
    } else if (report.storm_type === "WIND") {
      color = "#1AD6FD";
    } else {
      color = "#FFCC00";
    }

    return L.MakiMarkers.icon({"icon": "circle", "color": color, "size": size});
  };

  Global.ReportMarkerCtrl = ReportMarkerCtrl;
})();
