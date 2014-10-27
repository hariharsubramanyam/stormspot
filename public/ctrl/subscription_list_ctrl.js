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
  var SubscriptionListCtrl = function(list_div_id, callback) {
    // Add the subscriptions button (from template) to div.
    var div = $("#"+list_div_id);
    var html = $(Handlebars.templates.list());
    div.html(html);

    Global.subscribe.get(function(data){
      data.result.forEach(function(subscription){
        var elem = $(Handlebars.templates.list_element({"subscription": subscription}));
        html.append(elem);

        var btn_delete = elem.find("#btn_delete");

        btn_delete.click(function(){
          Global.subscribe.delete(subscription.subscription_id, function(){
            SubscriptionListCtrl("list-div", function(){});
          });
        });
      });
    })
  };

  Global.SubscriptionListCtrl = SubscriptionListCtrl;
})();
