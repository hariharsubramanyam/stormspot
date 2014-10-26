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
<<<<<<< HEAD
        map.closePopup(popup);
        Global.SubscribeCtrl("subscribe-div", map, e);
=======
>>>>>>> parent of 925c7c9... subscribe button crshows form
        console.log("subscribe");
      });
      btn_report.click(function() {
        console.log("report");
      });
    };
    map.on("click", onMapClick);
  };

  Global.ReportSubscribePopupCtrl = ReportSubscribePopupCtrl;
})();
