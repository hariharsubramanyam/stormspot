(function() {
  Global.getGeoLocation = function(callback) {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(callback);
    } else {
      callback(null);
    }
  };
})();
