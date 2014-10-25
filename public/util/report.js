/**
 * This file deines functions for communication with the report API.
 */
(function(){
  Global.report = {};

  Global.report.make = function(lat, lon, storm_type, severity_level, content, callback){
    $.ajax({
      "url": "/report",
      "method": "POST",
      "data": {
        "lat": lat,
        "lon": lon,
        "storm_type": storm_type,
        "severity_level": severity_level,
        "content": content
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

  Global.report.delete = function(report_id, callback){
    $.ajax({
      "url": "/report/" + report_id,
      "method": "DELETE",
      "success": function(data) {
        data = JSON.parse(data);
        callback(data);
      }
      "error": function(data){
        callback(null);
      }
    });
  };

  Global.report.get = function(callback){
    $.ajax({
      "url": "/report",
      "method": "GET",
      "success": function(data) {
        data = JSON.parse(data);
        callback(data);
      },
      "error": function(data){
        callback(null);
      }
    });
  };

  Global.report.getAll = function(callback){
    $.ajax({
      "url": "/report/all",
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

  Global.report.getLatest = function(minutes, callback){
    $.ajax({
      "url": "/report/latest/" + minutes,
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

  Global.report.getNear = function(lat, lon, distance, callback){
    $.ajax({
      "url": "/report/near/" + lat + "/" + lon + "/" + distance,
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

  Global.report.getReport = function(report_id, callback){
    $.ajax({
      "url": "/report/" + report_id,
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

  Global.report.upvote = function(report_id, callback){
    $.ajax({
      "url": "/report/upvote/" + report_id,
      "method": "PUT",
      "success": function(data){
        data = JSON.parse(data);
        callback(data);
      },
      "error": function(data){
        callback(null);
      }
    });
  };

  Global.report.downvote = function(report_id, callback){
    $.ajax({
      "url": "/report/downvote/" + report_id,
      "method": "PUT",
      "success": function(data){
        data = JSON.parse(data);
        callback(data);
      },
      "error": function(data){
        callback(null);
      }
    });
  };

  Global.report.novote = function(report_id, callback){
    $.ajax({
      "url": "/report/novote/" + report_id;
      "method": "PUT",
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