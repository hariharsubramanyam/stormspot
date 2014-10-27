/**
 * This function defines the controller for creating a report.
 */
(function() {
  /**
   * Controller for creating a report.
   *
   * @param report_div_name - The id of the div which will contain this view.
   * @param e - The leaflet event (must contain a latlng) for the location where this view appears.
   * @param callback - Executed as callback(report) when the report is made.
   */
  var ReportCtrl = function(report_div_name, e, callback) {
    // Create the template.
    var div = $("#"+report_div_name);
    var html = $(Handlebars.templates.report());

    // Find the DOM elements.
    var btn_report = html.find("#btn_report");
    var sel_storm = html.find("#sel_storm");
    var sel_severity = html.find("#sel_severity");
    var txt_content = html.find("#txt_content");

    // Trigger the callback on a successful report creation.
    var successful_report = function(report) {
      callback(report);
    };

    // Create a report when the button is clicked.
    btn_report.click(function(){
      var lat = e.latlng.lat;
      var lon = e.latlng.lng;
      var storm_type = sel_storm.val();
      var severity = sel_severity.val();
      var content = txt_content.val();

      // Make the report.
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
