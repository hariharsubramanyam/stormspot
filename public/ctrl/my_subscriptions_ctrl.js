/**
 * This files defines the controller for the subscriptions buttons.
 */
(function() {
  /**
   * Setup the subscription controller.
   *
   * @param button_div_id - The id of the div which will contain the subscriptions button.
   * @param callback - Executed as callback() when the user logs out.
   */
  var MySubscriptionsCtrl = function(button_div_id, callback) {
    // Add the subscriptions button (from template) to div.
    var div = $("#"+button_div_id);
    var html = $(Handlebars.templates.my_subscriptions());
    div.html(html);

    // Set up handler for subscriptions button.
    var  btn_my_subscriptions = div.find("button");
    btn_my_subscriptions.click(function() {
      //global stuff here
    });
  };

  Global.MySubscriptionsCtrl = MySubscriptionsCtrl;
})();
