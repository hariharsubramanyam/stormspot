(function() {
  Global.subscribe = {};

  Global.subscribe.make = function(phone_number, carrier, severity_level, lat, lon, callback){
    $.ajax({
      "url": "/subscriptions",
      "method": "POST",
      "data": {
        "phone_number": phone_number,
        "carrier": carrier,
        "severity_level": severity_level,
        "lat": lat,
        "lon": lon
      },
      "success": function(data){
        data = JSON.parse(data);
        callback(data);
      },
      "error": function(data){
        callback(null);
      }
    });
  };

  Global.subscribe.update = function(subscription_id, phone_number, carrier, severity_level, lat, lon, callback){
    $.ajax({
      "url": "/subscriptions/" + subscription_id,
      "method": "PUT",
      "data": {
        "phone_number": phone_number,
        "carrier": carrier,
        "severity_level": severity_level,
        "lat": lat,
        "lon": lon,
      },
      "success": function(data){
        data = JSON.parse(data);
        callback(data);
      },
      "error": function(data){
        callback(null);
      }
    });
  };

  Global.subscribe.delete = function(subscription_id, callback){
    $.ajax({
      "url": "/subscriptions/" + subscription_id,
      "method": "DELETE",
      "success": function(data){
        data = JSON.parse(data);
        callback(data);
      },
      "error": function(data){
        callback(null);
      }
    });
  };

  Global.subscribe.get = function(callback){
    $.ajax({
      "url": "/subscriptions",
      "method": "GET",
      "success": function(data){
        data = JSON.parse(data);
        callback(data);
      },
      "error": function(data){
        callback(null);
      }
    });
  };
})();
