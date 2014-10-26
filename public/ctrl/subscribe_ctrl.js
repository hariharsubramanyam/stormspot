(function() {
  var SubscribeCtrl = function(subscribe_div_name) {
    var div = $("#"+subscribe_div_name);
    var html = $(Handlebars.templates.subscribe());

    var btn_subscribe = html.find("#btn_subscribe");

    div.html(html);
    
    var that = {};
    return that;
  };

  Global.SubscribeCtrl = SubscribeCtrl;
})();
