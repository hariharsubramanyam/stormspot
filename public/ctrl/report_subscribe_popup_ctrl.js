/**
 * Lead Author: Giancarlo.
 */
(function() {
  var ReportSubscribePopupCtrl = function(map) {
    var markerHTML = $(Handlebars.templates.marker());
    var popup = L.popup().setContent(markerHTML.html());

    var finish_subscribe = function(){
      map.closePopup(popup);
    }

    var finish_report = function(report){
      Global.ReportMarkerCtrl(map, report);
      map.closePopup(popup);
    }

    //Create a marker when clicking on the map
    var onMapClick = function(e){
      popup.setLatLng(e.latlng);
      popup.openOn(map);
      var btn_subscribe = $("#btn_subscribe");
      var btn_report = $("#btn_report");
      btn_subscribe.click(function() {
        Global.SubscribeCtrl("marker-box-form", e, finish_subscribe);
      });
      btn_report.click(function() {
        Global.ReportCtrl("marker-box-form", e, finish_report);
      });
    };
    map.on("click", onMapClick);
  };

  Global.ReportSubscribePopupCtrl = ReportSubscribePopupCtrl;
})();
