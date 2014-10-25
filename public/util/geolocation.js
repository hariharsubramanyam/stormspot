/**
 * This file defines a utility function for getting the user's current location.
 */
(function() {
  /**
   * Get the location and execute the callback. The callback takes the form callback(position).
   * The position value is null if the location could not be retrieved successfully.
   */
  Global.getGeoLocation = function(callback) {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(callback);
    } else {
      callback(null);
    }
  };
})();
