(function() {
  var ReportSubscribePopupCtrl = function(map) {
    var markerHTML = $(Handlebars.templates.marker());
    var btn_subscribe = markerHTML.find("#btn_subscribe");
    var btn_report = markerHTML.find("#btn_report");
    var popup = L.popup().setContent(markerHTML.html());

    //Create a marker when clicking on the map
    var onMapClick = function(e){
      popup.setLatLng(e.latlng);
      popup.openOn(map);
    };
    map.on("click", onMapClick);
  };

  Global.ReportSubscribePopupCtrl = ReportSubscribePopupCtrl;
})();
