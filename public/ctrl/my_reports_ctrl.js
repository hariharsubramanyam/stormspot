/**
 * This files defines the controller for the reports buttons.
 */
(function() {
  /**
   * Setup the report controller.
   *
   * @param button_div_id - The id of the div which will contain the reports button.
   * @param callback - Executed as callback() when the user logs out.
   */
  var MyReportsCtrl = function(button_div_id, callback) {
    // Add the subscriptions button (from template) to div.
    var div = $("#"+button_div_id);
    var html = $(Handlebars.templates.my_reports());
    div.html(html);

    // Set up handler for reports button.
    var btn_my_reports = div.find("button");
    btn_my_reports.click(function() {
      Global.ReportListCtrl("list-div", function(){});
    });
  };

  Global.MyReportsCtrl = MyReportsCtrl;
})();
