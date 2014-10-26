(function() {
  var ReportSubscribePopupCtrl = function(map) {
    var markerHTML = $(Handlebars.templates.marker());
    var popup = L.popup().setContent(markerHTML.html());

    //Create a marker when clicking on the map
    var onMapClick = function(e){
      popup.setLatLng(e.latlng);
      popup.openOn(map);
      var btn_subscribe = $("#btn_subscribe");
      var btn_report = $("#btn_report");
      btn_subscribe.click(function() {
        Global.SubscribeCtrl("marker-box-form");
        console.log("subscribe");
      });
      btn_report.click(function() {
        Global.ReportCtrl("marker-box-form");
        console.log("report");
      });
    };
    map.on("click", onMapClick);
  };

  Global.ReportSubscribePopupCtrl = ReportSubscribePopupCtrl;
})();
