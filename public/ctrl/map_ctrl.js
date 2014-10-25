(function() {
  var MapCtrl = function(map_div) { 
    var latitude = 42.358527;
    var longitude = -71.093152;
    var zoom_level = 10;
    var map = L.map(map_div).setView([latitude, longitude], zoom_level);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var that = {};
    that.initialize = function(callback) {
      Global.getGeoLocation(function(position) {
        // By default, the location is MIT.
        if (position !== null) {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
        };

        map.setView([latitude, longitude], zoom_level);

        if (callback !== null && callback !== undefined) {
          callback();
        }
      });
    };
    return that;
  };

  Global.MapCtrl = MapCtrl;
})();
