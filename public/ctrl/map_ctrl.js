/**
 * This file defines the controller for the map.
 */
(function() {
  
  /**
   * The constructor takes the id of the div which will display the map. It then sets up the map.
   */
  var MapCtrl = function(map_div_id) { 

    // By default, the map centers around MIT.
    var latitude = 42.358527;
    var longitude = -71.093152;
    var zoom_level = 10;
    var map = L.map(map_div_id).setView([latitude, longitude], zoom_level);
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

    // Create the object to return.
    var that = {};

    // Initialize the map (this should be called after calling the constructor).
    that.initialize = function(callback) {
      // Get the user's current location.
      Global.getGeoLocation(function(position) {
        if (position !== null) {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
        };

        // Center the map around the user's location.
        map.setView([latitude, longitude], zoom_level);

        if (callback !== null && callback !== undefined) {
          callback();
        }
      });
    };

    // Return the object.
    return that;
  };

  Global.MapCtrl = MapCtrl;
})();
