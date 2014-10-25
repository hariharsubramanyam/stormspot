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
    var latitude = 42.358527;
    var longitude = -71.093152;
    var zoom_level = 10;
    var map = L.map(map_div_id).setView([latitude, longitude], zoom_level);
    var marker_for_report_id = {};

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    var markerHTML = $(Handlebars.templates.marker());
    var btn_subscribe = markerHTML.find("#btn_subscribe");
    var btn_report = markerHTML.find("#btn_report");

    //Create a marker when clicking on the map
    var onMapClick = function(e){
      var marker = L.marker(e.latlng).addTo(map);
      var popup = L.popup().setContent(markerHTML.html());
      marker.bindPopup(popup);
    };
    map.on("click", onMapClick);

    // Attempt to center the map around the user's location.
    Global.getGeoLocation(function(position) {
      if (position !== null) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
      };

      // Center the map around the user's location.
      map.setView([latitude, longitude], zoom_level);
    });

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
      var lat = parseFloat(report.posted_from.coordinates[1]);
      var lon = parseFloat(report.posted_from.coordinates[0]);
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
      var marker = L.marker([lat, lon], {"icon": icon}).addTo(map);
      marker.bindPopup(Handlebars.templates.marker());
      marker_for_report_id[report.report_id] = marker;
    };

    update_map();

    return map;
  };


  Global.MapCtrl = MapCtrl;
})();
