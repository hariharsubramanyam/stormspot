(function() {
  var ReportCtrl = function(report_div_name, popup, map, e) {
    var div = $("#"+report_div_name);
    var html = $(Handlebars.templates.report());

    var btn_report = html.find("#btn_report");
    var sel_storm = html.find("#sel_storm");
    var sel_severity = html.find("#sel_severity");
    var txt_content = html.find("#txt_content");

    var successful_report = function(report) {
      Global.ReportMarkerCtrl(map, report);
    };

    btn_report.click(function(){
      map.closePopup(popup);

      var lat = e.latlng.lat;
      var lon = e.latlng.lng;
      var storm_type = sel_storm.val();
      var severity = sel_severity.val();
      var content = txt_content.val();

      console.log(content);

      Global.report.make(lat, lon, storm_type, severity, content, function(data){
        if(data === null){
          console.log("ERROR");
        } else if(data.error !== null){
          console.log(data.error);
        } else {
          successful_report(data.result);
        }
      });
    });

    div.html(html);

    var that = {};
    return that;
  };

  Global.ReportCtrl = ReportCtrl;
})();