/**
 * This file deines functions for communication with the report API.
 */
(function(){
  Global.report = {};

  Global.report.make = function(lat, lon, storm_type, severity_level, content, callback){
    $.ajax({
      "url": "/reports",
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
      "url": "/reports/" + report_id,
      "method": "DELETE",
      "success": function(data) {
        data = JSON.parse(data);
        callback(data);
      },
      "error": function(data){
        callback(null);
      }
    });
  };

  Global.report.get = function(callback){
    $.ajax({
      "url": "/reports",
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
      "url": "/reports/all",
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
      "url": "/reports/" + report_id,
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
      "url": "/reports/upvote/" + report_id,
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
      "url": "/reports/downvote/" + report_id,
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
      "url": "/reports/novote/" + report_id,
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
