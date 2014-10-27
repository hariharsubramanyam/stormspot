/**
 * This file defines the controller for the map.
 */
(function() {
  
  /**
   * Creates a map.
   *
   * @param map_div_id - The id of the div which will contain the map.
   * @return The map 
   */
  var MapCtrl = function(map_div_id) { 
    var map = L.map(map_div_id);
    var marker_for_report_id = {};

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Attempt to center the map around the user's location.
    Global.CenterOnUserCtrl(map);

    // When the map is clicked, display a popup showing Report/Subscribe
    Global.ReportSubscribePopupCtrl(map);

    // Define function to update the map.
    var update_map = function() {
      for (var key in marker_for_report_id) {
        console.log(key);
        console.log(marker_for_report_id[key]);
        var marker = marker_for_report_id[key];
        map.removeLayer(marker);
      }
      marker_for_report_id = {};
      Global.report.getAll(function(data) {
        if (data !== null) {
          for (var i = 0; i < data.result.length; i++) {
            var report = data.result[i];
            var marker = Global.ReportMarkerCtrl(map, report);
            map.addLayer(marker);
            marker_for_report_id[report.report_id] = marker;
          }
        }
      });
    };

    // Update the map and update it periodically.
    update_map();
    setInterval(update_map, 1000);

    var that = {};

    // Hide the popups on the map.
    that.hidePopups = function() {
      for (var key in marker_for_report_id) {
        marker_for_report_id[key].closePopup();
      }
    };
    return that;
  };


  // Make the controller globally available.
  Global.MapCtrl = MapCtrl;
})();
