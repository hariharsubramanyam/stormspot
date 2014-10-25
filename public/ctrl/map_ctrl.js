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

    // By default, the map centers around MIT.
    var map = L.map(map_div_id).setView([42.358527, -71.093152], 10);
    var marker_for_report_id = {};

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // When the map is clicked, display a popup showing Report/Subscribe
    Global.ReportSubscribePopupCtrl(map);

    // Attempt to center the map around the user's location.
    Global.CenterOnUserCtrl(map);

    // Define function to update the map.
    var update_map = function() {
      for (var key in marker_for_report_id) {
        marker_for_report_id[key].remove();
      }
      markers = {};
      $.get("/report/all", function(data) {
        data = JSON.parse(data);
        if (data.error === null && data.result !== null) {
          for (var i = 0; i < data.result.length; i++) {
            var report = data.result[i];
            add_report_to_map(report);
          }
        }
      });
    };

    var add_report_to_map = function(report) {
      var marker = Global.ReportMarkerCtrl(map, report);
      marker_for_report_id[report.report_id] = marker;
    };

    update_map();

    return map;
  };


  Global.MapCtrl = MapCtrl;
})();
