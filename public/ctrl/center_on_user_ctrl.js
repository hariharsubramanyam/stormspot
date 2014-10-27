/**
 * Lead Author: Harihar
 * This file defines a controller which will take a leaflet map, determine the user's location,
 * and centers the map on the user's location.
 */
(function() {

  /**
   * Center the map on the user's location.
   *
   * @param map - The leaflet map object.
   */
  var CenterOnUserCtrl = function(map) {
    // Get the user's location.
    Global.getGeoLocation(function(position) {
      // If the user has allowed location access, then center the map on the location.
      if (position !== null) {
        map.setView([position.coords.latitude, position.coords.longitude], 10);
      };
    });
  };

  // Make this controller globally available.
  Global.CenterOnUserCtrl = CenterOnUserCtrl;
})();
