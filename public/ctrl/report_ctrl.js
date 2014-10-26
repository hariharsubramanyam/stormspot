(function() {
  var ReportCtrl = function(report_div_name, map, e) {
    var div = $("#"+report_div_name);
    var html = $(Handlebars.templates.report());

    var btn_report = html.find("#btn_report");

    div.html(html);

    var that = {};
    return that;
  };

  Global.ReportCtrl = ReportCtrl;
})();