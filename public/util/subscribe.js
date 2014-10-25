(function() {
  Global.subscribe = {};

  Global.subscribe.make = function(phone_number, carrier, severity_level, lat, lon, callback){
    $.ajax({
      "url": "/subscribe",
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
        calback(data);
      },
      "error": function(data){
        callback(null);
      }
    });
  };

  Global.subscribe.update = function(subscription_id, phone_number, carrier, severity_level, lat, lon, callback){
    $.ajax({
      "url": "/subscribe/" + subscription_id,
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
      "url": "/subscribe/" + subscription_id,
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
      "url": "/subscribe",
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