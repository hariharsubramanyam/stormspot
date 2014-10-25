(function() {
  var CenterOnUserCtrl = function(map) {
    var latitude;
    var longitude;
    Global.getGeoLocation(function(position) {
      if (position !== null) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
      };

      // Center the map around the user's location.
      map.setView([latitude, longitude], 10);
    });
  };
  Global.CenterOnUserCtrl = CenterOnUserCtrl;
})();
