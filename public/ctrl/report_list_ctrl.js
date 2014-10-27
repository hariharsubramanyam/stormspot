/**
 * This files defines the controller for the list.
 */
(function() {
  /**
   * Setup the list controller.
   *
   * @param list_div_id - The id of the div which will contain the list button.
   * @param callback - Executed as callback() when the user logs out.
   */
  var ReportListCtrl = function(list_div_id, callback) {
    // Add the report button (from template) to div.
    var div = $("#"+list_div_id);
    var html = $(Handlebars.templates.list());
    div.html(html);

    Global.report.get(function(data){
      data.result.forEach(function(report){
        var elem = $(Handlebars.templates.report_list_element({"report": report}));
        html.append(elem);

        var btn_delete = elem.find("#btn_delete");

        btn_delete.click(function(){
          Global.report.delete(report.report_id, function(){
            ReportListCtrl("list-div", function(){});
          });
        });
      });
    })
  };

  Global.ReportListCtrl = ReportListCtrl;
})();
