/**
 * Lead Author: Harihar.
 * This file defines the controller for a marker that is made for a particular report.
 */
(function() {
  /**
   * Create the marker for the report.
   *
   * @param map - The leaflet map object to display the marker on.
   * @param report - The report to make the marker for.
   */
  var ReportMarkerCtrl = function(map, report) {
    // Get the report's location.
    var lat = parseFloat(report.posted_from.coordinates[1]);
    var lon = parseFloat(report.posted_from.coordinates[0]);

    // Get the icon for the report based on its severity and storm type.
    var icon = get_icon_for_storm(report);

    // Create the marker.
    var marker = L.marker([lat, lon], {"icon": icon});

    // Create the popup which will appear when the marker is clicked.
    var html = Handlebars.templates.report_popup({"report": report});

    // This will select the downvote and upvote buttons for the report's popup.
    var upvote_selector = "#" + report.report_id + " .btn_upvote";
    var downvote_selector = "#" + report.report_id + " .btn_downvote"; 
    
    // Whenever the popup is clicked, set the handlers and update the buttons.
    marker.on("popupopen", function() {
      $(upvote_selector).click(upvote_handler);
      $(downvote_selector).click(downvote_handler);
      update_buttons(function(report_id, callback) {
        callback({error: null});
      });
    });

    // Handle upvotes.
    var upvote_handler = function() {
      var btn_upvote = $(upvote_selector);
      var btn_downvote = $(downvote_selector);
      var update_func;

      // Toggle the vote.
      if (voted(btn_upvote)) {
        update_func = Global.report.novote;
      } else {
        update_func = Global.report.upvote;
      }
      update_buttons(update_func);
    };

    // Handle downvotes.
    var downvote_handler = function() {
      var btn_upvote = $(upvote_selector);
      var btn_downvote = $(downvote_selector);
      var update_func;

      // Toggle the vote.
      if (voted(btn_downvote)) {
        update_func = Global.report.novote;
      } else {
        update_func = Global.report.downvote;
      }
      update_buttons(update_func);
    };

    // Call the update function and update the button colors accordingly.
    var update_buttons = function(update_func) {
      var btn_upvote = $(upvote_selector);
      var btn_downvote = $(downvote_selector);

      // Call the update (upvote, downvote, or novote) function.
      update_func(report.report_id, function(data) {
        if (data !== null && data.error === null) {

          // Get the latest version of the report.
          Global.report.getReport(report.report_id, function(data) {
            if (data !== null && data.error === null) {
              report = data.result[0];

              // Toggle the yellow color on the upvote button if the user has upvoted.
              if (contains(report.upvoters, Global.auth.username)) {
                btn_upvote.addClass("yellow-btn");
              } else {
                btn_upvote.removeClass("yellow-btn");
              }

              // Toggle the yellow color on the downvote button if the user has downvoted.
              if (contains(report.downvoters, Global.auth.username)) {
                btn_downvote.addClass("yellow-btn");
              } else {
                btn_downvote.removeClass("yellow-btn");
              }

              // Indicate the number of upvotes and downvotes.
              btn_upvote.text(report.upvoters.length + " upvotes");
              btn_downvote.text(report.downvoters.length + " downvotes");
            }
          });
        }
      });
    };

    // Tie the marker to the popup and return the marker.
    marker.bindPopup(html);
    return marker;
  };

  // Check if the button indicates that the user has voted.
  var voted = function(btn) {
    return btn.hasClass("yellow-btn");
  };

  // Determine whether the array arr contains the value val.
  var contains = function(arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === val) {
        return true;
      }
    }
    return false;
  };

  // Get the marker icon for a given report.
  var get_icon_for_storm = function(report) {
    var color;
    var size;

    // Normal = small, server = medium, destructive = large.
    if (report.severity_level === "NORMAL") {
      size = "s";
    } else if (report.severity_level === "SEVERE") {
      size = "m";
    } else {
      size = "l";
    }

    // Tornado = red, hail = green, wind = blue, other = yellow
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

  // Make the controller globally available.
  Global.ReportMarkerCtrl = ReportMarkerCtrl;
})();
