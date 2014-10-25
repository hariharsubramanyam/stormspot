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
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Attempt to center the map around the user's location.
    Global.getGeoLocation(function(position) {
      if (position !== null) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
      };

      // Center the map around the user's location.
      map.setView([latitude, longitude], zoom_level);

    });

    return map;
  };

  Global.MapCtrl = MapCtrl;
})();
