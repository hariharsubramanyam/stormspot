(function() {
  var SubscribeCtrl = function(subscribe_div_name, callback) {
    var div = $("#"+subscribe_div_name);
    var html = $(Handlebars.templates.subscribe());

    var txt_phone = html.find("#txt_phone");
    var sel_carrier = html.find("#sel_carrier");
    var sel_severity = html.find("#sel_severity");
    var btn_subscribe = html.find("#btn_subscribe");

    var successful_subscribe = function() {

      callback();
    }

    btn_subscribe.click(function(){
      var phone_number = txt_phone.val();
      var carrier = sel_carrier.val();
      var severity = sel_severity.val();
      var lat = e.latlng.lat;
      var lon = e.latlng.lng;

      Global.subscribe.make(phone_number, carrier, severity, lat, lon, function(data){
        if(data === null){
          console.log("EROOR");
        } else if (data.error !== null) {
          console.log("ERROR");
        } else {
          successful_subscribe();
        }
      });
    });

    div.html(html);

    var that = {};
    return that;
  };

  Global.SubscribeCtrl = SubscribeCtrl;
})();
